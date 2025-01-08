import { ScrollView, StyleSheet, Image, View, Text, Platform} from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { IMAGE_PLACEHOLDER } from "../../utils/consts";
import { Input, InputVariant } from "../components/Input/Input";
import { useState } from "react";
import { Button, ButtonSize } from "../components/Button/Button";
import { AddStackNavigationProp } from "../navigators/AddStack";
import React from "react";
import { AddDateView } from "./AddDateView";
import { DisplayInput } from "../components/DisplayInput/DisplayInput";
import { CategoriesEnum } from "../../utils/shareEnums";
import { ChooseCategoriesView } from "./ChooseCategoriesView";
import { Chip, ChipVariant} from "../components/Chip/Chip";
import { formatHour } from "../../utils/formatHour";
import * as Device from 'expo-device';
import * as Location from 'expo-location';

/* TODO
    Description debe tener max caracteres 
*/

export enum Steps {
    DEFAULT = "default", 
    DATE = "date", 
    CATEGORY = "category"
}

interface DefaultProps {
    step: Steps, 
    setStep: (step: Steps) => void, 
    description: string, 
    setDescription: (text: string) => void, 
    date: Date | null,
    startsAt: Date | null, 
    endsAt: Date | null, 
    category: CategoriesEnum | null, 
    location: Location.LocationObject | null, 
    setLocation: (location: Location.LocationObject) => void
}

function Default({
    step, 
    setStep, 
    description, 
    setDescription, 
    date, 
    startsAt, 
    endsAt, 
    category, 
    location, 
    setLocation
}: DefaultProps){
    
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    // TODO: colocar esta funcion fuera 
    async function getCurrentLocation() {
        if (Platform.OS === 'android' && !Device.isDevice) {
          setErrorMsg(
            'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
          );
          return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }

    const DatePills = () => {
        if (startsAt === null || endsAt === null || date === null) return; 
        const start = formatHour(startsAt); 
        const end = formatHour(endsAt); 
        const formattedDate = date?.toLocaleDateString()
        
        return (
            <View style={{ flexDirection: "row", gap: 8 }}>
                <Chip label={start} variant={ChipVariant.LIGHT} onPress={() => setStep(Steps.DATE)}/>
                <Chip label={end} variant={ChipVariant.LIGHT} onPress={() => setStep(Steps.DATE)}/>
                <Chip label={formattedDate} variant={ChipVariant.LIGHT} onPress={() => setStep(Steps.DATE)}/>
            </View>
        );
    }

    const LocationPills = () => {
        if(!location) return
        const latitude = location.coords.latitude.toFixed(3); 
        const longitude = location.coords.longitude.toFixed(3); 

        return(
            <View style={{ flexDirection: "row", gap: 8 }}>
                <Chip label={latitude} variant={ChipVariant.LIGHT} onPress={() => setStep(Steps.DATE)}/>
                <Chip label={longitude} variant={ChipVariant.LIGHT} onPress={() => setStep(Steps.DATE)}/>
            </View>
        )
        

    }
    return(
        <>
        <AppHeader title="Nuevo Evento" />
        {/* Imagen */} 
        <Image
            source={{ uri: IMAGE_PLACEHOLDER}}
            style={styles.image}
        />

        {/* Descripción */} 
        <Input
            label="DESCRIPCIÓN"
            placeholder="Agrega una descripción de tu evento"
            variant={InputVariant.DEFAULT}
            value={description}
            onChangeValue={setDescription}
        />

        {/* FECHA Y HORA */} 
        { date && startsAt && endsAt
            ? <DisplayInput 
                label="¿CUÁNDO?"
                data={<DatePills />}
                onPress={() => setStep(Steps.DATE)}
            />
            : <Input
                label="¿CUÁNDO?"
                placeholder="Agregar fecha y hora"
                variant={InputVariant.ARROW}
                onPress={() => setStep(Steps.DATE)}
            />
        }
        
        {/* Categoría */} 
        { category
            ? <DisplayInput 
                label="CATEGORÍA"
                data={<Chip label={category.toUpperCase()} variant={ChipVariant.LIGHT} onPress={() => setStep(Steps.CATEGORY)}/>}
                onPress={() => setStep(Steps.CATEGORY)}
            />
            : <Input 
                label="CATEGORÍA"
                placeholder="Agregar categoría"
                variant={InputVariant.ARROW}
                onPress={() => setStep(Steps.CATEGORY)}
            />
        }
        
        <Input 
            label="MÚSICA"
            placeholder="Agregar música"
            variant={InputVariant.ARROW}
        />
        
        {
            location
            ? <DisplayInput 
                label="UBICACIÓN"
                data={<LocationPills />}
                onPress={getCurrentLocation}
            />
            : <Input 
                label="UBICACIÓN"
                placeholder="Agregar ubicación"
                variant={InputVariant.ARROW}
                onPress={getCurrentLocation}
            />
        }
        
        <View style={styles.footer}>
            <Button 
                label="Publicar"
                size={ButtonSize.MEDIUM}
            />
        </View>        
        </>
    )   
}

export function AddView() {
    const navigation = useNavigation<AddStackNavigationProp>();
    const [description, setDescription] = useState(""); 
    const [date, setDate] = useState<Date | null>(null); 
    const [startTime, setStartTime] = useState<Date | null>(null); 
    const [endTime, setEndTime] = useState<Date | null>(null); 
    const [category, setCategory] = useState<CategoriesEnum | null>(null); 
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    const [step, setStep] = useState<Steps>(Steps.DEFAULT); 

    function handleAddEvent(){
        console.log("Publicando evento...")
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                
                { step === Steps.DEFAULT && (
                    <Default 
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

                { step === Steps.DATE && (
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
                
                { step === Steps.CATEGORY && (
                    <ChooseCategoriesView 
                        step={step}
                        setStep={setStep}
                        category={category}
                        setCategory={setCategory}
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
  image:{
    height: 270, 
    width: "100%"
  }, 
  footer: {
    flex: 1, 
    justifyContent: "flex-end", 
    paddingBottom: 10
  }
});