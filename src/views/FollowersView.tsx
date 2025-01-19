import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet } from "react-native";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCard, UserCardVariant } from "../components/UserCard/UserCard";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListUsersController } from "../controllers/ListUsersController";
import { useAuth } from "../contexts/AuthContext";

export function FollowersView() {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const [followers, setFollowers] = useState<{ followerId: string, followerName: string, followerProfileImage: string, followed: boolean }[] | null>(null);


  const getFollowers = async () => {
    try {
      const response = await ListUsersController.getFollowers(user!.id);
      setFollowers(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFollowers();
  }, []);

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  const filteredFollowers = followers?.filter((follower) =>
    follower.followerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader title={t("profile.followers")} goBack={navigation.goBack} />
        <SearchBar
          onChangeText={handleSearchChange}
          value={search}
        />
        {filteredFollowers?.map((follower) => (
          <UserCard
            key={follower.followerId}
            profileImage={follower.followerProfileImage}
            username={follower.followerName}
            onPressButton={() => {}}
            variant={UserCardVariant.WITH_BUTTON}
            actionLabel={follower.followed ? "Dejar de seguir" : "Seguir"}
          />
        ))}
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
    paddingHorizontal: 16,
  },
});
