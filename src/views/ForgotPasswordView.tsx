import { StyleSheet, Text, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { AuthRoutes } from "../../utils/routes";
import { Button } from "../components/Button/Button";
import { AuthStackNavigationProp } from "../navigators/AuthStackNavigator";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { theme } from "../../utils/theme";
import { InputField } from "../components/InputField/InputField";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function ForgotPasswordView() {
    const navigation = useNavigation<AuthStackNavigationProp>();
    const { resetPassword } = useAuth(); 
    const [email, setEmail] = useState(""); 
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();
    
    // ForgotPassword
    function handleSendEmail(){
      resetPassword(email); 
      navigation.navigate(AuthRoutes.ForgotPasswordLogin)
    }
    
    return(
        <SafeAreaView style={styles.container}>            
            <View style={styles.card}>
                <AppHeader goBack={() => navigation.goBack()}/>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{t("auth.forgotPassword")}</Text>                    
                </View>
                <View style={{ alignItems: "center"}}>
                    <Image source={require("../../assets/images/ForgotPassword.png")} style={styles.image} />
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{t("auth.forgot_password_text")}</Text>                    
                </View>
            </View>
            <View style={styles.email}>
                <InputField
                    label={t("auth.email")}
                    value={email}
                    onChangeText={setEmail}
                    placeholder={t("auth.email_placeholder")}
                    icon="email"
                    iconColor={theme.colors['primary']}
                    style={{ marginBottom: 24 }}
                />
            </View>
            
            <View style={styles.footer}>
                <Button 
                    label={t("common.send")}
                    onPress={handleSendEmail}
                />
            </View>
            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: theme.colors["gray"],
    alignItems: "center",
  },
  card:{
    backgroundColor: theme.colors['white'], 
    width: "100%", 
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: "auto"
  }, 
  titleContainer: {
    justifyContent: "center", 
    alignItems: "center", 
    paddingTop: 20
  }, 
  title: {
    fontFamily: "SF-Pro-Text-Semibold", 
    fontSize: 20,
    justifyContent: "center"
  }, 
  footer:{
    flex: 1, 
    justifyContent: "flex-end", 
    paddingBottom: 30
  }, 
  description: {
    fontFamily: "SF-Pro-Text-Regular", 
    fontSize: 14,
  }, 
  descriptionContainer: {
    padding: 10, 
    justifyContent: "center", 
    alignItems: "center", 
    
  }, 
  image: {
    height: 320,
    width: 320
  }, 
  email:{
    padding: 15, 
    paddingTop: 30
  }
  
});