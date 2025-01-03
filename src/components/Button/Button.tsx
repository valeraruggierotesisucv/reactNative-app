import { TouchableOpacity, Text } from "react-native";
import { StyleSheet } from "react-native";
import { theme } from "../../../utils/theme";

export enum ButtonSize {
  EXTRA_SMALL = "extraSmall",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum ButtonVariant {
  PRIMARY = "primary",
}

interface ButtonProps {
  label: string;
  onPress?: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({
  label,
  onPress,
  size = ButtonSize.MEDIUM,
  variant = ButtonVariant.PRIMARY,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, styles[size], styles[variant]]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  label: {
    color: "white",
    fontFamily: "SF-Pro-Rounded-Semibold",
  },
  extraSmall: {
    borderRadius: 5,
    width: 72,
    height: 36,
  },
  small: {
    borderRadius: 5,
    width: 160,
    height: 32,
  },
  medium: {
    borderRadius: 30,
    width: 251,
  },
  large: {
    borderRadius: 30,
    width: 330,
  },
  primary: {
    backgroundColor: theme.colors["primary"],
  },
});
