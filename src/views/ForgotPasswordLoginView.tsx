import { StyleSheet, Text, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { AuthRoutes } from "../../utils/routes";
import { Button } from "../components/Button/Button";
import { AuthStackNavigationProp } from "../navigators/AuthStackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { theme } from "../../utils/theme";

export function ForgotPasswordLoginView() {
    const navigation = useNavigation<AuthStackNavigationProp>();
    const { t } = useTranslation();
    
    return(
        <SafeAreaView style={styles.container}>            
            <AppHeader/>
            
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 150}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{t("auth.send_link_success")}</Text>                    
                </View>
                <View style={{ alignItems: "center"}}>
                    <Image source={require("../../assets/images/SuccessEmail.png")} style={styles.image} />
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{t("auth.success_email_text")}</Text>                    
                </View> 
            </View>
                     
            
            <View style={styles.footer}>
                <Button 
                    label={t("auth.login")}
                    onPress={() => navigation.navigate(AuthRoutes.Auth)}
                />
            </View>            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: theme.colors['white'],
    alignItems: "center",
  },

  titleContainer: {
    justifyContent: "center", alignItems: "center", paddingTop: 20
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
    padding: 20, 
    justifyContent: "center", 
    alignItems: "center"    
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