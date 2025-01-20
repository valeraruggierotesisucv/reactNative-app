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
import { FollowUserController } from "../controllers/FollowUserController";

export function FollowedView() {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [search, setSearch] = useState("");
  const [followed, setFollowed] = useState<{ followedId: string, followedName: string, followedProfileImage: string, followed: boolean }[] | null>(null);
  const { user } = useAuth();

  const getFollowed = async () => {
    try {
      const response: { followedId: string, followedName: string, followedProfileImage: string, followed: boolean }[] = await ListUsersController.getFollowed(user!.id);
      setFollowed(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFollowed();
  }, []);

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  const handleUnfollow = async (userId: string) => {
    const response = await FollowUserController.unfollowUser(user!.id, userId);
    if(response.success){
      getFollowed();
    }
  };

  const filteredFollowed = followed?.filter((follow) => {
    console.log(follow)
    return follow.followedName.toLowerCase().includes(search.toLowerCase())
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader title={t("profile.followed")} goBack={navigation.goBack} />
        <SearchBar
          onChangeText={handleSearchChange}
          value={search}
        />
        {filteredFollowed?.map((followed) => (
          <UserCard
            key={followed.followedId}
            profileImage={followed.followedProfileImage}
            username={followed.followedName}
            onPressButton={() => {handleUnfollow(followed.followedId)}}
            variant={UserCardVariant.WITH_BUTTON}
            actionLabel={followed.followed ? t("common.unfollow") : t("common.follow")}
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
