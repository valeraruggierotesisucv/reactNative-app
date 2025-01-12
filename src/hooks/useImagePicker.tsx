import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { Alert } from "react-native";

export const useImagePicker = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Función para pedir permisos
  const requestPermissions = async (type: 'camera' | 'gallery') => {
    let permission; 
    if (type === 'camera') {
      permission = await Camera.requestCameraPermissionsAsync();
    } else if (type === 'gallery') {        
        permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    return permission?.status === "granted";
  };

  // Función para abrir la cámara
  const openCamera = async () => {
    const hasPermission = await requestPermissions("camera");
    if (!hasPermission) {
      Alert.alert("Camera permission is required");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  // Función para abrir la galería
  const openGallery = async () => {
    const hasPermission = await requestPermissions("gallery");
    if (!hasPermission) {
      Alert.alert("Gallery permission is required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  return {
    isModalVisible,
    imageUri,
    openCamera,
    openGallery,
    setModalVisible,
    setImageUri,
  };
};
