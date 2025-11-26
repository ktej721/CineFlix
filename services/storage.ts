import { TraktContent } from '@/interfaces/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@saved_movies';

export const saveMovie = async (content: TraktContent) => {
    try {
        const savedContent = await getSavedMovies();
        const isAlreadySaved = savedContent.some((m) => m.ids.trakt === content.ids.trakt);
        if (!isAlreadySaved) {
            const newSavedContent = [...savedContent, content];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedContent));
        }
    } catch (e) {
        console.error('Failed to save content', e);
    }
};

export const removeMovie = async (id: number) => {
    try {
        const savedContent = await getSavedMovies();
        const newSavedContent = savedContent.filter((m) => m.ids.trakt !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedContent));
    } catch (e) {
        console.error('Failed to remove content', e);
    }
};

export const getSavedMovies = async (): Promise<TraktContent[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Failed to fetch saved content', e);
        return [];
    }
};

export const isMovieSaved = async (id: number): Promise<boolean> => {
    try {
        const savedContent = await getSavedMovies();
        return savedContent.some((m) => m.ids.trakt === id);
    } catch (e) {
        console.error('Failed to check if content is saved', e);
        return false;
    }
};
