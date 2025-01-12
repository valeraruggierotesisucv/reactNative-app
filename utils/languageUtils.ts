import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'app_language';

export const getLanguage = async (): Promise<string> => {
  try {
    const language = await AsyncStorage.getItem(LANGUAGE_KEY);
    return language || 'es'; 
  } catch (error) {
    console.error('Failed to fetch language from AsyncStorage', error);
    return 'es'; 
  }
};

export const setLanguage = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.error('Failed to set language in AsyncStorage', error);
  }
}; 