import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../../utils/theme";
import { useTranslation } from "react-i18next";
  
interface DisplayInputProps {
  label: string;
  data: React.ReactNode;
}

export function DisplayInput({ label, data }: DisplayInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.data}>{data}</View>
    </View>
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
