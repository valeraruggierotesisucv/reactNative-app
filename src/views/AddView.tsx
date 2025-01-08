import { ScrollView, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { AddStackNavigationProp } from "../navigators/AddStack";
import React from "react";
import { AddDateView } from "./AddDateView";
import { CategoriesEnum } from "../../utils/shareEnums";
import { ChooseCategoriesView } from "./ChooseCategoriesView";
import { AddDefaultView } from "./AddDefaultView";
import { StepsEnum } from "./AddDefaultView";
import * as Location from 'expo-location';

/* TODO
    Description debe tener max caracteres 
*/

export function AddView() {
    const navigation = useNavigation<AddStackNavigationProp>();
    const [description, setDescription] = useState<string | null>(null); 
    const [date, setDate] = useState<Date | null>(null); 
    const [startTime, setStartTime] = useState<Date | null>(null); 
    const [endTime, setEndTime] = useState<Date | null>(null); 
    const [category, setCategory] = useState<CategoriesEnum | null>(null); 
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    const [step, setStep] = useState<StepsEnum>(StepsEnum.DEFAULT); 

    function handleAddEvent(){
        console.log("Publicando evento...")
    }

    function cleanForm(){
        setDescription(null); 
        setDate(null); 
        setStartTime(null); 
        setEndTime(null); 
        setCategory(null); 
        setLocation(null)
    }

    useFocusEffect(
        useCallback(() => {           
          return () => {
            cleanForm()
          };
        }, [])
      );

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                
                { step === StepsEnum.DEFAULT && (
                    <AddDefaultView 
                        step={step}
                        setStep={setStep}
                        description={description}
                        setDescription={setDescription}
                        date={date}
                        category={category}
                        startsAt={startTime}
                        endsAt={endTime}
                        location={location}
                        setLocation={setLocation}
                    />
                )}

                { step === StepsEnum.DATE && (
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
                
                { step === StepsEnum.CATEGORY && (
                    <ChooseCategoriesView 
                        step={step}
                        setStep={setStep}
                        category={category}
                        setCategory={setCategory}
                        preferences={false}
                    />
                )}                
                
            </ScrollView>
        </SafeAreaView>
    )
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