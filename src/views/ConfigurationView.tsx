import { StyleSheet, View, Modal, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputVariant } from "../components/Input/Input";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { useNavigation } from "@react-navigation/native";
import { ProfileRoutes } from "../../utils/routes";
import { useAuth } from "../contexts/AuthContext";
import { theme } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { DisplayInput } from "../components/DisplayInput/DisplayInput";

export function ConfigurationView() {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const { logout } = useAuth();
  const { t , i18n } = useTranslation();
  const [isPickerVisible, setPickerVisible] = useState(false);
  
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={styles.content}>
        <Input
          label={t("configuration.language").toUpperCase()}
          placeholder={i18n.language === "en-US" ? "English" : "Español"}
          variant={InputVariant.ARROW}
          onPress={() => setPickerVisible(true)}
          required={false}
        />
        <Input
          label={t("configuration.change_password").toUpperCase()}
          variant={InputVariant.ARROW}
          onPress={() => navigation.navigate(ProfileRoutes.ChangePassword)}
          required={false}
        />
        <TouchableOpacity onPress={logout}>
        <DisplayInput label={t("configuration.logout").toUpperCase()} data={<></>}/>
        </TouchableOpacity>
        
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPickerVisible}
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity onPress={() => { i18n.changeLanguage('es-ES'); setPickerVisible(false); }} style={styles.modalButton} disabled={i18n.language === "es-ES"}>
              <Text style={i18n.language === "es-ES" ? styles.modalButtonSelected : styles.modalButtonText}>Español</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { i18n.changeLanguage('en-US'); setPickerVisible(false); }} style={styles.modalButton} disabled={i18n.language === "en-US"}>
              <Text style={i18n.language === "en-US" ? styles.modalButtonSelected : styles.modalButtonText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPickerVisible(false)} style={styles.modalButton}>
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
    color: theme.colors['secondary'],
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
  modalButtonSelected: {
    color: "gray",
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Semibold",
    textAlign: "center",
  },
});