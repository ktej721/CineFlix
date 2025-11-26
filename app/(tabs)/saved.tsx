import PosterImage from '@/components/PosterImage';
import { images } from '@/constants/images';
import { TraktContent } from '@/interfaces/interfaces';
import { getSavedMovies } from '@/services/storage';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const Saved = () => {
    const [savedContent, setSavedContent] = useState<TraktContent[]>([]);

    useFocusEffect(
        useCallback(() => {
            loadSavedContent();
        }, [])
    );

    const loadSavedContent = async () => {
        const content = await getSavedMovies();
        setSavedContent(content);
    };

    const renderItem = ({ item }: { item: TraktContent }) => {
        // Determine type based on properties if not explicitly stored, 
        // but for now let's assume we might need to infer or it's stored.
        // Actually, our storage saves the whole object. 
        // We need to know the type to render correctly and navigate.
        // A simple heuristic: if it has 'aired_episodes', it's a show.
        const isShow = 'aired_episodes' in item;
        const type = isShow ? 'show' : 'movie';

        return (
            <TouchableOpacity
                className="flex-1 m-2 bg-gray-800 rounded-lg p-2"
                onPress={() => router.push(`/details/${type}/${item.ids.trakt}`)}
            >
                <PosterImage
                    tmdbId={item.ids.tmdb}
                    tvdbId={item.ids.tvdb}
                    type={type}
                    className="h-60 w-full rounded-md mb-2"
                />
                <Text className="text-white font-bold text-lg" numberOfLines={1}>{item.title}</Text>
                <Text className="text-gray-400">{item.year}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-primary pt-10">
            <Image source={images.bg} className="absolute w-full h-full z-0" />
            <View className="px-5 flex-1">
                <Text className="text-white text-2xl font-bold mb-5">Saved Content</Text>

                <FlatList
                    data={savedContent}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.ids.trakt.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center mt-20">
                            <Text className="text-gray-400">No saved content yet</Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
};

export default Saved;
