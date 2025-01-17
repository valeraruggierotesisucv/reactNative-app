import { ScrollView, StyleSheet, View, Text } from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
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
import { useAuth } from "../contexts/AuthContext";
import { HomeStackParamList } from "../../utils/types";
import { HomeStackNavigationProp } from "../navigators/HomeStack";
import { HomeRoutes } from "../../utils/routes";

export function ProfileDetailsView() {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeStackNavigationProp>();
  const route = useRoute<RouteProp<HomeStackParamList, HomeRoutes.ProfileDetails>>();
  const {userId} = route.params;
  const [user, setUser] = useState<UserModel | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchProfile = async () => {
      const user = await ProfileController.getProfile(
        userId
      );
      setUser(user);
      const events = await ProfileController.getUserEvents(userId);
      setEvents(events);
      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  // FollowUserController
  // TODO: En la tarjeta de perfil, agregar variacion con el boton de seguir | dejar de seguir

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
