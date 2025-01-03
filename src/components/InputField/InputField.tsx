import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onPressIcon?: () => void;
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  icon,
  onPressIcon,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
        />
        {icon && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={onPressIcon}
            disabled={!onPressIcon}
          >
            <MaterialCommunityIcons name={icon} size={24} color="#666666" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Regular",
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
  iconContainer: {
    paddingHorizontal: 12,
    height: "100%",
    justifyContent: "center",
  },
});
