import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StyleSheet, FlatList, View, Text, ActivityIndicator, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeStackNavigationProp } from "../navigators/HomeStack";
import { HomeRoutes } from "../../utils/routes";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { EventCard } from "../components/EventCard/EventCard";
import { useCallback, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { theme } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import { ListEventsController } from "../controllers/ListEventsController";
import { Loading } from "../components/Loading/Loading";
import { CommentEventController } from "../controllers/CommentEventController";
import { ProfileController } from "../controllers/ProfileController";
import { IMAGE_PLACEHOLDER } from "../../utils/consts";
import { LikeEventController } from "../controllers/LikeEventController";
import { ShareEventController } from "../controllers/ShareEventController";
import { NotificationType } from "../components/NotificationItem/NotificationItem";
import { NotificationsController } from "../controllers/NotificationsController";

export function HomeView() {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const { user, session } = useAuth();
  const { t } = useTranslation();
  const [events, setEvents] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [ userComment, setUserComment] = useState<{username: string, profileImage:string}>({ "username": "", "profileImage": IMAGE_PLACEHOLDER}); 
  

  const fetchComments = async (eventId: string) => {
    if(session){
    try {
        return await CommentEventController.getEventComments(session?.access_token, eventId)
      } catch (error) {
        console.error("Error fetching comments for event:", eventId, error);
        Alert.alert("Error", (error as Error).message);
        return []; 
      }
    }      
  };

  const onComment = async (eventId: string, comment: string, eventImage:string) => {
    if(session && user){
      try {
        await CommentEventController.createComment(session?.access_token, eventId, {
          userId: user?.id, 
          text: comment
        })

        const toUserId = await ProfileController.getUserId(session.access_token, eventId); 

        // Send notification      
        const notificationData = {
          fromUserId: user.id, 
          toUserId: toUserId.data,  
          type:  NotificationType.COMMENT_EVENT, 
          message: t("notifications.COMMENT"), 
          eventImage: eventImage
        }
  
        if(session){
          await NotificationsController.createNotification(session?.access_token, notificationData); 
        } 

      } catch (error) {
        console.error("Error adding comment", error);
        Alert.alert("Error", (error as Error).message);
      }
    }    
  }

  const handleLike = async (eventId: string, eventImage:string, toUserId:string, isLike: boolean ) => {
    if (session && user) {
      try {
        setEvents(currentEvents => {
          const newEvents = currentEvents.map(event => 
            event.eventId === eventId 
              ? { ...event, isLiked: !event.isLiked }
              : event
          );
          
          return newEvents;
        });
        const result = await LikeEventController.likeEvent(session.access_token, eventId, user.id);     

        // Send notification      
        const notificationData = {
          fromUserId: user.id, 
          toUserId: toUserId,  
          type:  NotificationType.LIKE_EVENT, 
          message: t("notifications.LIKE"), 
          eventImage: eventImage
        }
  
        if(session && !isLike){
          await NotificationsController.createNotification(session?.access_token, notificationData); 
        } 
        
        if(result.isActive){
          setEvents(currentEvents => {
            const newEvents = currentEvents.map(event => 
              event.eventId === eventId 
                ? { ...event, isLiked: result.isActive }
                : event
            );
            return newEvents;
          });
        }
        
      } catch (error) {
        console.error("Error handling like:", error);
        Alert.alert("Error", (error as Error).message);
      }
    }
  };
  

  useFocusEffect(
    useCallback(() => {
      async function fetchEvents (){
        setIsLoading(true); 
        if(session && user){
          try {
            const result = await ListEventsController.getHomeEvents(session.access_token, user.id)
            setEvents(result); 
            setIsLoading(false)
          } catch (error) {
            console.error("Error fetching events", error);
            Alert.alert("Error", (error as Error).message);
            setIsLoading(false)
          }
        }            
      }    
      async function fetchProfile(){
        if (!session) return
        const profile = await ProfileController.getProfile(session?.access_token, user?.id || "");
        setUserComment({
          "username": profile.username, 
          "profileImage": profile.profileImage || IMAGE_PLACEHOLDER
        })
      }

      fetchEvents()
      fetchProfile()
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
                    eventId={item.eventId}
                    profileImage={item.profileImage}
                    username={item.username}
                    eventImage={item.eventImage}
                    title={item.title}
                    description={item.description}
                    isLiked={item.isLiked}
                    handleLike={() => handleLike(item.eventId, item.eventImage, item.userId, item.isLiked)}
                    date={item.date}
                    onPressUser={() =>{
                      navigation.navigate(HomeRoutes.ProfileDetails, {
                        userId: item.userId,
                      })
                    }}
                    onComment={onComment}
                    userComment={userComment}
                    fetchComments={() => fetchComments(item.eventId)}
                    onShare={() => 
                      ShareEventController.shareEvent(t('common.share_message', { eventName: item.title, eventDate: item.date }))
                    }
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
