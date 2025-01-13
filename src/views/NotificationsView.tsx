import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { notifications } from "../../utils/dummyData";
import { NotificationItem } from "../components/NotificationItem/NotificationItem";
import { theme } from "../../utils/theme";
import { useTranslation } from "react-i18next";

export function NotificationsView() {
    const { t } = useTranslation();
    return(
      <SafeAreaView style={styles.container}>   
        <View style={styles.view}>
          <AppHeader title={t("notifications.title")} />
          <FlatList
            data={notifications}
            renderItem={({ item }) => {
              return(
                <NotificationItem
                  user={item.user}
                  timestamp={item.timestamp}
                  userAvatar={item.userAvatar}
                  type={item.type}
                  eventImage={item.eventImage}
                  onFollow={() => console.log("FOLLOW")}
                />
              )
            }}
            contentContainerStyle={{ paddingBottom: 70 }}
          />
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