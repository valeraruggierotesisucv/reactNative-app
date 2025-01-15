import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { AddStackNavigationProp } from "../navigators/AddStack";
import { AddDateView } from "./AddDateView";
import { CategoriesEnum } from "../../utils/shareEnums";
import { ChooseCategoriesView } from "./ChooseCategoriesView";
import { AddDefaultView } from "./AddDefaultView";
import { StepsEnum } from "./AddDefaultView";
import { LatLng } from "react-native-maps";
import { AddLocationView } from "./AddLocationView";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useTranslation } from "react-i18next";
import { Image, Text } from "react-native";
import { Modal } from "../components/Modal/Modal";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import React from "react";
import { theme } from "../../utils/theme";
import { FileTypeEnum, uploadFile } from "../services/storage";
import { UploadFileController } from "../controllers/UploadFileController";
import { AddEventController } from "../controllers/AddEventController";
import { useAuth } from "../contexts/AuthContext";
import { apiRequest } from "../../utils/apiRequest";

/* TODO
    Description debe tener max caracteres 
*/

export function AddEventView() {
  const { t } = useTranslation();
  const { session, user } = useAuth(); 
  const navigation = useNavigation<AddStackNavigationProp>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { location: origin, errorMsg, isLoading } = useCurrentLocation();

  const [title, setTitle] = useState<string| null>(null); 
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [category, setCategory] = useState<CategoriesEnum | null>(null);
  const [location, setLocation] = useState<LatLng | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [musicFile, setMusicFile] = useState<{nameFile: string; uri: string;} | null>(null);

  const [step, setStep] = useState<StepsEnum>(StepsEnum.DEFAULT);

  async function handleAddEvent() {
    setModalVisible(true);
    console.log(modalVisible);
    
    console.log("Publicando evento...");
    console.log("Descripcion: ", description);
    console.log("Date: ", date);
    console.log("Starts at: ", startTime);
    console.log("Ends at ", endTime);
    console.log("Category ", category);
    console.log("Location ", location);

    // CONTROLLERS
    // UploadImageController ----> UploadFileController
    // UploadMusicController  ---> UploadFileController
    // UploadLocationController ---> ELIMINAR 
    // PostEventController 

    // Agregar evento 
    if (description && date && startTime && endTime && category && musicFile && image && location) {
      console.log("Uploading image..."); 
      const imageUrl = await UploadFileController.uploadFile(image, FileTypeEnum.IMAGE) // guardar en la db 
      console.log("Event Image URL-->", imageUrl);  

      console.log("Uploading music..."); 
      const musicUrl = await UploadFileController.uploadFile(musicFile.uri, FileTypeEnum.AUDIO) // guardar en la db
      console.log("Event Music URL-->", musicUrl); 
      
       
      // PostEventController
    }
    console.log(" Controlador ")
    if(session){
      await AddEventController.postEvent(session?.access_token);
    }
    // Some example
    const eventData = {
      userId: "cm5x32zqk0000ty28fon5j3yg",
      eventImage: "https://example.com/image1.jpg",
      categoryId: 42,
      latitude: "40.7128",
      longitude: "-74.0060",
      title: "Carnaval",
      description: "A grand celebration to welcome the new year.",
      date: "2025-01-01T00:00:00.000Z",
      startsAt: "2025-01-01T19:00:00.000Z",
      endsAt: "2025-01-01T23:00:00.000Z"
    }

    console.log(" after controlador")
    const response = await apiRequest("protected", "GET", undefined, session?.access_token)
    console.log("this is the response" , response); 
    const createEvent = await apiRequest(
      "events", 
      "POST", 
      eventData, 
      session?.access_token
    )
    console.log(createEvent)
  }

  function cleanForm() {
    setDescription(null);
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setImage(null); 
    setCategory(null);
    setMusicFile(null); 
    setLocation(null);
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        cleanForm();
      };
    }, [])
  );


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {
          step === StepsEnum.DEFAULT ? 
            <AppHeader title={t("addEvent.new_event")} /> 
            : 
            <AppHeader title={step === StepsEnum.DATE ? t("addEvent.when") : step === StepsEnum.CATEGORY ? t("addEvent.category") : step === StepsEnum.LOCATION ? t("addEvent.location") : ""} goBack={() => setStep(StepsEnum.DEFAULT)} />
        }
        {step === StepsEnum.DEFAULT && (
          <AddDefaultView
            step={step}
            setStep={setStep}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            date={date}
            category={category}
            startsAt={startTime}
            endsAt={endTime}
            musicFile={musicFile}
            setMusicFile={setMusicFile}
            location={location}
            setLocation={setLocation}
            image={image}
            setImage={setImage}
            onAddEvent={handleAddEvent}
            buttonLabel={t("publish")}
          />
        )}

        {step === StepsEnum.DATE && (
          <AddDateView
            step={step}
            setStep={setStep}
            date={date}
            setDate={setDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        )}

        {step === StepsEnum.CATEGORY && (
          <ChooseCategoriesView
            step={step}
            setStep={setStep}
            category={category}
            setCategory={setCategory}
            preferences={false}
          />
        )}

        {step === StepsEnum.LOCATION && (
          <>
            <AddLocationView
              origin={origin}
              location={location}
              setLocation={setLocation}
              setStep={setStep}
            />
          </>
        )}
      </ScrollView>

      <Modal 
        visible={modalVisible} 
        onClose={() => {setModalVisible(false); navigation.goBack()}}
      >   
        <Image source={require('../../assets/images/Onboarding.png')} style={{ width: 200, height: 200, marginBottom: 16 }} />
        <Text style={{ 
            fontSize: 18, 
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 8,
        }}>
            {t("addEvent.event_published")}
        </Text>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors['white'],
  },
  scrollViewContent: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
