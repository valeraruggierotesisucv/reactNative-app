import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "react-native";
import { AuthRoutes } from "../../utils/routes";
import { AuthStackNavigationProp } from "../navigators/AuthStackNavigator";
import { useTranslation } from "../contexts/TranslationContext";
import { SafeAreaView } from "react-native-safe-area-context";

export function OnboardingView() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { t, setLocale, locale } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1, gap: 8 }}>
      <Text style={{ fontFamily: "SF-Pro-Rounded-Heavy", fontSize: 24 }}>
        {t("welcome")}
      </Text>
      <Button
        onPress={() => setLocale(locale === "en" ? "es" : "en")}
        title={`Toggle ${locale}`}
      />
      <Button
        title="Autenticación"
        onPress={() => navigation.navigate(AuthRoutes.Auth)}
      />
      <Button
        title="Olvidé mi contraseña"
        onPress={() => navigation.navigate(AuthRoutes.ForgotPassword)}
      />
      <Button
        title="Escoger categorías"
        onPress={() => navigation.navigate(AuthRoutes.ChooseCategories)}
      />

      <Button
        title="Olvide mi contraseña Login View"
        onPress={() => navigation.navigate(AuthRoutes.ForgotPasswordLogin)}
      />
    </SafeAreaView>
  );
}
