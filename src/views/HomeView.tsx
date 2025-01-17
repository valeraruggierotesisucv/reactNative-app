import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StyleSheet, FlatList, View, Text, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeStackNavigationProp } from "../navigators/HomeStack";
import { HomeRoutes } from "../../utils/routes";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { EventCard } from "../components/EventCard/EventCard";
import { events } from "../../utils/dummyData";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { theme } from "../../utils/theme";
import { dummyComments } from "../data/dummyComments";
import { onShare } from "../../utils/share";
import { useTranslation } from "react-i18next";
import { ListEventsController } from "../controllers/ListEventsController";
import { Loading } from "../components/Loading/Loading";


export function HomeView() {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const { user, session } = useAuth();
  const { t } = useTranslation();
  const [events, setEvents] = useState(); 
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function fetchEvents (){
        setIsLoading(true); 
        if(session && user){
          const result = await ListEventsController.getHomeEvents(session.access_token, user.id)
          setEvents(result); 
          setIsLoading(false)
        }            
      }    

      fetchEvents()
      return () => {

      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <AppHeader />
        { isLoading 
          ? <Loading />
          : (
            <FlatList
              data={events}
              renderItem={({ item }) => {
                return (
                  <EventCard
                    profileImage={item.profileImage}
                    username={item.username}
                    eventImage={item.eventImage}
                    title={item.title}
                    description={item.description}
                    isLiked={item.isLiked}
                    date={item.date}
                    onPressUser={() =>
                      navigation.navigate(HomeRoutes.ProfileDetails, {
                        userId: item.userId,
                      })
                    }
                    onComment={() => Promise.resolve()}
                    fetchComments={() => Promise.resolve(dummyComments)}
                    onShare={() => onShare(t('shareMessage', { eventName: item.title, eventDate: item.date }))}
                    onMoreDetails={() =>
                      navigation.navigate(HomeRoutes.EventDetails, {
                        eventId: item.eventId,
                        canEdit: false
                      })
                    }
                  />
                );
              }}
              contentContainerStyle={{ paddingBottom: 70 }}
            />
        )}
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors["white"],
  },
  view: {
    flex: 1,
    width: "100%",
  },   
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.black,
  },
});
