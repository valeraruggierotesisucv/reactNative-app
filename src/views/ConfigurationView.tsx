import { StyleSheet, View, Modal, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputVariant } from "../components/Input/Input";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { useNavigation } from "@react-navigation/native";
import { ProfileRoutes } from "../../utils/routes";
import { useAuth } from "../contexts/AuthContext";
import { theme } from "../../utils/theme";
import { useTranslation, Locale } from "../contexts/TranslationContext";
import React, { useState } from "react";

export function ConfigurationView() {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const { logout } = useAuth();
  const { t, locale, setLocale } = useTranslation();
  const [isPickerVisible, setPickerVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={styles.content}>
        <Input
          label={t("configuration.language").toUpperCase()}
          placeholder={locale === Locale.EN ? "English" : "Español"}
          variant={InputVariant.ARROW}
          onPress={() => setPickerVisible(true)}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPickerVisible}
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity onPress={() => {setLocale(Locale.ES); setPickerVisible(false)}} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Español</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setLocale(Locale.EN); setPickerVisible(false)}} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>
                English
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPickerVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>{t("common.cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
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
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalButton: {
    backgroundColor: "transparent",
    margin: 10,
    borderRadius: 20,
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Semibold",
    textAlign: "center",
    color: "#007AFF",
  },
  modalButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "white",
    width: "60%",
    padding: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "SF-Pro-Text-Regular",
    color: theme.colors['black'],
    marginBottom: 5,
    textAlign: "left",
  },
  
});
