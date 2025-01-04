import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

export function SearchBar({
  placeholder = "Search",
  onChangeText,
  value,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={20} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
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
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
});
