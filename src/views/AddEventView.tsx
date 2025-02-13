import { Alert, ScrollView, StyleSheet, Image, Text } from "react-native";
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
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useTranslation } from "react-i18next";
import { Modal } from "../components/Modal/Modal";
import { theme } from "../../utils/theme";
import { FileTypeEnum } from "../services/storage";
import { AddEventController } from "../controllers/AddEventController";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "react-native-toast-notifications";
import { LocationController } from "../controllers/LocationController";
import { FileController } from "../controllers/FileController";
import React from "react";

export function AddEventView() {
  const { t } = useTranslation();
  const toast =  useToast(); 
  const { session, user } = useAuth(); 
  const navigation = useNavigation<AddStackNavigationProp>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [title, setTitle] = useState<string| null>(null); 
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [category, setCategory] = useState<CategoriesEnum | null>(null);
  const [categoryId, setCategoryId] = useState<number|null>(null); 
  const [location, setLocation] = useState<LatLng | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [musicFile, setMusicFile] = useState<{nameFile: string; uri: string;} | null>(null);
  const [step, setStep] = useState<StepsEnum>(StepsEnum.DEFAULT);
  const [disable, setDisable] = useState(false); 

  async function handleAddEvent() {     
    if (title && description && date && startTime && endTime && category && image && musicFile && location && session) {
      setDisable(true);      

      const locationData = {
        latitude: location?.latitude,
        longitude: location?.longitude, 
      }
      
      try{
        const imageUrl = await FileController.uploadFile(image, FileTypeEnum.IMAGE); 
        const musicUrl = await FileController.uploadFile(musicFile.uri, FileTypeEnum.AUDIO); 
        const locationId = await LocationController.addLocation(session?.access_token, locationData); 

        const eventData = {
          userId: user?.id,
          title: title,
          description: description,
          date: date.toISOString(),
          startsAt: startTime.toISOString(),              
          endsAt: endTime.toISOString(), 
          eventImage: imageUrl,
          eventMusic: musicUrl, 
          categoryId: categoryId,                                
          locationId: locationId      
        }
        
        await AddEventController.postEvent(session?.access_token, eventData); 
        
        setModalVisible(true);
        setDisable(false); 
      }catch(error){
        console.error("Error in AddEventView:", error);
        Alert.alert("Error", (error as Error).message);
      }
    }else{
      
      toast.show(t("addEvent.require_fields"), {
        type: "normal",
        placement: "top",
      })
    }
    
  }

  function cleanForm() {
    setTitle(null); 
    setDescription(null);
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setImage(null); 
    setCategory(null);
    setCategoryId(null); 
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
            setDate={setDate}
            category={category}
            setCategory={setCategory}
            startsAt={startTime}
            setStartsAt={setStartTime}
            endsAt={endTime}
            setEndsAt={setEndTime}
            musicFile={musicFile}
            setMusicFile={setMusicFile}
            location={location}
            setLocation={setLocation}
            image={image}
            setImage={setImage}
            onAddEvent={handleAddEvent}
            buttonLabel={t("publish")}
            disable={disable}
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
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />
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
