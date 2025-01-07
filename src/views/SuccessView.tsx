import {   StyleSheet, Text, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "../contexts/TranslationContext";
import { AuthRoutes } from "../../utils/routes";
import { Button } from "../components/Button/Button";
import { AuthStackNavigationProp } from "../navigators/AuthStackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";


export function SuccessView() {
    const navigation = useNavigation<AuthStackNavigationProp>();
    const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>{t("success")}</Text>
            <Text style={styles.description}>{t("success_description")}</Text>
        </View>

        <View style={styles.imageContainer}>
            <Image source={require("../../assets/images/Success.png")} style={styles.image} />
        </View>
        <Button label={t("next")} onPress={() => navigation.navigate(AuthRoutes.Auth)} style={styles.button} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  content: {
    marginHorizontal: "auto",
    width: "80%",
  },
  title: {
    fontSize: 32,
    fontFamily: "SF-Pro-Rounded-Semibold",
    marginTop: 20,
    color: "#050F71",
  },
  description: {
    fontSize: 25,
    fontFamily: "SF-Pro-Rounded-Medium",
  },
  imageContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    marginLeft:300
  },
  button: {
    marginBottom: 58,
  },
});
