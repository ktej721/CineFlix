import PosterImage from '@/components/PosterImage';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { TraktMovie } from '@/interfaces/interfaces';
import { fetchPopularMovies } from '@/services/trakt';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [movies, setMovies] = useState<TraktMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setLoading(true);
    const data = await fetchPopularMovies();
    setMovies(data);
    setLoading(false);
  };

  const renderMovieItem = ({ item }: { item: TraktMovie }) => (
    <TouchableOpacity
      className="flex-1 m-2 bg-gray-800 rounded-lg p-2"
      onPress={() => router.push(`/details/movie/${item.ids.trakt}`)}
    >
      <PosterImage
        tmdbId={item.ids.tmdb}
        type="movie"
        className="h-60 w-full rounded-md mb-2"
      />
      <Text className="text-white font-bold text-lg" numberOfLines={1}>{item.title}</Text>
      <Text className="text-gray-400">{item.year}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full h-full z-0" />
      <View className="flex-1 px-5 pt-10">
        <Image source={icons.logo} className="w-12 h-10 mb-5 mx-auto" />
        <SearchBar onPress={() => router.push("/search")}
          placeholder="Search for movies or TV shows" />

        <Text className="text-white text-2xl font-bold mt-5 mb-3">Popular Movies</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <FlatList
            data={movies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.ids.trakt.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
}