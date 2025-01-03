import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../../utils/theme";
import { MaterialIcons } from "@expo/vector-icons";

export enum InputVariant {
  DEFAULT = "default",
  ARROW = "arrow",
}

interface InputProps {
  label: string;
  placeholder: string;
  variant?: InputVariant;
  onPress?: () => void;
}

export function Input({
  label,
  placeholder,
  variant = InputVariant.DEFAULT,
  onPress,
}: InputProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.placeholder}>{placeholder}</Text>
      {variant === InputVariant.ARROW ? (
        <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors["gray"],
  },

  label: {
    flex: 0.45,
    fontWeight: "bold",
    fontFamily: "SF-Pro-Rounded-Bold",
  },

  placeholder: {
    flex: 1,
    color: "gray",
    fontFamily: "SF-Pro-Text-Regular",
  },
});
