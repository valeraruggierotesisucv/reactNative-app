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

export function ProfileView() {
  const navigation = useNavigation<ProfileStackNavigationProp>();

  const mockEvents = Array.from({ length: 22 }, (_, index) => ({
    id: `event-${index + 1}`,
    imageUrl: `https://picsum.photos/400/400?random=${index + 1}`,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader />
        <ProfileCard
          profileImage={dummyUser.profileImage}
          username={dummyUser.username}
          biography={dummyUser.biography}
          events={dummyUser.events}
          followers={dummyUser.followers}
          following={dummyUser.following}
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
          events={mockEvents}
          onPressEvent={(eventId) => {
            console.log("Pressed event", eventId);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors['white'],
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
    backgroundColor: theme.colors['black'],
    marginBottom: 10,
  },
});
