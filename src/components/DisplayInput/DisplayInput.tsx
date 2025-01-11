import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../../utils/theme";
import { useTranslation } from "../../contexts/TranslationContext";

interface DisplayInputProps {
  label: string;
  data: React.ReactNode;
  onPress?: () => void
}

export function DisplayInput({ label, data, onPress }: DisplayInputProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.data}>{data}</Text>
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
    fontFamily: "SF-Pro-Rounded-Bold",
  },

  data: {
    flex: 1,
    color: "gray",
    fontFamily: "SF-Pro-Text-Regular",
  },
});
