import { ScrollView, StyleSheet, View } from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventThumbnailList } from "../components/EventThumbnailList/EventThumbnailList";
import { ProfileRoutes } from "../../utils/routes";
import { ProfileCard } from "../components/ProfileCard/ProfileCard";
import { theme } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import { ProfileController } from "../controllers/ProfileController";
import { useEffect, useState } from "react";
import UserModel from "../models/UserModel";
import { Event } from "../controllers/ProfileController";

export function ProfileDetailsView() {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [user, setUser] = useState<UserModel | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await ProfileController.getProfile(
        "cm5ylssnm0000ty7wb1c36urk"
      );
      setUser(user);
      const events = await ProfileController.getUserEvents("1");
      setEvents(events);
    };

    fetchProfile();
  }, []);

  // FollowUserController
  // TODO: En la tarjeta de perfil, agregar variacion con el boton de seguir | dejar de seguir

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader title={t("profile.details")} goBack={navigation.goBack} />
        <ProfileCard
          profileImage={user?.profileImage || ""}
          username={user?.username || "No disponible"}
          biography={user?.biography || "No disponible"}
          events={user?.eventsCounter || 0}
          followers={user?.followersCounter || 0}
          following={user?.followingCounter || 0}
          onFollowers={() => {
            navigation.navigate(ProfileRoutes.Followers);
          }}
          onFollowed={() => {
            navigation.navigate(ProfileRoutes.Followed);
          }}
        />
        <View style={styles.separator} />
        {/* <EventThumbnailList
          events={events.map((event) => ({
            id: event.id,
            imageUrl: event.imageUrl,
          }))}
          onPressEvent={(eventId) => {
            console.log("Pressed event", eventId);
          }}
        /> */}
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
