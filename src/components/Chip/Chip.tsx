import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../../utils/theme";

export enum ChipVariant {
  DEFAULT = "default",
  LIGHT = "light",
}

interface ChipProps {
  label: string;
  onPress?: () => void;
  variant: ChipVariant;
}
export function Chip({
  label,
  onPress,
  variant = ChipVariant.DEFAULT,
}: ChipProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, styles[variant]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors["gray"],
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
    height: 37,
    padding: 5,
    borderRadius: 6,
  },
  label: {
    fontSize: 12,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  default: {
    color: theme.colors["primary"],
  },
  light: {
    color: theme.colors["secondary"],
  },
});
