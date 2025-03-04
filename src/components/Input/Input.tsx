import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { theme } from "../../../utils/theme";
import { MaterialIcons } from "@expo/vector-icons";

export enum InputVariant {
  DEFAULT = "default",
  ARROW = "arrow",
}

interface InputProps {
  label: string;
  placeholder?: string;
  multiline?: boolean; 
  variant?: InputVariant;
  required?: boolean; 
  onPress?: () => void;
  value?: string, 
  onChangeValue?: (data: string) => void;
  testID?: string;
}

export function Input({
  label,
  placeholder,
  variant = InputVariant.DEFAULT,
  multiline = true, 
  required = true, 
  onPress,
  value, 
  onChangeValue,
  testID
}: InputProps) {
  return (
    <TouchableOpacity testID={testID} onPress={onPress} style={styles.container}>
      <Text style={[styles.label, { flex: placeholder ? 0.45 : 1 }]}>
        {label}{" "}
        {required && <Text style={styles.required}>*</Text>}
      </Text>
      
      {variant === InputVariant.DEFAULT 
       ? (<TextInput 
            multiline={multiline}
            numberOfLines={multiline ? 3 : 1}
            style={styles.placeholder}
            placeholder={placeholder}
            onChange={onPress}
            value={value}
            onChangeText={onChangeValue}
            testID={testID ? `${testID}-input` : undefined}
       />)
       : (placeholder && <Text style={styles.placeholder}>{placeholder}</Text>)
      }
      
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
    justifyContent: "space-between",
  },

  label: {
    fontWeight: "bold",
    fontFamily: "SF-Pro-Rounded-Bold",
  },

  placeholder: {
    flex: 1,
    color: "gray",
    fontFamily: "SF-Pro-Text-Regular",
  },
  required:{
    color: theme.colors['red']
  }
});
