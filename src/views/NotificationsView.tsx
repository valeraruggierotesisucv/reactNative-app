import { View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { notifications } from "../../utils/dummyData";
import { NotificationItem } from "../components/NotificationItem/NotificationItem";

export function NotificationsView() {
    return(
        <SafeAreaView style={styles.container}>   
      <View style={styles.view}>
        <AppHeader />
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
      backgroundColor: "#FFFFFF",
    },
    view: {
      flexGrow: 1,
      width: "100%",
      paddingTop: 20,              // check padding 
    },   
  });