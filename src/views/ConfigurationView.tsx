import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputVariant } from "../components/Input/Input";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { useNavigation } from "@react-navigation/native";
import { ProfileRoutes } from "../../utils/routes";
import { useAuth } from "../contexts/AuthContext";
import { theme } from "../../utils/theme";
import { useTranslation } from "../contexts/TranslationContext";

export function ConfigurationView() {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const { logout } = useAuth();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={styles.content}>
        <Input
          label={t("configuration.language").toUpperCase()}
          placeholder="Español"
          variant={InputVariant.ARROW}
        />
        <Input
          label={t("configuration.change_password").toUpperCase()}
          variant={InputVariant.ARROW}
          onPress={() => navigation.navigate(ProfileRoutes.ChangePassword)}
        />
        <Input label={t("configuration.logout").toUpperCase()} 
          onPress={logout}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors['white'],
  },
  content: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
});
