import { View, FlatList, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { NotificationItem } from "../components/NotificationItem/NotificationItem";
import { theme } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { NotificationsController } from "../controllers/NotificationsController";
import { useAuth } from "../contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "../components/Loading/Loading";

export function NotificationsView() {
    const { t } = useTranslation();
    const { session, user } = useAuth(); 
    const [ notifications, setNotifications] = useState(); 
    const [isLoading, setIsLoading] = useState(true);


    useFocusEffect(
      useCallback(() => {
        async function fetchNotifications (){
          if(session && user){
            try{
              setIsLoading(true); 
              const result = await NotificationsController.getNotifications(session?.access_token, user?.id); 
              setNotifications(result); 
              setIsLoading(false); 
            }catch(error){
              console.error("Error in fetchNotifications:", error);
              Alert.alert("Error", (error as Error).message);
            }
          }          
        }
  
        fetchNotifications()
        return () => {
        };
      }, [])
    );

    return(
      <SafeAreaView style={styles.container}>   
        <View style={styles.view}>
          <AppHeader title={t("notifications.title")} />
          { isLoading
            ? <Loading/>
            : <FlatList
                data={notifications}
                renderItem={({ item }) => {
                  return(
                    <NotificationItem
                      user={item.user}
                      timestamp={item.timestamp}
                      userAvatar={item.userAvatar}
                      type={item.type}
                      eventImage={item.eventImage ?? "https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultImage.jpg"}
                    />
                  )
                }}
                contentContainerStyle={{ paddingBottom: 70 }}
              />
          }
        </View>   
      </SafeAreaView> 
    )
}   

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors['white'],
    },
    view: {
      flex: 1,
      width: "100%",
      },   
  });