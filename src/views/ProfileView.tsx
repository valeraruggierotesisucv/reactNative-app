import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { ProfileRoutes } from "../../utils/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileCard } from "../components/ProfileCard/ProfileCard";
import { EventThumbnailList } from "../components/EventThumbnailList/EventThumbnailList";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { user as dummyUser } from "../../utils/dummyData";
import { theme } from "../../utils/theme";
import { Event, ProfileController } from "../controllers/ProfileController";
import { useEffect, useState } from "react";
import UserModel from "../models/UserModel";
import { useAuth } from "../contexts/AuthContext";

export function ProfileView() {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [user, setUser] = useState<UserModel | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const { user: authUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  // ProfileController
  useEffect(() => {
    setIsLoading(true);
    const fetchProfile = async () => {
      const user = await ProfileController.getProfile(
        authUser?.id || ""
      );
      setUser(user);
      const events = await ProfileController.getUserEvents(
        authUser?.id || ""
      );
      setEvents(events);
      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader />
        {isLoading ? <Text style={{flex: 1, justifyContent: "center", alignItems: "center"}}>Loading...</Text> : (
          <>
          <ProfileCard
            profileImage={user?.profileImage || "https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/EventImages/user.jpg"}
            username={user?.username || ""}
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
              eventId: "1",         //cambiar a eventId
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
