import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { AuthRoutes } from "../../utils/routes";
import { AuthStackNavigationProp } from "../navigators/AuthStackNavigator";

export function OnboardingView() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  return (
    <View style={{ flex: 1, gap: 8 }}>
      <Text style={{ fontFamily: "SF-Pro-Rounded-Heavy", fontSize: 24 }}>
        OnboardingView
      </Text>
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
    </View>
  );
}
