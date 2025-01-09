import { SafeAreaView } from "react-native-safe-area-context"; 
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { Calendar } from "../components/Calendar/Calendar";
import { Button } from "../components/Button/Button";
import { useState } from "react";
import { StepsEnum } from "./AddDefaultView";

interface AddDateViewProps {
  step: StepsEnum, 
  setStep: (step: StepsEnum) => void, 
  date: Date | null, 
  setDate: (date: Date | null) => void, 
  startTime: Date | null, 
  setStartTime: (date: Date | null) => void, 
  endTime: Date | null, 
  setEndTime: (date: Date | null) => void
}

export function AddDateView({
  step, 
  setStep, 
  date, 
  setDate, 
  startTime, 
  setStartTime, 
  endTime, 
  setEndTime
}: AddDateViewProps){
    const [showError, setShowError] = useState(false); 

    function handleNext(){
      
      if(!date || !startTime || !endTime){
        setShowError(true)
        return 
      } 
      setShowError(true)
      setStep(StepsEnum.DEFAULT)
    }

    return(
      <>
        <AppHeader title="¿Cuándo?" goBack={() => setStep(StepsEnum.DEFAULT)} />            
        <Calendar
          date={date}
          initialStartTime={startTime}
          initialEndTime={endTime}
          onDateChange={setDate}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
        />
        { showError && <Text style={styles.errorText}> * Por favor proporcione la fecha y hora del evento </Text>}          
    
        <View style={styles.footer}>
          <Button 
            label="Siguiente"
            onPress={handleNext}
          />
        </View>  
      </>
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
  }, 
  errorText: {
    color: "#FF0000",
    fontWeight: "bold", 
    fontSize: 12,
    marginTop: 4,
    fontFamily: "SF-Pro-Text-Regular",
    padding: 20, 
  },
});