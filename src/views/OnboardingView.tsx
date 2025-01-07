import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, Image } from "react-native";

import { AuthStackNavigationProp } from "../navigators/AuthStackNavigator";
import { useTranslation } from "../contexts/TranslationContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonSize } from "../components/Button/Button";
import { AuthRoutes } from "../../utils/routes";
import { IconLogo } from "../components/IconLogo/IconLogo";

export function OnboardingView() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <IconLogo style={styles.iconLogo} />
      <Image
        source={require("../../assets/images/Onboarding.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>{t("welcome")}</Text>
      <Button
        label={t("get_started")}
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
  },
  title: {
    fontFamily: "SF-Pro-Rounded-Heavy",
    fontSize: 55,
    lineHeight: 55,
    width: 300,
    letterSpacing: -3,
  },
  logo: {
    width: 380,
    height: 380,
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
