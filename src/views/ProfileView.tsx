import { View, StyleSheet, ScrollView } from "react-native";
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

export function ProfileView() {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [user, setUser] = useState<UserModel | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  // ProfileController
  useEffect(() => {
    const fetchProfile = async () => {
      const user = await ProfileController.getProfile(
        "cm5ylssnm0000ty7wb1c36urk"
      );
      console.log(user);
      setUser(user);
      const events = await ProfileController.getUserEvents(
        "cm5ylssnm0000ty7wb1c36urk"
      );
      setEvents(events);
      console.log(events);
    };

    fetchProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ProfileCard
          profileImage={user?.profileImage || ""}
          username={user?.username || ""}
          biography={user?.biography || ""}
          events={0}
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
              eventId: "1",
              canEdit: true,
            });
          }}
        />
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
