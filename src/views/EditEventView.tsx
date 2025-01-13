import { Text, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { AddStackNavigationProp } from "../navigators/AddStack";
import React from "react";
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
/* TODO
    Description debe tener max caracteres 
*/

interface Event {
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
  const route = useRoute<RouteProp<ProfileStackParamList, ProfileRoutes.EditEvent>>();
  const eventId = route.params.eventId;
  const [event, setEvent] = useState<Event>({
    description: "Evento de prueba",
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    category: CategoriesEnum.EDUCATION,
    location: {
      latitude: 0,
      longitude: 0
    },
    image: "https://dancingastronaut.com/wp-content/uploads/2022/06/imgonline-com-ua-twotoone-3h3siEMcoQW7.jpg",
    musicFile: {
      nameFile: "music.mp3",
      uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdancingastronaut.com%2F2022%2F06%2Fmartin-garrix-debuts-sentio-in-south-america-during-newest-the-martin-garrix-show-epsiode%2F&psig=AOvVaw1I9aaqLIf5nQsalRaCP_Sb&ust=1736561346130000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMiiyK2J6ooDFQAAAAAdAAAAABAE"
    }

  })
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

  const [description, setDescription] = useState<string | null>(event.description);
  const [date, setDate] = useState<Date | null>(event.date);
  const [startTime, setStartTime] = useState<Date | null>(event.startTime);
  const [endTime, setEndTime] = useState<Date | null>(event.endTime);
  const [category, setCategory] = useState<CategoriesEnum | null>(event.category);
  const [location, setLocation] = useState<LatLng | null>(event.location);
  const [image, setImage] = useState<string | null>(event.image);
  const [musicFile, setMusicFile] = useState<{
    nameFile: string;
    uri: string;
  } | null>(event.musicFile);

  const [step, setStep] = useState<StepsEnum>(StepsEnum.DEFAULT);

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

  function cleanForm() {
    setDescription(null);
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setCategory(null);
    setLocation(null);
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        cleanForm();
      };
    }, [])
  );
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
        <AppHeader title={step === StepsEnum.DEFAULT ? t("editEvent.edit_event") : step === StepsEnum.DATE ? t("editEvent.when") : step === StepsEnum.CATEGORY ? t("editEvent.category") : step === StepsEnum.LOCATION ? t("editEvent.location") : ""} goBack={() => step === StepsEnum.DEFAULT ? navigation.goBack() : setStep(StepsEnum.DEFAULT)} />
        {step === StepsEnum.DEFAULT && (
          <AddDefaultView
            step={step}
            setStep={setStep}
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
            buttonLabel={t("save_changes")}
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
    backgroundColor: "#FFFFFF",
  },
  scrollViewContent: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
