import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputVariant } from "../components/Input/Input";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { useNavigation } from "@react-navigation/native";
import { ProfileRoutes } from "../../utils/routes";
import { useAuth } from "../contexts/AuthContext";

export function ConfigurationView() {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const { logout } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={styles.content}>
        <Input
          label="IDIOMA"
          placeholder="Español"
          variant={InputVariant.ARROW}
        />
        <Input
          label="CAMBIAR CONTRASEÑA"
          variant={InputVariant.ARROW}
          onPress={() => navigation.navigate(ProfileRoutes.ChangePassword)}
        />
        <Input label="CERRAR SESIÓN" 
          onPress={logout}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
});
