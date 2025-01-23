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
import { NotificationType } from "../components/NotificationItem/NotificationItem";
import { NotificationsController } from "../controllers/NotificationsController";

export function FollowersView() {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [search, setSearch] = useState("");
  const { user, session } = useAuth();
  const [followers, setFollowers] = useState<{ followerId: string, followerName: string, followerProfileImage: string, followed: boolean, isFollowingLoading: boolean }[] | null>(null);


  const getFollowers = async () => {
    try {
      if (!session) return
      const response = await ListUsersController.getFollowers(session?.access_token, user!.id);
      setFollowers(response.map((follower) => ({ ...follower, isFollowingLoading: false })));
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
  
  const handleFollow = async (userId: string) => {
    setFollowers(prevFollowers => prevFollowers ? prevFollowers.map(follower => follower.followerId === userId ? { ...follower, isFollowingLoading: true } : follower) : null);
    try{
      if (!session) return
      const response = await FollowUserController.followUser(session?.access_token, user!.id, userId);
      if(response.success){
        setFollowers(prevFollowers => prevFollowers ? prevFollowers.map(follower => follower.followerId === userId ? { ...follower, followed: true } : follower) : null);
      }

      // Send notification      
      const notificationData = {
        fromUserId: user?.id, 
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
      setFollowers(prevFollowers => prevFollowers ? prevFollowers.map(follower => follower.followerId === userId ? { ...follower, isFollowingLoading: false } : follower) : null);
    }
  }

  const handleUnfollow = async (userId: string) => {
    setFollowers(prevFollowers => prevFollowers ? prevFollowers.map(follower => follower.followerId === userId ? { ...follower, isFollowingLoading: true } : follower) : null);
    try{
      if (!session) return
      const response = await FollowUserController.unfollowUser(session?.access_token, user!.id, userId);
      if(response.success){
        setFollowers(prevFollowers => prevFollowers ? prevFollowers.map(follower => follower.followerId === userId ? { ...follower, followed: false } : follower) : null);
      }
    }catch(error){
      console.log("Error al dejar de seguir al usuario", error);
    }finally{
      setFollowers(prevFollowers => prevFollowers ? prevFollowers.map(follower => follower.followerId === userId ? { ...follower, isFollowingLoading: false } : follower) : null);
    }
  }


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
            onPressButton={() => {follower.followed ? handleUnfollow(follower.followerId) : handleFollow(follower.followerId)}}
            variant={UserCardVariant.WITH_BUTTON}
            actionLabel={follower.followed ? "Dejar de seguir" : "Seguir"}
            disabled={follower.isFollowingLoading}
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
