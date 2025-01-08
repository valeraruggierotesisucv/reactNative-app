import { StyleSheet, Image, View, Platform} from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { IMAGE_PLACEHOLDER } from "../../utils/consts";
import { Input, InputVariant } from "../components/Input/Input";
import { useState } from "react";
import { Button, ButtonSize } from "../components/Button/Button";
import React from "react";
import { DisplayInput } from "../components/DisplayInput/DisplayInput";
import * as DocumentPicker from 'expo-document-picker';
import { CategoriesEnum } from "../../utils/shareEnums";
import { Chip, ChipVariant} from "../components/Chip/Chip";
import { formatHour } from "../../utils/formatHour";
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { truncateString } from "../../utils/formatString";

export enum StepsEnum {
    DEFAULT = "default", 
    DATE = "date", 
    CATEGORY = "category"
}

interface AddDefaultViewProps {
    step: StepsEnum, 
    setStep: (step: StepsEnum) => void, 
    description: string | null, 
    setDescription: (text: string | null) => void, 
    date: Date | null,
    startsAt: Date | null, 
    endsAt: Date | null, 
    category: CategoriesEnum | null, 
    location: Location.LocationObject | null, 
    setLocation: (location: Location.LocationObject) => void, 
    musicFile: {nameFile: string, uri: string } | null, 
    setMusicFile: (file: {nameFile: string, uri: string } | null) => void 
    onAddEvent: () => void
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
    onAddEvent
}: AddDefaultViewProps){
    
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
    
    function handleAddMusic(){
        console.log("Agregar musica...")
        const pickDocument = async() => {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'audio/*',
                copyToCacheDirectory: false,
            }); 
            if(result.assets){
                setMusicFile({
                    nameFile: result.assets[0].name, 
                    uri: result.assets[0].uri
                })
                console.log(result)            
            }

            // UploadFile 
        }
        pickDocument()
    }
    const DatePills = () => {
        if (startsAt === null || endsAt === null || date === null) return; 
        const start = formatHour(startsAt); 
        const end = formatHour(endsAt); 
        const formattedDate = date?.toLocaleDateString()
        
        return (
            <View style={{ flexDirection: "row", gap: 8 }}>
                <Chip label={start} variant={ChipVariant.LIGHT} onPress={() => setStep(StepsEnum.DATE)}/>
                <Chip label={end} variant={ChipVariant.LIGHT} onPress={() => setStep(StepsEnum.DATE)}/>
                <Chip label={formattedDate} variant={ChipVariant.LIGHT} onPress={() => setStep(StepsEnum.DATE)}/>
            </View>
        );
    }

    const LocationPills = () => {
        if(!location) return
        const latitude = location.coords.latitude.toFixed(3); 
        const longitude = location.coords.longitude.toFixed(3); 

        return(
            <View style={{ flexDirection: "row", gap: 8 }}>
                <Chip label={latitude} variant={ChipVariant.LIGHT} onPress={() => setStep(StepsEnum.DATE)}/>
                <Chip label={longitude} variant={ChipVariant.LIGHT} onPress={() => setStep(StepsEnum.DATE)}/>
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
            value={description ?? ""}
            onChangeValue={setDescription}
        />

        {/* FECHA Y HORA */} 
        { date && startsAt && endsAt
            ? <DisplayInput 
                label="¿CUÁNDO?"
                data={<DatePills />}
                onPress={() => setStep(StepsEnum.DATE)}
            />
            : <Input
                label="¿CUÁNDO?"
                placeholder="Agregar fecha y hora"
                variant={InputVariant.ARROW}
                onPress={() => setStep(StepsEnum.DATE)}
            />
        }
        
        {/* Categoría */} 
        { category
            ? <DisplayInput 
                label="CATEGORÍA"
                data={<Chip label={category.toUpperCase()} variant={ChipVariant.LIGHT} onPress={() => setStep(StepsEnum.CATEGORY)}/>}
                onPress={() => setStep(StepsEnum.CATEGORY)}
            />
            : <Input 
                label="CATEGORÍA"
                placeholder="Agregar categoría"
                variant={InputVariant.ARROW}
                onPress={() => setStep(StepsEnum.CATEGORY)}
            />
        }
        
        {/* MÚSICA */}
        { musicFile
            ? <DisplayInput
                label="MÚSICA"
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
        { location
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
                onPress={onAddEvent}
            />
        </View>        
        </>
    )   
}

const styles = StyleSheet.create({
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