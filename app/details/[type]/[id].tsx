import PosterImage from '@/components/PosterImage';
import { icons } from '@/constants/icons';
import { TraktContent, TraktMovie, TraktShow } from '@/interfaces/interfaces';
import { isMovieSaved, removeMovie, saveMovie } from '@/services/storage';
import { fetchMovieDetails, fetchShowDetails } from '@/services/trakt';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Details = () => {
    const { id, type } = useLocalSearchParams<{ id: string; type: 'movie' | 'show' }>();
    const [content, setContent] = useState<TraktContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (id && type) {
            loadDetails();
            checkSavedStatus();
        }
    }, [id, type]);

    const loadDetails = async () => {
        setLoading(true);
        let data = null;
        if (type === 'movie') {
            data = await fetchMovieDetails(id);
        } else {
            data = await fetchShowDetails(id);
        }
        setContent(data);
        setLoading(false);
    };

    const checkSavedStatus = async () => {
        if (id) {
            const isSaved = await isMovieSaved(Number(id));
            setSaved(isSaved);
        }
    };

    const toggleSave = async () => {
        if (!content) return;
        if (saved) {
            await removeMovie(content.ids.trakt);
            setSaved(false);
        } else {
            await saveMovie(content);
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

    if (!content) {
        return (
            <View className="flex-1 bg-primary justify-center items-center">
                <Text className="text-white">Content not found</Text>
            </View>
        );
    }

    const isMovie = type === 'movie';
    // Type guard or casting for specific properties
    const movie = isMovie ? (content as TraktMovie) : null;
    const show = !isMovie ? (content as TraktShow) : null;

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

            <View className="w-full h-96 relative">
                <PosterImage
                    tmdbId={content.ids.tmdb}
                    tvdbId={content.ids.tvdb}
                    type={type}
                    className="w-full h-full"
                />
                <View className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-primary to-transparent" />
            </View>

            <View className="p-5 -mt-10">
                <Text className="text-white text-3xl font-bold mb-2">{content.title}</Text>
                <View className="flex-row items-center mb-4 flex-wrap">
                    <Text className="text-gray-400 text-base mr-4">{content.year}</Text>
                    {isMovie && <Text className="text-gray-400 text-base mr-4">{movie?.runtime} min</Text>}
                    {!isMovie && <Text className="text-gray-400 text-base mr-4">{show?.aired_episodes} eps</Text>}
                    <Text className="text-yellow-500 text-base font-bold">★ {content.rating.toFixed(1)}</Text>
                </View>

                <Text className="text-white text-lg font-semibold mb-2">Overview</Text>
                <Text className="text-gray-300 text-base leading-6 mb-6">{content.overview}</Text>

                <View>
                    <Text className="text-white text-lg font-semibold mb-2">Details</Text>
                    <Text className="text-gray-400">Status: {content.status}</Text>
                    {isMovie && <Text className="text-gray-400">Released: {movie?.released}</Text>}
                    {!isMovie && <Text className="text-gray-400">First Aired: {show?.first_aired}</Text>}
                    <Text className="text-gray-400">Language: {content.language.toUpperCase()}</Text>
                    {!isMovie && <Text className="text-gray-400">Network: {show?.network}</Text>}
                </View>
            </View>
        </ScrollView>
    );
};

export default Details;
