import { ScrollView, StyleSheet, View, Text } from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventThumbnailList } from "../components/EventThumbnailList/EventThumbnailList";
import { ProfileCard } from "../components/ProfileCard/ProfileCard";
import { theme } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import { ProfileController } from "../controllers/ProfileController";
import { useEffect, useState } from "react";
import UserModel from "../models/UserModel";
import { Event } from "../controllers/ProfileController";
import { useAuth } from "../contexts/AuthContext";
import { HomeStackParamList } from "../../utils/types";
import { HomeStackNavigationProp } from "../navigators/HomeStack";
import { HomeRoutes } from "../../utils/routes";
import { FollowUserController } from "../controllers/FollowUserController";
import React from "react";
import { NotificationsController } from "../controllers/NotificationsController";
import { NotificationType } from "../components/NotificationItem/NotificationItem";

export function ProfileDetailsView() {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeStackNavigationProp>();
  const route = useRoute<RouteProp<HomeStackParamList, HomeRoutes.ProfileDetails>>();
  const {userId} = route.params;
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const {user: authUser, session} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowingLoading, setIsFollowingLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchProfile = async () => {
      
      const user = await ProfileController.getProfile(
        userId
      );
      
      setUser(user) ;
      const events = await ProfileController.getUserEvents(userId);      
      const followResponse = await FollowUserController.isFollowing( authUser!.id, userId);

      setIsFollowing(followResponse.isFollowing);
      setEvents(events);
      setIsLoading(false);
    };

    fetchProfile();
  }, []);


  const handleFollow = async () => {
    setIsFollowingLoading(true);
    try{
      const response = await FollowUserController.followUser(authUser!.id, userId);
      if(response.success){
        setIsFollowing(true);
      }

      // Send notification      
      const notificationData = {
        fromUserId: authUser?.id, 
        toUserId: userId, 
        type:  NotificationType.FOLLOW, 
        message: t("notifications.FOLLOW")
      }

      if(session){
        const notificationResult = await NotificationsController.createNotification(session?.access_token, notificationData); 
        console.log("Notificación enviada: " , notificationResult);
      }       

    }catch(error){
      console.log("Error al seguir al usuario", error);
    }finally{
      setIsFollowingLoading(false);
    }
  }

  const handleUnfollow = async () => {
    setIsFollowingLoading(true);
    try{
      const response = await FollowUserController.unfollowUser(authUser!.id, userId);
      if(response.success){
        setIsFollowing(false);
      }
    }catch(error){
      console.log("Error al dejar de seguir al usuario", error);
    }finally{
      setIsFollowingLoading(false);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader title={t("profile.details")} goBack={navigation.goBack} />
        {isLoading ? <Text style={{flex: 1, justifyContent: "center", alignItems: "center"}}>Loading...</Text> : (
        <>
          <ProfileCard
            profileImage={user?.profileImage || ""}
            username={user?.username || "No disponible"}
            biography={user?.biography || "No disponible"}
            events={events.length}
            followers={user?.followersCounter || 0}
            following={user?.followingCounter || 0}
            onFollowers={() => {
              console.log("Followers");
            }}
            onFollowed={() => {
              console.log("Followed");
            }}
            isFollowing={isFollowing}
            disableFollowButton={isFollowingLoading}
            onFollow={() => {
              if(isFollowing){
                handleUnfollow();
              }else{
                handleFollow();
              }
            }}
          />
          <View style={styles.separator} />
          <EventThumbnailList
            events={events}
            onPressEvent={(eventId) => {
              console.log("Pressed event", eventId);
            }}
          />
        </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors["white"],
  },
  scrollViewContent: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: theme.colors["black"],
    marginBottom: 10,
  },
});
