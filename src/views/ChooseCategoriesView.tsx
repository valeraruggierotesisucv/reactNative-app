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

interface ChooseCategoryProps {
    step: Steps, 
    setStep: (step: Steps) => void, 
}

export function ChooseCategoriesView({
    step, 
    setStep
}: ChooseCategoryProps) {
    function handleNext(){        
        setStep(Steps.DEFAULT)
    }
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <AppHeader title="Categoría"/>            
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
  
  footer: {
    flex: 1, 
    justifyContent: "flex-end", 
    paddingBottom: 10
  }
});