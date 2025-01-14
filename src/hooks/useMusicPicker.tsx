import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';

export function useMusicPicker() {
  const [musicFileUri, setMusicFileUri] = useState<{ nameFile: string; uri: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  const pickMusicFile = async () => {
    try {
      setIsLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: false,
        multiple: false
      });

      if (result.assets) {
        setMusicFileUri({
          nameFile: result.assets[0].name,
          uri: result.assets[0].uri,
        });
        
      }else{
        console.log('El usuario canceló la selección');
      }

    } catch (error) {
      console.error('Error al seleccionar el archivo de música:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    musicFileUri,
    pickMusicFile,
    isLoading,
  };
}
