import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface DateTimePickerFieldProps {
  label: string;
  value: Date | string;
  onChange: (date: Date) => void;
  placeholder?: string;
  error?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  variant?: "default" | "grayBackground";
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
}

export function DateTimePickerField({
  label,
  value,
  onChange,
  placeholder,
  error,
  icon,
  variant = "default",
  style,
  iconColor,
}: DateTimePickerFieldProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  const displayValue = typeof value === "string" ? new Date(value) : value;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          variant === "grayBackground" && styles.grayBackground,
          error && styles.inputError,
        ]}
        onPress={showDatePicker}
      >
        <Text style={styles.input}>
          {displayValue ? displayValue.toLocaleDateString() : placeholder}
        </Text>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={iconColor || "#666666"}
            style={styles.icon}
          />
        )}
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000000",
    fontFamily: "SF-Pro-Rounded-Bold",
  },
  inputContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  grayBackground: {
    backgroundColor: "#E0E0E0",
  },
  input: {
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Regular",
    color: "#000",
  },
  inputError: {
    borderColor: "#FF0000",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "SF-Pro-Text-Regular",
  },
  icon: {
    marginLeft: 8,
  },
}); 