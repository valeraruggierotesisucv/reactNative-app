import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, Image, Dimensions, View } from "react-native";
import { AuthStackNavigationProp } from "../navigators/AuthStackNavigator";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonSize } from "../components/Button/Button";
import { AuthRoutes } from "../../utils/routes";
import { IconLogo } from "../components/IconLogo/IconLogo";

export function OnboardingView() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { t } = useTranslation();
  const { height } = Dimensions.get("window");

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.logoContainer}>
      <IconLogo style={styles.iconLogo} />
        <Image
          source={require("../../assets/images/Onboarding.png")}
          style={[styles.logo, {  height: height * 0.4 }]}
        />
        <Text style={styles.title}>{t("welcome")}</Text>
      </View>
      <Button
        label={t("auth.get_started")}
        onPress={() => navigation.navigate(AuthRoutes.Auth)}
        style={styles.button}
        size={ButtonSize.LARGE}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "SF-Pro-Rounded-Heavy",
    fontSize: 50,
    lineHeight: 50,
    width: 300,
    letterSpacing: -3,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
  },
  iconLogo: {
    marginTop: 36,
    marginBottom: "auto",
  },
  button: {
    marginTop: 47,
    marginBottom: 61,
    height: 70,
  },
});
