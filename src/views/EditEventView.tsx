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
import { ProfileController } from "../controllers/ProfileController";
import { IMAGE_PLACEHOLDER } from "../../utils/consts";
import { Loading } from "../components/Loading/Loading";
import { truncateString } from "../../utils/formatString";
import { getDate } from "../../utils/formatDate";
import { convertTimeToDate } from "../../utils/formatHour";


/* TODO
    Description debe tener max caracteres 
*/

interface Event {
  title: string;
  description: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  category: CategoriesEnum;
  location: LatLng;
  image: string;
  musicFile: {
    nameFile: string;
    uri: string;
  }
}

export function EditEventView() {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState(true); 
  const { session, user } = useAuth(); 
  const route = useRoute<RouteProp<ProfileStackParamList, ProfileRoutes.EditEvent>>();
  const [ userComment, setUserComment] = useState<{username: string, profileImage:string}>({ "username": "", "profileImage": IMAGE_PLACEHOLDER}); 
  const [step, setStep] = useState<StepsEnum>(StepsEnum.DEFAULT);

  const [title, setTitle] = useState<string | null>(null); 
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [category, setCategory] = useState<CategoriesEnum | null>(null);
  const [categoryId, setCategoryId] = useState<number|null>(null); 
  const [location, setLocation] = useState<LatLng | null>(null);
  const [image, setImage] = useState<string | null>(null);
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
          const event = await EventDetailsController.getEventDetails(session.access_token, route.params?.eventId); 
          const formattedDate = getDate(event?.date || ""); 
          const formattedStarsAt = convertTimeToDate(event?.startsAt || ""); 
          const formattedEndsAt = convertTimeToDate(event?.endsAt || ""); 
          console.log("Editando el siguiente evento"); 
          console.log(event)

          if(event){
            setTitle(event?.title); 
            setDescription(event.description); 
            setDate(formattedDate); 
            setStartTime(formattedStarsAt); 
            setEndTime(formattedEndsAt); 
            setCategory(event.category as CategoriesEnum); 
            setMusicFile( { nameFile: truncateString(event.musicUrl, 20), uri: event.musicUrl});  /* TODO: falta gaurdar nombre del file */
            setImage(event.eventImage); 
            setLocation({ latitude: parseFloat(event.latitude), longitude: parseFloat(event.longitude)})
          }
          
          setIsLoading(false); 
        }
      }
  
      async function fetchProfile(){
        const profile = await ProfileController.getProfile(user?.id || "");
        setUserComment({
          "username": profile.username, 
          "profileImage": profile.profileImage || IMAGE_PLACEHOLDER
        })
      }
  
      fetchEventDetails()
      fetchProfile()
  }, [])



  function handleAddEvent() {
    setModalVisible(true);
    if (description && date && startTime && endTime && category && location) {
      // agregar evento
    }
    console.log("Publicando evento...");
    console.log("Descripcion: ", description);
    console.log("Date: ", date);
    console.log("Starts at: ", startTime);
    console.log("Ends at ", endTime);
    console.log("Category ", category);
    console.log("Location ", location);
  }

  // EditEventController
  // EditImageController
  // DeleteMusicController

  useEffect(() => {
    console.log("Editar evento")
  }, [])
  

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
                onAddEvent={handleAddEvent}
                buttonLabel={t("save_changes")}
                edit={true}
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
        onClose={() => {setModalVisible(false); navigation.goBack()}}
      >   
        <Text style={{ 
            fontSize: 18, 
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 8,
        }}>
            {t("event_edited")}
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
