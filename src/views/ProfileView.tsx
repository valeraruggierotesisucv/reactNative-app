import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { ProfileRoutes } from "../../utils/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileCard } from "../components/ProfileCard/ProfileCard";
import { EventThumbnailList } from "../components/EventThumbnailList/EventThumbnailList";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { theme } from "../../utils/theme";
import { Event, ProfileController } from "../controllers/ProfileController";
import { useCallback, useState } from "react";
import UserModel from "../models/UserModel";
import { useAuth } from "../contexts/AuthContext";
import React from "react";
import { Loading } from "../components/Loading/Loading";

export function ProfileView() {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [user, setUser] = useState<UserModel | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const { user: authUser, session } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!session) return
      
      setIsLoading(true);
      const fetchProfile = async () => {
        try{
          const user = await ProfileController.getProfile(
            session?.access_token, 
            authUser?.id || ""
          );
          setUser(user);
          const events = await ProfileController.getUserEvents(
            session?.access_token, 
            authUser?.id || ""
          );
          setEvents(events);
          setIsLoading(false);
        }catch(error){
          console.error("Error in fetchProfile:", error);
          Alert.alert("Error", (error as Error).message);
        }
      };
    
    fetchProfile();

    return () => {
      setIsLoading(false);
      setUser(null);
      setEvents([]);
    }
  }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {isLoading 
          ? <Loading /> : (
          <>
          <ProfileCard
            profileImage={user?.profileImage || undefined}
            username={user?.fullName || ""}
            biography={user?.biography || ""}
            events={events.length}
            followers={user?.followersCounter || 0}
            following={user?.followingCounter || 0}
            onFollowers={() => {
              navigation.navigate(ProfileRoutes.Followers);
            }}
            onFollowed={() => {
              navigation.navigate(ProfileRoutes.Followed);
            }}
            onConfigureProfile={() => {
              navigation.navigate(ProfileRoutes.Configuration);
            }}
            onEditProfile={() => {
              navigation.navigate(ProfileRoutes.EditProfile);
            }}
        />
        <View style={styles.separator} />
        <EventThumbnailList
          events={events}
          onPressEvent={(eventId) => {
            navigation.navigate(ProfileRoutes.EventDetails, {
              eventId: eventId,
              canEdit: true,
            });
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

