import { supabase } from "../lib/supabase";
import * as FileSystem from 'expo-file-system';
import { Platform } from "react-native";

export enum FileTypeEnum {
  "IMAGE" = "image", 
  "AUDIO" = "audio"
}

export async function resolveUri(uri: string){
  if (Platform.OS === 'android' && uri.startsWith('content://')) {
    // Generar una ruta temporal en el cache del dispositivo
    const fileName = uri.split('/').pop(); // Extraer el nombre del archivo
    const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

    // Copiar el archivo al directorio temporal
    await FileSystem.copyAsync({
      from: uri,
      to: fileUri,
    });

    return fileUri;                               
  }

  return uri
}

export async function uploadFile(uri: string, type: FileTypeEnum){
  const fileName = `${Date.now()}`; 
  let bucket = "EventImages"; 
  let contentType = "image/jpeg"; 
  let fileUri = uri; 

  if(type === FileTypeEnum.AUDIO ){
    bucket = "EventMusic"; 
    contentType = "audio/mpeg"; 
    fileUri = await resolveUri(uri); 
  }

  try{
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const arrayBuffer = await new Response(blob).arrayBuffer();

    // Upload file
    const { error, data } = await supabase
        .storage
        .from(bucket)
        .upload(fileName, arrayBuffer, { contentType: contentType, upsert: false });

    if (error) {
      console.error('Error uploading file: ', error);
    }

    // Get the public URL of the uploaded file
    if(data){
      const { data: { publicUrl} } = await supabase
      .storage
      .from(bucket)
      .getPublicUrl(data?.path);

      // Return the public URL
      return publicUrl;  
    }
  }catch(error){
    console.error('Error in uploadFile:', error);
  }  

}

export async function deleteFile(uri: string, type: FileTypeEnum) {
  let name = uri.split('EventImages/')[1]; 
  let bucket = 'EventImages'; 

  if(type === FileTypeEnum.AUDIO){
    name = uri.split('EventMusic/')[1]; 
    bucket = 'EventMusic'
  }

  try{
    const { data, error } = await supabase
    .storage
    .from(bucket)
    .remove([name])

    if (error) {
      throw error; 
    }

    console.log("ARCHIVO ELIMINADO-->", data)
    return name
  }catch(error){
    console.error('Error deleting file', error);
  }
  
}
