import { fetchMovieImages, fetchShowImages } from '@/services/fanart';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';

interface Props {
    tmdbId?: number;
    tvdbId?: number;
    type: 'movie' | 'show';
    className?: string;
}

const PosterImage = ({ tmdbId, tvdbId, type, className }: Props) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadImage = async () => {
            setLoading(true);
            let data = null;

            if (type === 'movie' && tmdbId) {
                data = await fetchMovieImages(tmdbId);
            } else if (type === 'show' && tvdbId) {
                data = await fetchShowImages(tvdbId);
            }

            if (isMounted) {
                if (data) {
                    // Prefer movieposter/tvposter, fallback to other types if needed
                    const posters = type === 'movie' ? data.movieposter : data.tvposter;
                    if (posters && posters.length > 0) {
                        setImageUrl(posters[0].url);
                    } else {
                        setImageUrl(null);
                    }
                } else {
                    setImageUrl(null);
                }
                setLoading(false);
            }
        };

        loadImage();

        return () => {
            isMounted = false;
        };
    }, [tmdbId, tvdbId, type]);

    if (loading) {
        return (
            <View className={`bg-gray-700 items-center justify-center ${className}`}>
                <ActivityIndicator size="small" color="#ffffff" />
            </View>
        );
    }

    if (!imageUrl) {
        return (
            <View className={`bg-gray-700 items-center justify-center ${className}`}>
                <Text className="text-white text-xs">No Image</Text>
            </View>
        );
    }

    return (
        <Image
            source={{ uri: imageUrl }}
            className={className}
            resizeMode="cover"
        />
    );
};

export default PosterImage;
