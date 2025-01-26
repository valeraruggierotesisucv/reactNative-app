import React, { useState } from "react";
import { Pressable, StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconLogo } from "../components/IconLogo/IconLogo";
import { Tabs } from "../components/Tabs/Tabs";
import { InputField } from "../components/InputField/InputField";
import { Button } from "../components/Button/Button";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { AuthRoutes } from "../../utils/routes";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "../navigators/AuthStackNavigator";
import { theme } from "../../utils/theme";
import { DateTimePickerField } from "../components/DateTimePickerField/DateTimePickerField";
import { SignUpController } from "../controllers/SignUpController";
import * as Yup from "yup";

function Login() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { t } = useTranslation();
  const { login } = useAuth();
  const loginInitialValues = { email: "", password: "" };
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email(t("login.email_invalid")).required(t("login.email_required")),
    password: Yup.string().min(6, t("login.password_min")).required(t("login.password_required")),
  }); 

  return (
    <Formik
      initialValues={loginInitialValues}
      validationSchema={loginSchema}
      onSubmit={(values) => login(values.email, values.password)}
    >
      {({ handleChange, handleSubmit, values, errors, touched, isValid, isSubmitting }) => (
        <>
          <View>
            <InputField
              label={t("auth.email")}
              value={values.email}
              onChangeText={handleChange("email")}
              placeholder={t("auth.email_placeholder")}
              icon="email"
              iconColor={theme.colors['primary']}
              style={{ marginTop: 40, marginBottom: 24 }}
              error={touched.email && errors.email ? errors.email : undefined}
            />
            <InputField
              label={t("auth.password")}
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder={t("auth.password_placeholder")}
              secureTextEntry={!showPassword}
              icon={showPassword ? "eye" : "eye-off"}
              iconColor={theme.colors['primary']}
              onPressIcon={() => setShowPassword(!showPassword)}
              style={{ marginBottom: 9 }}
              error={touched.password && errors.password ? errors.password : undefined}
            />
            <Pressable onPress={() => navigation.navigate(AuthRoutes.ForgotPassword)}>
              <Text style={styles.forgotPasswordText}>
                {t("auth.forgot_password")}
              </Text>
            </Pressable>
          </View>
          <Button
            label={isSubmitting ? t("common.loading") : t("auth.login")}
            onPress={handleSubmit}
            style={{ marginBottom: 55 }}
            disabled={!isValid || isSubmitting}
          />
        </>
      )}
    </Formik>
  );
}

const Signup = () => {
  const { t } = useTranslation();
  const oldEnough = new Date(new Date().getFullYear() - 18, 0, 0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuth();
  interface SignupValues {
    username: string;
    fullname: string;
    email: string;
    birthdate: Date;
    password: string;
    confirmPassword: string;
  }

  const signupInitialValues: SignupValues = {
    username: "",
    fullname: "",
    email: "",
    birthdate: oldEnough,
    password: "",
    confirmPassword: "",
  };

  const handleSignup = async (values: SignupValues) => {
    try {
      const signedUp = await signup(values.email, values.password, values.fullname, values.username)
      
      if (!signedUp) {
        Alert.alert("Error signing up", "User not signed up")
        return
      }

      await SignUpController.signUp({
        userId: signedUp.id,
        email: values.email,
        fullName: values.fullname,
        username: values.username,
        birthDate: values.birthdate
      })      
      
    } catch (error) {
      console.error("Error signing up:", error);
      Alert.alert("Error signing up", error as string)
    }
  }

  const signupSchema = Yup.object().shape({
    username: Yup.string().required(t("signup.username_required")),
    fullname: Yup.string().required(t("signup.fullname_required")),
    email: Yup.string().email(t("signup.email_invalid")).required(t("signup.email_required")),
    birthdate: Yup.date().max(new Date(), t("signup.birthdate_past")).required(t("signup.birthdate_required")),
    password: Yup.string().min(6, t("signup.password_min")).required(t("signup.password_required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], t("signup.passwords_match"))
      .required(t("signup.confirm_password_required")),
  });

  return (
    <Formik
      initialValues={signupInitialValues}
      validationSchema={signupSchema}
      onSubmit={handleSignup}
    >
      {({ handleChange, handleSubmit, values, setFieldValue, errors, touched, isValid, isSubmitting }) => (
        <>
          <View>
            <InputField
              label={t("auth.username")}
              value={values.username}
              onChangeText={handleChange("username")}
              placeholder={t("auth.username_placeholder")}
              icon="account"
              iconColor={theme.colors['primary']}
              style={{ marginTop: 40, marginBottom: 24 }}
              error={touched.username && errors.username ? errors.username : undefined}
            />
            <InputField
              label={t("auth.email")}
              value={values.email}
              onChangeText={handleChange("email")}
              placeholder={t("auth.email_placeholder")}
              icon="email"
              iconColor={theme.colors['primary']}
              style={{ marginBottom: 24 }}
              error={touched.email && errors.email ? errors.email : undefined}
            />
            <InputField
              label={t("auth.fullname")}
              value={values.fullname}
              onChangeText={handleChange("fullname")}
              placeholder={t("auth.fullname_placeholder")}
              icon="account"
              iconColor={theme.colors['primary']}
              style={{ marginBottom: 24 }}
              error={touched.fullname && errors.fullname ? errors.fullname : undefined}
            />
            <DateTimePickerField
              label={t("auth.birthdate")}
              value={values.birthdate}
              onChange={(date) => setFieldValue("birthdate", date)}
              placeholder={t("auth.birthdate_placeholder")}
              icon="calendar"
              iconColor={theme.colors['primary']}
              style={{ marginBottom: 24 }}
              error={touched.birthdate && typeof errors.birthdate === 'string' ? errors.birthdate : undefined}
            />
            <InputField
              label={t("auth.password")}
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder={t("auth.password_placeholder")}
              icon={showPassword ? "eye" : "eye-off"}
              iconColor={theme.colors['primary']}
              secureTextEntry={!showPassword}
              onPressIcon={() => setShowPassword(!showPassword)}
              style={{ marginBottom: 24 }}
              error={touched.password && errors.password ? errors.password : undefined}
            />
            <InputField
              label={t("auth.confirm_password")}
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              placeholder={t("auth.confirm_password_placeholder")}
              icon={showConfirmPassword ? "eye" : "eye-off"}
              iconColor={theme.colors['primary']}
              secureTextEntry={!showConfirmPassword}
              onPressIcon={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ marginBottom: 55 }}
              error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
            />
          </View>
          <Button
            label={isSubmitting ? t("common.loading") : t("auth.sign_up")}
            onPress={handleSubmit}
            style={{ marginBottom: 55 }}
            disabled={!isValid || isSubmitting}
          />
        </>
      )}
    </Formik>
  );
};

export function AuthView() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const tabs = [
    { id: "login", label: t("auth.login") },
    { id: "signup", label: t("auth.sign_up") },
  ];
  const [activeTab, setActiveTab] = useState({
    id: "login",
    label: t("auth.login"),
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
