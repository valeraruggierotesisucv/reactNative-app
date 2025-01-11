import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { AddStackNavigationProp } from "../navigators/AddStack";
import React from "react";
import { AddDateView } from "./AddDateView";
import { CategoriesEnum } from "../../utils/shareEnums";
import { ChooseCategoriesView } from "./ChooseCategoriesView";
import { AddDefaultView } from "./AddDefaultView";
import { StepsEnum } from "./AddDefaultView";
import * as Location from "expo-location";
import { LatLng } from "react-native-maps";
import { AddLocationView } from "./AddLocationView";
import { uploadImage } from "../services/storage";

/* TODO
    Description debe tener max caracteres 
*/

export function AddView() {
  const navigation = useNavigation<AddStackNavigationProp>();
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

  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [category, setCategory] = useState<CategoriesEnum | null>(null);
  const [location, setLocation] = useState<LatLng | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [musicFile, setMusicFile] = useState<{nameFile: string; uri: string;} | null>(null);

  const [step, setStep] = useState<StepsEnum>(StepsEnum.DEFAULT);

  function handleAddEvent() {
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

    console.log("Uploading image..."); 
    if(image){
      uploadImage(image)
    }
    
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


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
