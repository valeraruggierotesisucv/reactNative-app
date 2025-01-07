import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CategoryButtonProps {
  label: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
  selected?: boolean;
}

export function CategoryButton({
  label,
  icon = "handshake",
  onPress,
  selected = false,
}: CategoryButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={[styles.iconContainer, selected && styles.selectedIconContainer]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={50}
          color={selected ? "#050F71" : "#FFFFFF"}
        />
      </View>
      <Text style={[styles.label]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 140,
    padding: 0,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#050F71",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 2,
  },
  selectedIconContainer: {
    borderColor: "#050F71",
    backgroundColor: "#F5F5F5",
  },
  label: {
    fontSize: 17,
    color: "#000000",
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "SF-Pro-Rounded-Semibold",
  },
});
