import { StyleSheet, View, Text } from "react-native";
import { Button } from "../components/Button/Button";
import { useState } from "react";
import { StepsEnum } from "./AddDefaultView";
import { CategoryButton } from "../components/CategoryButton/CategoryButton";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "../navigators/AuthStackNavigator";
import { AuthRoutes } from "../../utils/routes";
import { theme } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import { CategoriesEnum } from "../../utils/shareEnums";
import React from "react";

interface ChooseCategoryProps {
  step?: StepsEnum;
  setStep?: (step: StepsEnum) => void;
  category?: CategoriesEnum | null;
  setCategory?: (category: CategoriesEnum) => void;
  categoryId: number | null; 
  setCategoryId: (categoryId: number) => void; 
  preferences?: boolean;
}

export function ChooseCategoriesView({
  step,
  setStep,
  category,
  setCategory,
  categoryId, 
  setCategoryId, 
  preferences = true,
}: ChooseCategoryProps) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<CategoriesEnum | null>(
    category ?? null
  );
  const navigation = useNavigation<AuthStackNavigationProp>();

  const handlePress = (category: CategoriesEnum, categoryId: number) => {
    setSelectedId(category);
    if (setCategory) {
      setCategory(category);
      setCategoryId(categoryId)
    }
  };
  const categories = [
    { id: "1", label: t("categories.culture"), icon: "palette" },
    { id: "2", label: t("categories.education"), icon: "bookshelf" },
    { id: "3", label: t("categories.parties"), icon: "party-popper" },
    { id: "4", label: t("categories.concerts"), icon: "music" },
    { id: "5", label: t("categories.festivals"), icon: "bookmark-music-outline" },
    { id: "6", label: t("categories.sports"), icon: "trophy" },
    { id: "7", label: t("categories.theater"), icon: "theater" },
    { id: "8", label: t("categories.exhibitions"), icon: "image" },
    { id: "9", label: t("categories.clubs"), icon: "account-group" },
  ];

  function handleNext() {
    if (setStep) {
      setStep(StepsEnum.DEFAULT);
    }
    if (preferences) {
      navigation.navigate(AuthRoutes.Success);
    }
  }

  return (
    <>
      <Text>{t("categories.description")}</Text>
      <View style={styles.grid}>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            label={category.label}
            icon={category.icon as any}
            selected={selectedId === category.label}
            onPress={() => handlePress(category.label as CategoriesEnum, parseInt(category.id))}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <Button label={t("common.next")} onPress={handleNext} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors['white'],
  },
  scrollViewContent: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
    padding: 20,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
});
