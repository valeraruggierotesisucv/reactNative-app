import { StyleSheet, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "../navigators/AuthStackNavigator";
import { useTranslation } from "../contexts/TranslationContext";
import { CategoryButton } from "../components/CategoryButton/CategoryButton";
import { useState } from "react";
import { Button } from "../components/Button/Button";
import { AuthRoutes } from "../../utils/routes";

function CategoriesList() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handlePress = (categoryId: string) => {
    setSelectedIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const categories = [
    { id: "1", label: "Food", icon: "food" },
    { id: "2", label: "Drinks", icon: "cup" },
    { id: "3", label: "Sports", icon: "basketball" },
    { id: "4", label: "Music", icon: "music" },
    { id: "5", label: "Art", icon: "palette" },
    { id: "6", label: "Movies", icon: "movie" },
    { id: "7", label: "Books", icon: "book" },
    { id: "8", label: "Games", icon: "gamepad-variant" },
    { id: "9", label: "Travel", icon: "airplane" },
    { id: "10", label: "Shopping", icon: "shopping" },
    { id: "11", label: "Health", icon: "heart" },
    { id: "12", label: "Education", icon: "school" },
  ];

  return (
    <View style={styles.grid}>
      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          label={category.label}
          icon={category.icon as any}
          selected={selectedIds.includes(category.id)}
          onPress={() => handlePress(category.id)}
        />
      ))}
    </View>
  );
}

export function ChooseCategoriesView() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader goBack={() => navigation.goBack()} />
        <Text style={styles.title}>{t("choose_categories")}</Text>

        <CategoriesList />
        <Button
          label={t("next")}
          onPress={() => navigation.navigate(AuthRoutes.Success)}
          style={styles.button}
        />
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontFamily: "SF-Pro-Text-Semibold",
    marginTop: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    paddingBottom: 20,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  button: {
    marginBottom: 53,
    marginTop: 20,
  },
});
