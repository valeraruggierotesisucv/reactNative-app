import { AntDesign } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface AppHeaderProps {
  title?: string;
  goBack?: () => void;
  goToConfig?: () => void;
}

export function AppHeader({ title, goBack, goToConfig }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {goBack && (
          <TouchableOpacity onPress={goBack} style={styles.iconButton}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.centerContainer}>
        {title ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <Image
            source={require("../../../assets/EventifyTextLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.rightContainer}>
        {goToConfig && (
          <TouchableOpacity onPress={goToConfig} style={styles.iconButton}>
            <AntDesign name="setting" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 0,
    height: 60,
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  iconButton: {
    opacity: 1,
    marginLeft: 10,
  },
  logo: {
    height: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: "SF-Pro-Rounded-Semibold",
    color: "black",
  },
});
