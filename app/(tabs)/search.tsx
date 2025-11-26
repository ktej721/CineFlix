import PosterImage from '@/components/PosterImage';
import SearchBar from '@/components/SearchBar';
import { images } from '@/constants/images';
import { TraktSearchResult } from '@/interfaces/interfaces';
import { searchContent } from '@/services/trakt';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const Search = () => {
    const [results, setResults] = useState<TraktSearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (query: string) => {
        if (!query.trim()) return;
        setLoading(true);
        const data = await searchContent(query);
        setResults(data);
        setLoading(false);
    };

    const renderItem = ({ item }: { item: TraktSearchResult }) => {
        const content = item.type === 'movie' ? item.movie : item.show;
        if (!content) return null;

        return (
            <TouchableOpacity
                className="flex-row items-center p-3 bg-gray-800 mb-2 rounded-lg mx-5"
                onPress={() => router.push(`/details/${item.type}/${content.ids.trakt}`)}
            >
                <PosterImage
                    tmdbId={content.ids.tmdb}
                    tvdbId={content.ids.tvdb}
                    type={item.type}
                    className="w-16 h-24 rounded mr-4"
                />
                <View className="flex-1">
                    <Text className="text-white font-bold text-lg">{content.title}</Text>
                    <Text className="text-gray-400">{content.year} • {item.type.toUpperCase()}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-primary pt-10">
            <Image source={images.bg} className="absolute w-full h-full z-0" />
            <View className="px-5 mb-5">
                <SearchBar
                    placeholder="Search for movies or TV shows..."
                    onSearch={handleSearch}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#ffffff" />
            ) : (
                <FlatList
                    data={results}
                    renderItem={renderItem}
                    keyExtractor={(item) => `${item.type}-${(item.movie || item.show)?.ids.trakt}`}
                    ListEmptyComponent={
                        <Text className="text-gray-400 text-center mt-10">Search for movies or TV shows to see results</Text>
                    }
                />
            )}
        </View>
    );
};

export default Search;
