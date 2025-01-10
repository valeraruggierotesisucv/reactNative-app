import { View, ScrollView, StyleSheet } from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { InputField } from "../components/InputField/InputField";
import { useState } from "react";
import { Button, ButtonSize } from "../components/Button/Button";
import { theme } from "../../utils/theme";

export function ChangePasswordView() {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [passwords, setPasswords] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visibility, setVisibility] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togleVisibility = (field: keyof typeof visibility) => {
    setVisibility({ ...visibility, [field]: !visibility[field] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader
          title="Cambiar Contraseña"
          goBack={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <InputField
            label="CONTRASEÑA ACTUAL"
            value={passwords.password}
            onChangeText={(text) =>
              setPasswords({ ...passwords, password: text })
            }
            icon={visibility.password ? "eye" : "eye-off"}
            secureTextEntry={!visibility.password}
            onPressIcon={() => togleVisibility("password")}
            variant="grayBackground"
          />
          <InputField
            label="NUEVA CONTRASEÑA"
            value={passwords.newPassword}
            onChangeText={(text) =>
              setPasswords({ ...passwords, newPassword: text })
            }
            icon={visibility.newPassword ? "eye" : "eye-off"}
            secureTextEntry={!visibility.newPassword}
            onPressIcon={() => togleVisibility("newPassword")}
            variant="grayBackground"
          />
          <InputField
            label="CONFIRMAR CONTRASEÑA"
            value={passwords.confirmPassword}
            onChangeText={(text) =>
              setPasswords({ ...passwords, confirmPassword: text })
            }
            icon={visibility.confirmPassword ? "eye" : "eye-off"}
            secureTextEntry={!visibility.confirmPassword}
            onPressIcon={() => togleVisibility("confirmPassword")}
            variant="grayBackground"
          />
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Button
              label="Enviar"
              onPress={() => console.log("Cambiar contraseña")}
              size={ButtonSize.MEDIUM}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors['white'],
  },
  scrollViewContent: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 46,
    alignItems: "center",
    marginBottom: 56,
    marginTop: 48,
  },
});
