import { StyleSheet, Image, View, Modal, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Input, InputVariant } from "../components/Input/Input";
import { useEffect, useState } from "react";
import { Button, ButtonSize } from "../components/Button/Button";
import { DisplayInput } from "../components/DisplayInput/DisplayInput";
import { CategoriesEnum } from "../../utils/shareEnums";
import { Chip, ChipVariant } from "../components/Chip/Chip";
import { formatHour } from "../../utils/formatHour";
import { LatLng } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { truncateString } from "../../utils/formatString";
import { useImagePicker } from "../hooks/useImagePicker";
import { useMusicPicker } from "../hooks/useMusicPicker";
import { theme } from "../../utils/theme";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import React from "react";

export enum StepsEnum {
  DEFAULT = "default",
  DATE = "date",
  CATEGORY = "category",
  LOCATION = "location",
}
interface AddDefaultViewProps {
  step: StepsEnum;
  setStep: (step: StepsEnum) => void;
  title: string | null; 
  setTitle: (title: string) => void; 
  description: string | null;
  setDescription: (text: string | null) => void;
  date: Date | null;
  setDate: (date: Date | null) => void; 
  startsAt: Date | null;
  setStartsAt: (date: Date | null) => void; 
  endsAt: Date | null;
  setEndsAt: (date: Date | null) => void; 
  category: CategoriesEnum | null;
  setCategory: (category: CategoriesEnum | null) => void; 
  location: LatLng | null;
  setLocation: (location: LatLng | null) => void;
  musicFile: { nameFile: string; uri: string } | null;
  setMusicFile: (file: { nameFile: string; uri: string } | null) => void;
  onAddEvent: () => void;
  image: string | null;
  setImage: (image: string | null) => void;
  buttonLabel: string;
  edit?: boolean; 
  disable: boolean
}

