import {
  StyleSheet,
  Image,
  View,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { Input, InputVariant } from "../components/Input/Input";
import { useState } from "react";
import { Button, ButtonSize } from "../components/Button/Button";
import React from "react";
import { DisplayInput } from "../components/DisplayInput/DisplayInput";
import * as DocumentPicker from "expo-document-picker";
import { CategoriesEnum } from "../../utils/shareEnums";
import { Chip, ChipVariant } from "../components/Chip/Chip";
import { formatHour } from "../../utils/formatHour";
import { LatLng } from "react-native-maps";

import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { useTranslation } from "../contexts/TranslationContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { truncateString } from "../../utils/formatString";
import { supabase } from "../lib/supabase";
export enum StepsEnum {
  DEFAULT = "default",
  DATE = "date",
  CATEGORY = "category",
  LOCATION = "location",
}

interface AddDefaultViewProps {
  step: StepsEnum;
  setStep: (step: StepsEnum) => void;
  description: string | null;
  setDescription: (text: string | null) => void;
  date: Date | null;
  startsAt: Date | null;
  endsAt: Date | null;
  category: CategoriesEnum | null;
  location: LatLng | null;
  setLocation: (location: LatLng) => void;
  musicFile: { nameFile: string; uri: string } | null;
  setMusicFile: (file: { nameFile: string; uri: string } | null) => void;
  onAddEvent: () => void;
  image: string | null;
  setImage: (image: string | null) => void;
}

export function AddDefaultView({
  step,
  setStep,
  description,
  setDescription,
  date,
  startsAt,
  endsAt,
  category,
  location,
  setLocation,
  musicFile,
  setMusicFile,
  onAddEvent,
  image,
  setImage,
}: AddDefaultViewProps) {
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  // TODO: colocar esta funcion fuera

  function handleAddMusic() {
    console.log("Agregar musica...");
    const pickDocument = async () => {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: false,
      });
      if (result.assets) {
        setMusicFile({
          nameFile: result.assets[0].name,
          uri: result.assets[0].uri,
        });
        console.log(result);
      }

      // UploadFile
    };
    pickDocument();
  }


  const uploadImage = async (uri: string) => {
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

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });

      if (!result.canceled) {
        console.log("Camera Image URI: ", result.assets[0].uri);        
        uploadImage(result.assets[0].uri); 
        console.log(result)
        setImage(result.assets[0].uri);
      }
    } else {
      alert("Camera permission is required to take photos.");
    }
    setModalVisible(false);
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });

      if (!result.canceled) {
        console.log("Gallery Image URI: ", result.assets[0].uri);
        setImage(result.assets[0].uri);
      }
    } else {
      alert("Gallery permission is required to select photos.");
    }
    setModalVisible(false);
  };

  const DatePills = () => {
    if (startsAt === null || endsAt === null || date === null) return;
    const start = formatHour(startsAt);
    const end = formatHour(endsAt);
    const formattedDate = date?.toLocaleDateString();

    return (
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Chip
          label={start}
          variant={ChipVariant.LIGHT}
          onPress={() => setStep(StepsEnum.DATE)}
        />
        <Chip
          label={end}
          variant={ChipVariant.LIGHT}
          onPress={() => setStep(StepsEnum.DATE)}
        />
        <Chip
          label={formattedDate}
          variant={ChipVariant.LIGHT}
          onPress={() => setStep(StepsEnum.DATE)}
        />
      </View>
    );
  };

  const LocationPills = () => {
    if (!location) return;
    const latitude = location.latitude.toFixed(3);
    const longitude = location.longitude.toFixed(3);

    return (
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Chip
          label={latitude}
          variant={ChipVariant.LIGHT}
          onPress={() => setStep(StepsEnum.DATE)}
        />
        <Chip
          label={longitude}
          variant={ChipVariant.LIGHT}
          onPress={() => setStep(StepsEnum.DATE)}
        />
      </View>
    );
  };

  return (
    <>
      <AppHeader title={t("new_event")} />
      {/* Imagen */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.imageContainer}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <MaterialCommunityIcons name="plus" size={48} color="black" />
          </View>
        )}
      </TouchableOpacity>

      {/* Descripción */}
      <Input
        label={t("description").toUpperCase()}
        placeholder={t("add_description")}
        variant={InputVariant.DEFAULT}
        value={description ?? ""}
        onChangeValue={setDescription}
      />

      {/* FECHA Y HORA */}
      {date && startsAt && endsAt ? (
        <DisplayInput
          label={t("when").toUpperCase()}
          data={<DatePills />}
          onPress={() => setStep(StepsEnum.DATE)}
        />
      ) : (
        <Input
          label={t("when").toUpperCase()}
          placeholder={t("add_date")}
          variant={InputVariant.ARROW}
          onPress={() => setStep(StepsEnum.DATE)}
        />
      )}

      {/* Categoría */}
      {category ? (
        <DisplayInput
          label={t("category").toUpperCase()}
          data={
            <Chip
              label={category.toUpperCase()}
              variant={ChipVariant.LIGHT}
              onPress={() => setStep(StepsEnum.CATEGORY)}
            />
          }
          onPress={() => setStep(StepsEnum.CATEGORY)}
        />
      ) : (
        <Input
          label={t("category").toUpperCase()}
          placeholder={t("add_category")}
          variant={InputVariant.ARROW}
          onPress={() => setStep(StepsEnum.CATEGORY)}
        />
      )}

       {/* MÚSICA */}
       { musicFile
            ? <DisplayInput
                label={t("music").toUpperCase()}
                data={<Chip 
                    label={truncateString(musicFile.nameFile, 30)} 
                    variant={ChipVariant.LIGHT} 
                    onPress={handleAddMusic} />}
                    onPress={handleAddMusic}
                />
            : <Input 
                label="MÚSICA"
                placeholder="Agregar música"
                variant={InputVariant.ARROW}
                onPress={handleAddMusic}
            />
        }
        
        
      {/* UBICACIÓN */}
      {location ? (
        <DisplayInput
          label={t("location").toUpperCase()}
          data={<LocationPills />}
          onPress={() => setStep(StepsEnum.LOCATION)}
        />
      ) : (
        <Input
          label={t("location").toUpperCase()}
          placeholder={t("add_location")}
          variant={InputVariant.ARROW}
          onPress={() => setStep(StepsEnum.LOCATION)}
        />
      )}

      <View style={styles.footer}>
        <Button
          label={t("publish")}
          size={ButtonSize.MEDIUM}
          onPress={onAddEvent}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity onPress={openCamera} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>{t("take_photo")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>
                {t("choose_from_gallery")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>{t("cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    width: "100%",
    height: 270,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
  placeholderText: {
    fontSize: 17,
    fontFamily: "SF-Pro-Text-Regular",
    color: "#000",
    marginBottom: 5,
    textAlign: "left",
  },
  image: {
    height: 270,
    width: "100%",
    resizeMode: "cover",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalButton: {
    backgroundColor: "transparent",
    margin: 10,
    borderRadius: 20,
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Semibold",
    textAlign: "center",
    color: "#007AFF",
  },
  modalButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "white",
    width: "60%",
    padding: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "SF-Pro-Text-Regular",
    color: "#000",
    marginBottom: 5,
    textAlign: "left",
  },
});
