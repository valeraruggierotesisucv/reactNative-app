import { SafeAreaView } from "react-native-safe-area-context"; 
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { Button } from "../components/Button/Button";
import { useState } from "react";
import { Steps } from "./AddView";
import { CategoryButton } from "../components/CategoryButton/CategoryButton";
import { CategoriesEnum } from "./SearchView";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "../navigators/AuthStackNavigator";
import { AuthRoutes } from "../../utils/routes";
interface ChooseCategoryProps {
    step?: Steps, 
    setStep?: (step: Steps) => void, 
    category?: CategoriesEnum | null, 
    setCategory?: ( category: CategoriesEnum) => void, 
    preferences: boolean
}

// TODO limitar a poder seleccionar una sola categoria 
export function ChooseCategoriesView({
    step, 
    setStep, 
    category, 
    setCategory, 
    preferences = true
}: ChooseCategoryProps) {
    const [selectedId, setSelectedId] = useState<CategoriesEnum | null>(category ?? null);
    const navigation = useNavigation<AuthStackNavigationProp>();

    const handlePress = (category: CategoriesEnum) => {
        setSelectedId(category);
        if (setCategory){
          setCategory(category)
        }        
    };
    const categories = [
        { id: '1', label: CategoriesEnum.CULTURE, icon: 'palette' }, 
        { id: '2', label: CategoriesEnum.EDUCATION, icon: 'bookshelf' },
        { id: '3', label: CategoriesEnum.PARTIES, icon: 'party-popper' },
        { id: '4', label: CategoriesEnum.CONCERTS, icon: 'music' },
        { id: '5', label: CategoriesEnum.FESTIVALS, icon: 'bookmark-music-outline' },
        { id: '6', label: CategoriesEnum.SPORTS, icon: 'trophy' },
        { id: '7', label: CategoriesEnum.THEATER, icon: 'theater' },
        { id: '8', label: CategoriesEnum.EXHIBITIONS, icon: 'image' },
        { id: '9', label: CategoriesEnum.CLUBS, icon: 'account-group' }
    ];

    function handleNext(){  
      if(preferences){
        navigation.navigate(AuthRoutes.Success)
      } else{
        setStep(Steps.DEFAULT)
      }         
        
    }
    return(
        //TODO: falta agregar mensaje de error 
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <AppHeader title="Categoría"/> 
                <Text>Seleccione la categoría que mejor se adapte a tu evento</Text>
                <View style={styles.grid}>
                    {categories.map((category) => (
                        <CategoryButton
                            key={category.id}
                            label={category.label}
                            icon={category.icon as any}
                            selected={selectedId === category.label}
                            onPress={() => handlePress(category.label)}
                        />
                    ))}
                </View>
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
  grid: {
    flexDirection: 'row' ,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
    padding: 20
    },
  footer: {
    flex: 1, 
    justifyContent: "flex-end", 
    paddingBottom: 10
  }
});