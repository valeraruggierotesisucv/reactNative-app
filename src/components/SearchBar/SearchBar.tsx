import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  onChangeText?: (text: string) => void;
  value?: string;
}

export function SearchBar({ onChangeText, value }: SearchBarProps) {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, Platform.OS === "ios" && styles.containerIOS]}>
      <AntDesign name="search1" size={20} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={t("search.placeholder")}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor="gray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "100%",
  },
  containerIOS: {
    paddingVertical: 10,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
});
