import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, FlatList, View} from "react-native";
import { HomeStackNavigationProp } from "../navigators/HomeStack";
import { HomeRoutes } from "../../utils/routes";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { EventCard } from "../components/EventCard/EventCard";
import { events } from "../../utils/dummyData";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getServer } from "../../utils/getServer";
import { theme } from "../../utils/theme";

export function HomeView() {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const { user, session } = useAuth(); 
    
  // Solo para testing 
  useEffect(() => {
      const server = getServer();    
      const token = session?.access_token; 

      fetch(`http://${server}:5000/api/protected`, {
          headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}` 
          }
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          
          return response.json();
      })
      .then((data) => {
          console.log(data); 
      })
      .catch((error) => {
          console.error("Fetch error:", error);        
      });
  }, [])
  
  return ( 
    <SafeAreaView style={styles.container}>   
      <View style={styles.view}>
        <AppHeader />
          <FlatList
            data={events}
            renderItem={({ item }) => {
              return(
                <EventCard 
                  profileImage={item.profileImage}
                  username={item.username}                
                  eventImage={item.eventImage}
                  title={item.title}
                  description={item.description}
                  isLiked={item.isLiked}
                  date={item.date}
                  onPressUser={() => navigation.navigate(HomeRoutes.ProfileDetails, {userId : item.userId})}
                  onComment={() => console.log("COMMENT")}
                  onShare={() => console.log("SHARE")}
                  onMoreDetails={() => navigation.navigate(HomeRoutes.EventDetails, { eventId: item.eventId})}
                />
              )
            }}
            contentContainerStyle={{ paddingBottom: 70 }}
          />
        </View>   
    </SafeAreaView>  

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors['white'],
  },
  view: {
    flexGrow: 1,
    width: "100%",
    paddingTop: 20,              // check padding 
  },   
});