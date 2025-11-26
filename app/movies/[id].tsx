import { icons } from '@/constants/icons';
import { TraktMovie } from '@/interfaces/interfaces';
import { isMovieSaved, removeMovie, saveMovie } from '@/services/storage';
import { fetchMovieDetails } from '@/services/trakt';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const MovieDetails = () => {
    const { id } = useLocalSearchParams();
    const [movie, setMovie] = useState<TraktMovie | null>(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (id) {
            loadMovieDetails();
            checkSavedStatus();
        }
    }, [id]);

    const loadMovieDetails = async () => {
        setLoading(true);
        const data = await fetchMovieDetails(id as string);
        setMovie(data);
        setLoading(false);
    };

    const checkSavedStatus = async () => {
        if (id) {
            const isSaved = await isMovieSaved(Number(id));
            setSaved(isSaved);
        }
    };

    const toggleSave = async () => {
        if (!movie) return;
        if (saved) {
            await removeMovie(movie.ids.trakt);
            setSaved(false);
        } else {
            await saveMovie(movie);
            setSaved(true);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 bg-primary justify-center items-center">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    if (!movie) {
        return (
            <View className="flex-1 bg-primary justify-center items-center">
                <Text className="text-white">Movie not found</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-primary">
            <TouchableOpacity onPress={() => router.back()} className="absolute top-12 left-5 z-10 bg-black/50 p-2 rounded-full">
                <Image source={icons.arrow} className="w-6 h-6 tint-white" style={{ tintColor: 'white' }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleSave} className="absolute top-12 right-5 z-10 bg-black/50 p-2 rounded-full">
                <Image
                    source={icons.save}
                    className="w-6 h-6"
                    style={{ tintColor: saved ? '#AB8BFF' : 'white' }}
                />
            </TouchableOpacity>

            <View className="w-full h-72 bg-gray-700 items-center justify-center">
                <Text className="text-white">No Image</Text>
            </View>

            <View className="p-5">
                <Text className="text-white text-3xl font-bold mb-2">{movie.title}</Text>
                <View className="flex-row items-center mb-4">
                    <Text className="text-gray-400 text-base mr-4">{movie.year}</Text>
                    <Text className="text-gray-400 text-base mr-4">{movie.runtime} min</Text>
                    <Text className="text-yellow-500 text-base font-bold">★ {movie.rating.toFixed(1)}</Text>
                </View>

                <Text className="text-white text-lg font-semibold mb-2">Overview</Text>
                <Text className="text-gray-300 text-base leading-6">{movie.overview}</Text>

                <View className="mt-6">
                    <Text className="text-white text-lg font-semibold mb-2">Details</Text>
                    <Text className="text-gray-400">Status: {movie.status}</Text>
                    <Text className="text-gray-400">Released: {movie.released}</Text>
                    <Text className="text-gray-400">Language: {movie.language.toUpperCase()}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default MovieDetails;