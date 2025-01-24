import { Text, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { AddDateView } from "./AddDateView";
import { CategoriesEnum } from "../../utils/shareEnums";
import { ChooseCategoriesView } from "./ChooseCategoriesView";
import { AddDefaultView } from "./AddDefaultView";
import { StepsEnum } from "./AddDefaultView";
import * as Location from "expo-location";
import  {  LatLng } from "react-native-maps";
import { Modal } from "../components/Modal/Modal";
import { AddLocationView } from "./AddLocationView";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { ProfileStackParamList } from "../../utils/types";
import { ProfileRoutes } from "../../utils/routes";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useTranslation } from "react-i18next";
import React from "react";
import { theme } from "../../utils/theme";
import { EventDetailsController } from "../controllers/EventDetailsController";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "../components/Loading/Loading";
import { truncateString } from "../../utils/formatString";
import { getDate } from "../../utils/formatDate";
import { convertTimeToDate } from "../../utils/formatHour";
import { EventModel } from "../models/EventModel";
import { FileTypeEnum } from "../services/storage";
import { EditEventController } from "../controllers/EditEventController";
import { LocationController } from "../controllers/LocationController";
import { access } from "fs";
import { FileController } from "../controllers/FileController";


/* TODO
    Description debe tener max caracteres 
*/

export function EditEventView() {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState(true); 
  const { session, user } = useAuth(); 
  const route = useRoute<RouteProp<ProfileStackParamList, ProfileRoutes.EditEvent>>(); 
  const [step, setStep] = useState<StepsEnum>(StepsEnum.DEFAULT);
  const [prevEvent, setPrevEvent] = useState<EventModel | null >(null); 
  const [disable, setDisable] = useState(false); 

  const [title, setTitle] = useState<string | null>(null); 
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [category, setCategory] = useState<CategoriesEnum | null>(null);
  const [categoryId, setCategoryId] = useState<number|null>(null); 
  const [location, setLocation] = useState<LatLng | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string | null> (null); 
  const [musicFile, setMusicFile] = useState<{ nameFile: string; uri: string} | null>(null);
  const [origin, setOrigin] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin(location);
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
      async function fetchEventDetails(){
        if(session && user){
          setIsLoading(true); 
          const event = await EventDetailsController.getEventDetails(session.access_token, route.params?.eventId, user.id); 
          const formattedDate = getDate(event?.date || ""); 
          const formattedStarsAt = convertTimeToDate(event?.startsAt || ""); 
          const formattedEndsAt = convertTimeToDate(event?.endsAt || "");
          setPrevEvent(event); 

          if(event){
            setTitle(event?.title); 
            setDescription(event.description); 
            setDate(formattedDate); 
            setStartTime(formattedStarsAt); 
            setEndTime(formattedEndsAt); 
            setCategory(event.category as CategoriesEnum); 
            setCategoryId(parseInt(event.categoryId)); 
            setMusicFile( { nameFile: truncateString(event.musicUrl, 20), uri: event.musicUrl});  /* TODO: falta guardar nombre del file */
            setImage(event.eventImage); 
            setLocation({ latitude: parseFloat(event.latitude), longitude: parseFloat(event.longitude)})
            setLocationId(event.locationId)
          }
          
          setIsLoading(false); 
        }
      }
  
      fetchEventDetails()
  }, [])



  async function handleEditEvent() {
   
    if (title && description && date && startTime && endTime && category && image && musicFile && location && session) {
      setDisable(true); 
      let imageUrl = prevEvent?.eventImage; 
      let musicUrl = prevEvent?.musicUrl; 
      let updateLocation = false; 
      let locationId = prevEvent?.locationId; 
     
      if(musicFile.uri !== prevEvent?.musicUrl && prevEvent){
        console.log("Upload new music"); 
        musicUrl = await FileController.uploadFile(musicFile.uri, FileTypeEnum.AUDIO); 
        await FileController.deleteFile(prevEvent?.musicUrl, FileTypeEnum.AUDIO); 
      }

      if(image !== prevEvent?.eventImage && prevEvent){
        console.log("Upload new Image"); 
        imageUrl = await FileController.uploadFile(image, FileTypeEnum.IMAGE); 
        await FileController.deleteFile(prevEvent?.eventImage, FileTypeEnum.IMAGE); 
      }

      if(prevEvent && (location.latitude !== parseFloat(prevEvent?.latitude) || location.longitude !== parseFloat(prevEvent?.longitude))){
        updateLocation = true;              

        locationId = await LocationController.addLocation(session?.access_token, {
          latitude: location.latitude, 
          longitude: location.longitude
        })   
          
      }     

      const eventData = {
        userId: user?.id,
        title: title,
        description: description,
        date: date.toISOString(),
        startsAt: startTime.toISOString(),              // TODO: validar endsAt > startsAt
        endsAt: endTime.toISOString(), 
        eventImage: imageUrl,
        eventMusic: musicUrl, 
        categoryId: categoryId,                                
        latitude: location?.latitude,
        longitude: location?.longitude,    
        locationId: locationId  
      }
      
      if(prevEvent){
        const result = await EditEventController.updateEvent(session?.access_token, eventData, prevEvent?.eventId); 
        console.log("Evento actualizado: ", result);

        if(updateLocation){
          await LocationController.deleteLocation(session.access_token, prevEvent?.locationId)
          console.log("Se eliminó la location previa")
        }      
        
      }
      
      setModalVisible(true);
      setDisable(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader title={step === StepsEnum.DEFAULT ? t("editEvent.title") : step === StepsEnum.DATE ? t("editEvent.when") : step === StepsEnum.CATEGORY ? t("editEvent.category") : step === StepsEnum.LOCATION ? t("editEvent.location") : ""} goBack={() => step === StepsEnum.DEFAULT ? navigation.goBack() : setStep(StepsEnum.DEFAULT)} />
        { isLoading 
          ? <Loading/>
          : (<>
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
                onAddEvent={handleEditEvent}
                buttonLabel={t("save_changes")}
                edit={true}
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
                categoryId={categoryId}
                setCategoryId={setCategoryId}
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
          </>
        )}  
      </ScrollView>

      <Modal 
        visible={modalVisible} 
        onClose={() => {setModalVisible(false); navigation.navigate(ProfileRoutes.Profile)}}
      >   
        <Text style={{ 
            fontSize: 18, 
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 8,
        }}>
            {t("editEvent.event_edited")}
        </Text>
        <Image source={require('../../assets/images/Onboarding.png')} style={{ width: 200, height: 200, marginBottom: 16 }} />
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
