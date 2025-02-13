import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useNavigation, useRoute, NavigationProp } from "@react-navigation/native";
import { EventCard, EventCardVariant } from "../components/EventCard/EventCard";
import { IMAGE_PLACEHOLDER } from "../../utils/consts";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList, ProfileStackParamList } from "../../utils/types";
import { HomeRoutes, ProfileRoutes } from "../../utils/routes";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button/Button";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { EventDetailsController } from "../controllers/EventDetailsController";
import { EventModel } from "../models/EventModel";
import { Loading } from "../components/Loading/Loading";
import { CommentEventController } from "../controllers/CommentEventController";
import { ProfileController } from "../controllers/ProfileController";
import { LikeEventController } from "../controllers/LikeEventController";
import { ShareEventController } from "../controllers/ShareEventController";
import { NotificationType } from "../components/NotificationItem/NotificationItem";
import { NotificationsController } from "../controllers/NotificationsController";
import React from "react";

type EventDetailsRouteProp =
  | RouteProp<ProfileStackParamList, ProfileRoutes.EventDetails>
  | RouteProp<HomeStackParamList, HomeRoutes.EventDetails>;

export function EventDetailsView() {
  const { t } = useTranslation();
  const {session, user } = useAuth(); 
  const [event, setEvent] = useState<EventModel | null >(null); 
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
  const route = useRoute<EventDetailsRouteProp>();
  const canEdit = route.params?.canEdit || false;
  const [isLoading, setIsLoading] = useState(true);
  const [userComment, setUserComment] = useState<{ username: string, profileImage: string }>({ "username": "", "profileImage": IMAGE_PLACEHOLDER });

  const fetchComments = async (eventId: string) => {
    try {
      if (session) {
        const comments = await CommentEventController.getEventComments(session?.access_token, eventId)
        return comments;
      }
    } catch (error) {
      console.error("Error fetching comments for event:", eventId, error);
      Alert.alert("Error", (error as Error).message);
      return [];
    }
  };

  const onComment = async (eventId: string, comment: string, eventImage:string) => {
    if (session && user) {
      try{
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
          const notificationResult = await NotificationsController.createNotification(session?.access_token, notificationData); 
          console.log("Notificación enviada: " , notificationResult);
        } 
      }catch(error){
        console.error("Error in onComment:", error);
        Alert.alert("Error", (error as Error).message);
      }
    }
  }

  useEffect(() => {
    async function fetchEventDetails() {
      if (session && user) {
        setIsLoading(true);
        try {
          const result = await EventDetailsController.getEventDetails(session.access_token, route.params?.eventId, user.id);
          setEvent(result);
        } catch (error) {
          console.error("Error fetching event details:", error);
          Alert.alert("Error", (error as Error).message);
        } finally {
          setIsLoading(false);
        }
      }
    }

    async function fetchProfile() {
      if (!session) return
      try{
        const profile = await ProfileController.getProfile(session?.access_token, user?.id || "");
        setUserComment({
          "username": profile.username,
          "profileImage": profile.profileImage || IMAGE_PLACEHOLDER
        })
      }catch(error){
        console.error("Error fetching profile:", error);
        Alert.alert("Error", (error as Error).message);
      }
    }

    fetchEventDetails()
    fetchProfile()
  }, [])

  const handleLike = async (eventId: string, eventImage: string, toUserId: string, isLiked: boolean) => {
    if (session && user) {
      try {
        setEvent(prevEvent => prevEvent ? { ...prevEvent, isLiked: !prevEvent.isLiked } : prevEvent);
        const result = await LikeEventController.likeEvent(session.access_token, eventId, user.id);        

        // Send notification      
        const notificationData = {
          fromUserId: user.id, 
          toUserId: toUserId,  
          type:  NotificationType.LIKE_EVENT, 
          message: t("notifications.LIKE"), 
          eventImage: eventImage
        }
  
        if(session && !isLiked){
          const notificationResult = await NotificationsController.createNotification(session?.access_token, notificationData); 
          console.log("Notificación enviada: " , notificationResult);
        } 
        if(result.isActive){
          setEvent(prevEvent => prevEvent ? { ...prevEvent, isLiked: result.isActive } : prevEvent);
        }
        
      } catch (error) {
        console.error("Error handling like:", error);
        Alert.alert("Error", (error as Error).message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader title={t("eventDetails.title")} goBack={navigation.goBack} />
        { isLoading
          ? <Loading/>
          : ( <>
              <EventCard
                eventId={event?.eventId || t("common.not_available")}
                profileImage={event?.profileImage || IMAGE_PLACEHOLDER}
                username={event?.username || t("common.not_available")}
                eventImage={event?.eventImage || IMAGE_PLACEHOLDER}
                title={event?.title || t("common.not_available")}
                description={event?.description || t("common.not_available")}
                isLiked={event?.isLiked || false}
                handleLike={() => handleLike(event?.eventId || "", event?.eventImage || IMAGE_PLACEHOLDER, event?.userId || "", event?.isLiked || false)}
                date={event?.date || t("common.not_available")}
                variant={EventCardVariant.DETAILS}
                latitude={event?.latitude}
                longitude={event?.longitude}
                startsAt={event?.startsAt}
                endsAt={event?.endsAt}
                category={event?.category}
                onPressUser={() => console.log("USER")}
                onComment={onComment}
                userComment={userComment}
                onShare={() => ShareEventController.shareEvent(t('common.share_message', { eventName: event?.title, eventDate: event?.date }))}
                fetchComments={() => fetchComments(event?.eventId || "")}
                musicUrl={event?.musicUrl}
              />
                {canEdit && (
                  <View style={styles.editButtonContainer}>
                    <Button
                      label={t("eventDetails.edit")}
                      onPress={() =>
                        navigation.navigate(ProfileRoutes.EditEvent, {
                          eventId: event?.eventId || "",
                        })
                      }
                    />
                  </View>
                )}
            </>)
        }        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  editButtonContainer: {
    paddingVertical: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
