import { ScrollView, StyleSheet, Image, View, Text} from "react-native";
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
    category: CategoriesEnum | null
}

function Default({
    step, 
    setStep, 
    description, 
    setDescription, 
    date, 
    startsAt, 
    endsAt, 
    category    
}: DefaultProps){

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
                data={<Chip label={category.toUpperCase()} variant={ChipVariant.LIGHT}/>}
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
        <Input 
            label="UBICACIÓN"
            placeholder="Agregar ubicación"
            variant={InputVariant.ARROW}
        />
        
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