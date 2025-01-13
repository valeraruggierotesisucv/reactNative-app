import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet } from "react-native";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCard, UserCardVariant } from "../components/UserCard/UserCard";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function FollowersView() {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [search, setSearch] = useState("");

  const followersDummyData = [
    {
      id: 1,
      name: "John Doe",
      profileImage: "https://picsum.photos/200/200",
    },
    {
      id: 2,
      name: "Jane Doe",
      profileImage: "https://picsum.photos/200/200",
    },
    {
      id: 3,
      name: "John Smith",
      profileImage: "https://picsum.photos/200/200",
    },
  ];

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  const filteredFollowers = followersDummyData.filter((follower) =>
    follower.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader title={t("profile.followers")} goBack={navigation.goBack} />
        <SearchBar
          onChangeText={handleSearchChange}
          value={search}
        />
        {filteredFollowers.map((follower) => (
          <UserCard
            key={follower.id}
            profileImage={follower.profileImage}
            username={follower.name}
            onPressButton={() => {}}
            variant={UserCardVariant.WITH_BUTTON}
            actionLabel="Seguir"
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
