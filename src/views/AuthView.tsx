import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, View, Text, ScrollView } from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconLogo } from "../components/IconLogo/IconLogo";
import { Tabs } from "../components/Tabs/Tabs";
import { InputField } from "../components/InputField/InputField";
import { Button } from "../components/Button/Button";
import { useTranslation } from "../contexts/TranslationContext";
import { Formik } from "formik";
import { AuthRoutes } from "../../utils/routes";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "../navigators/AuthStackNavigator";
import { theme } from "../../utils/theme";

function Login() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { t } = useTranslation();
  const { login } = useAuth();
  const loginInitialValues = { email: "", password: "" };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={loginInitialValues}
      onSubmit={(values) => login(values.email, values.password)}
    >
      {({ handleChange, handleSubmit, values }) => (
        <>
          <View>
            <InputField
              label={t("email")}
              value={values.email}
              onChangeText={handleChange("email")}
              placeholder={t("email_placeholder")}
              icon="email"
              iconColor={theme.colors['primary']}
              style={{ marginTop: 40, marginBottom: 24 }}
            />
            <InputField
              label={t("password")}
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder={t("password_placeholder")}
              secureTextEntry={!showPassword}
              icon={showPassword ? "eye-off" : "eye"}
              iconColor={theme.colors['primary']}
              onPressIcon={() => setShowPassword(!showPassword)}
              style={{ marginBottom: 9 }}
            />
            <Pressable onPress={() => console.log("Forgot Password?")}>
              <Text style={styles.forgotPasswordText}>
                {t("forgotPassword")}
              </Text>
            </Pressable>
          </View>
          <Button
            label={t("login")}
            onPress={handleSubmit}
            style={{ marginBottom: 55 }}
          />
        </>
      )}
    </Formik>
  );
}

const Signup = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { t } = useTranslation();
  const signupInitialValues = {
    username: "",
    fullname: "",
    email: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={signupInitialValues}
      onSubmit={(values) => navigation.navigate(AuthRoutes.ChooseCategories)}
    >
      {({ handleChange, handleSubmit, values }) => (
        <>
          <View>
            <InputField
              label={t("username")}
              value={values.username}
              onChangeText={handleChange("username")}
              placeholder={t("username_placeholder")}
              icon="account"
              iconColor={theme.colors['primary']}
              style={{ marginTop: 40, marginBottom: 24 }}
            />
            <InputField
              label={t("email")}
              value={values.email}
              onChangeText={handleChange("email")}
              placeholder={t("email_placeholder")}
              icon="email"
              iconColor={theme.colors['primary']}
              style={{ marginBottom: 24 }}
            />
            <InputField
              label={t("fullname")}
              value={values.fullname}
              onChangeText={handleChange("fullname")}
              placeholder={t("fullname_placeholder")}
              icon="account"
              iconColor={theme.colors['primary']}
              style={{ marginBottom: 24 }}
            />
            <InputField
              label={t("birthdate")}
              value={values.birthdate}
              onChangeText={handleChange("birthdate")}
              placeholder={t("birthdate_placeholder")}
              icon="calendar"
              iconColor={theme.colors['primary']}
              style={{ marginBottom: 24 }}
            />
            <InputField
              label={t("password")}
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder={t("password_placeholder")}
              icon="lock"
              iconColor={theme.colors['primary']}
              style={{ marginBottom: 24 }}
            />
            <InputField
              label={t("confirm_password")}
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              placeholder={t("confirm_password_placeholder")}
              icon="lock"
              iconColor={theme.colors['primary']}
              style={{ marginBottom: 24 }}
            />
          </View>
          <Button
            label={t("sign_up")}
            onPress={handleSubmit}
            style={{ marginTop: 50, marginBottom: 55 }}
          />
        </>
      )}
    </Formik>
  );
};

export function AuthView() {
  const { t } = useTranslation();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const insets = useSafeAreaInsets();

  const tabs = [
    { id: "login", label: t("login") },
    { id: "signup", label: t("sign_up") },
  ];
  const [activeTab, setActiveTab] = useState({
    id: "login",
    label: t("login"),
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.iconLogoContainer, { paddingTop: insets.top }]}>
          <IconLogo style={styles.iconLogo} />
          <Tabs tabs={tabs} gap={50} onTabChange={(tab) => setActiveTab(tab)} />
        </View>
        <View style={styles.formContainer}>
          {activeTab.id === "login" ? <Login /> : <Signup />}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors['lightGray'],
  },
  iconLogoContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconLogo: {
    marginTop: 37,
    marginBottom: 30,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotPasswordText: {
    textAlign: "center",
    color: theme.colors['primary'],
    fontSize: 15,
    fontFamily: "SF-Pro-Text-Semibold",
    marginTop: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