export function AddDefaultView({
  setStep,
  title, 
  setTitle, 
  description,
  setDescription,
  date,
  setDate, 
  startsAt,
  setStartsAt, 
  endsAt,
  setEndsAt, 
  category,
  setCategory, 
  location,
  setLocation, 
  musicFile,
  setMusicFile,
  onAddEvent,
  image,
  setImage,
  edit = false, 
  disable = false
}: AddDefaultViewProps) {
  const { t } = useTranslation();
  const { isModalVisible, imageUri, openCamera, openGallery, setModalVisible } = useImagePicker();
  const { musicFileUri, pickMusicFile } = useMusicPicker();
  const { location : origin, getCurrentLocation } = useCurrentLocation(); 
  const { audioFileUri, startRecording, stopRecording, isRecording } = useAudioRecorder();
  const [isAudioModalVisible, setAudioModalVisible] = useState(false);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  

  const handleStopRecording = () => {
    stopRecording();
    setAudioModalVisible(false);
  };

  const handleCurrentLocation = () => {
    if(origin){
      setLocation({
        latitude: origin.coords.latitude,
        longitude: origin.coords.longitude,
      })
      setLocationModalVisible(false)
    }
  }

  const DatePills = () => {
    if (startsAt === null || endsAt === null || date === null) return;

    const start = formatHour(startsAt);
    const end= formatHour(endsAt);
    const formattedDate = date?.toLocaleDateString();    
    

    function onClear(){
      setDate(null); 
      setStartsAt(null); 
      setEndsAt(null); 
    }

    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
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
        <TouchableOpacity onPress={onClear} style={styles.clear}>
          <MaterialCommunityIcons name="close" size={16} color={theme.colors["secondary"]} />
        </TouchableOpacity>
      </View>
      
    );
  };

  const LocationPills = () => {
    if (!location) return;

    function onClear(){
      setLocation(null)
    }
    const latitude = location.latitude.toFixed(3);
    const longitude = location.longitude.toFixed(3);

    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
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
        <TouchableOpacity onPress={onClear} style={styles.clear}>
          <MaterialCommunityIcons name="close" size={16} color={theme.colors["secondary"]} />
        </TouchableOpacity>
      </View>
      
    );
  };

  const CategoryPill = () => {
    function onClear(){
      setCategory(null)
    }

    return(
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Chip
          label={category?.toUpperCase() || ""}
          variant={ChipVariant.LIGHT}
          onPress={() => setStep(StepsEnum.CATEGORY)}
        />
        <TouchableOpacity onPress={onClear} style={styles.clear}>
          <MaterialCommunityIcons name="close" size={16} color={theme.colors["secondary"]} />
        </TouchableOpacity>
      </View>      
    )
  }

  const MusicPill = () => {
    function onClear(){
      setMusicFile(null)
    }

    return(
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Chip 
          label={truncateString(musicFile?.nameFile || "", 30)} 
          variant={ChipVariant.LIGHT} 
        />
        <TouchableOpacity onPress={onClear} style={styles.clear}>
          <MaterialCommunityIcons name="close" size={16} color={theme.colors["secondary"]} />
        </TouchableOpacity>
      </View>      
    )
  }

  useEffect(() => {
    if (imageUri) {
      setImage(imageUri); 
    }
  }, [imageUri]);

  useEffect(() => {
    if(musicFileUri){
      setMusicFile(musicFileUri)
    }

  }, [musicFileUri]); 

  useEffect(() => {
    if (audioFileUri) {
      setMusicFile(audioFileUri);
    }
  }, [audioFileUri]);

  return (
    <>
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

      {/* Título */}
      <Input
        label={t("addEvent.title").toUpperCase()}
        placeholder={t("addEvent.add_title")}
        multiline={false}
        variant={InputVariant.DEFAULT}
        value={title ?? ""}
        onChangeValue={setTitle}
        required={title ? false : true}
      />

      {/* Descripción */}
      <Input
        label={t("addEvent.description").toUpperCase()}
        placeholder={t("addEvent.add_description")}
        variant={InputVariant.DEFAULT}
        value={description ?? ""}
        onChangeValue={setDescription}
        required={description ? false : true}
      />

      {/* FECHA Y HORA */}
      {date && startsAt && endsAt ? (
        <DisplayInput
          label={t("addEvent.when").toUpperCase()}
          data={<DatePills />}
        />
      ) : (
        <Input
          label={t("addEvent.when").toUpperCase()}
          placeholder={t("addEvent.add_date")}
          variant={InputVariant.ARROW}
          onPress={() => setStep(StepsEnum.DATE)}
        />
      )}

      {/* Categoría */}
      {category ? (
        <DisplayInput
          label={t("addEvent.category").toUpperCase()}
          data={<CategoryPill/>}
        />
      ) : (
        <Input
          label={t("addEvent.category").toUpperCase()}
          placeholder={t("addEvent.add_category")}
          variant={InputVariant.ARROW}
          onPress={() => setStep(StepsEnum.CATEGORY)}
        />
      )}

       {/* MÚSICA */}
       { musicFile
            ? <DisplayInput
                label={t("addEvent.music").toUpperCase()}
                data={<MusicPill />}
               />
            : <Input 
                label={t("addEvent.music").toUpperCase()}
                placeholder={t("addEvent.add_music")}
                variant={InputVariant.ARROW}
                onPress={() => setAudioModalVisible(true)}
            />
        }
        
        
      {/* UBICACIÓN */}
      {location ? (
        <DisplayInput
          label={t("addEvent.location").toUpperCase()}
          data={<LocationPills />}
        />
      ) : (
        <Input
          label={t("addEvent.location").toUpperCase()}
          placeholder={t("addEvent.add_location")}
          variant={InputVariant.ARROW}
          onPress={() => setLocationModalVisible(true)}
        />
      )}

      <View style={styles.footer}>
        <Button
          label={ edit ? t("editEvent.publish") : t("addEvent.publish")}
          size={ButtonSize.MEDIUM}
          onPress={onAddEvent}
          disabled={disable}
          testID="publish-button"
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
              <Text style={styles.modalButtonText}>{t("addEvent.take_photo")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>
                {t("addEvent.choose_from_gallery")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>{t("common.cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isAudioModalVisible}
        onRequestClose={() => setAudioModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity onPress={pickMusicFile} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>{t("addEvent.choose_from_files")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={isRecording ? handleStopRecording : startRecording} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>
                {isRecording ? t("addEvent.stop_recording") : t("addEvent.record_audio")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAudioModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>{t("common.cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isLocationModalVisible}
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity onPress={handleCurrentLocation} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>{t("addEvent.add_current_location")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLocationModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>{t("common.cancel")}</Text>
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
    height: 250, 
    alignItems: "center",
    justifyContent: "center"
  },
  placeholder: {
    width: "100%",
    height: 270,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors['lightGray'],
  },
  placeholderText: {
    fontSize: 17,
    fontFamily: "SF-Pro-Text-Regular",
    color: theme.colors['black'],
    marginBottom: 5,
    textAlign: "left",
  },
  image: {
    width: "100%",
    height: 250, 
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
    color: theme.colors['secondary'],
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
    color: theme.colors['black'],
    marginBottom: 5,
    textAlign: "left",
  },
  clear:{
    backgroundColor: theme.colors["gray"],
    alignItems: "center",
    alignContent: "center", 
    justifyContent: "center",
    width: 30,
    height: 29,
    padding: 5,
    borderRadius: 6,
  }
});
