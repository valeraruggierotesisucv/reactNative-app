import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

export interface Category {
  id: string;
  label: string;
}

interface PillsProps {
  categories: Category[];
  onSelectCategories?: (categoryIds: string[]) => void;
  selectedCategories?: string[];
}

export function Pills({
  categories,
  onSelectCategories,
  selectedCategories = [],
}: PillsProps) {
  const [selected, setSelected] = useState<string[]>(selectedCategories);

  const handlePress = (categoryId: string) => {
    const newSelected = selected.includes(categoryId)
      ? selected.filter((id) => id !== categoryId)
      : [...selected, categoryId];

    setSelected(newSelected);
    onSelectCategories?.(newSelected);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.pill,
            selected.includes(category.id) && styles.selectedPill,
          ]}
          onPress={() => handlePress(category.id)}
        >
          <Text
            style={[
              styles.pillText,
              selected.includes(category.id) && styles.selectedPillText,
            ]}
          >
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    height: 45,
    justifyContent: "center", 
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedPill: {
    backgroundColor: "#050F71",
    borderColor: "#050F71",
  },
  pillText: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "SF-Pro-Text-Semibold",
  },
  selectedPillText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
