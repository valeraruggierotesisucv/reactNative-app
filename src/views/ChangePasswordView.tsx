import React from "react";
import { View, ScrollView, StyleSheet, Alert, Image, Text } from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { InputField, InputFieldVariant } from "../components/InputField/InputField";
import { Button, ButtonSize } from "../components/Button/Button";
import { theme } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { Formik } from "formik";
import { Modal } from "../components/Modal/Modal";
import { useState } from "react";
import * as Yup from "yup";


export function ChangePasswordView() {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const { updatePassword } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required(t("changePassword.new_password_required")).min(6, t("changePassword.password_min")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], t("changePassword.passwords_must_match"))
      .required(t("changePassword.confirm_password_required")).min(6, t("changePassword.password_min")),
  });

  const handlePasswordChange = async (values: { newPassword: string }) => {
    try {
      await updatePassword(values.newPassword);
      setModalVisible(true);
    } catch (error) {
      console.error("Error updating password:", error);
      Alert.alert(t("changePassword.error"));
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader
          title={t("changePassword.title")}
          goBack={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <Formik
            initialValues={{ newPassword: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handlePasswordChange}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <InputField
                  label={t("changePassword.new_password").toUpperCase()}
                  value={values.newPassword}
                  onChangeText={handleChange("newPassword")}
                  icon={showPassword ? "eye" : "eye-off"}
                  secureTextEntry={!showPassword}
                  onPressIcon={() => setShowPassword(!showPassword)}
                  variant={InputFieldVariant.GRAY_BACKGROUND}
                  error={touched.newPassword && errors.newPassword ? errors.newPassword : undefined}
                />
                <InputField
                  label={t("changePassword.confirm_password").toUpperCase()}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  icon={showConfirmPassword ? "eye" : "eye-off"}
                  secureTextEntry={!showConfirmPassword}
                  onPressIcon={() => setShowConfirmPassword(!showConfirmPassword)}
                  variant={InputFieldVariant.GRAY_BACKGROUND}
                  error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                />
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                  <Button
                    label={t("common.send")}
                    onPress={handleSubmit}
                    size={ButtonSize.MEDIUM}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Modal 
        visible={isModalVisible} 
        onClose={handleCloseModal}
      >   
        <Image source={require('../../assets/images/Onboarding.png')} style={{ width: 200, height: 200, marginBottom: 16 }} />  
        <Text style={{ 
            fontSize: 18, 
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 8,
        }}>
            {t("editProfile.profile_updated")}
        </Text>
      </Modal>
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
