import { SafeAreaView } from "react-native-safe-area-context"; 
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AddStackNavigationProp } from "../navigators/AddStack";
import { Calendar } from "../components/Calendar/Calendar";
import { Button } from "../components/Button/Button";
import { AddRoutes } from "../../utils/routes";
import { AddStackParamList } from "../../utils/types";
import { useState } from "react";
import { Steps } from "./AddView";
import { start } from "node:repl";

interface AddDateViewProps {
  step: Steps, 
  setStep: (step: Steps) => void, 
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
    const navigation = useNavigation<AddStackNavigationProp>();
    const [showError, setShowError] = useState(false); 

    function handleNext(){
      
      if(!date || !startTime || !endTime){
        setShowError(false)
        return 
      } 
      setShowError(true)
      setStep(Steps.DEFAULT)
    }

    return(
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <AppHeader title="¿Cuándo?" goBack={() => setStep(Steps.DEFAULT)} />            
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