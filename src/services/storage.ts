import { supabase } from "../lib/supabase";

export const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const arrayBuffer = await new Response(blob).arrayBuffer();
    const fileName = `${Date.now()}.jpg`;
    const { error } = await supabase
      .storage
      .from('EventImages')
      .upload(fileName, arrayBuffer, { contentType: 'image/jpeg', upsert: false });
    if (error) {
      console.error('Error uploading image: ', error);
    }
}