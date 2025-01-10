import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet } from "react-native";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCard, UserCardVariant } from "../components/UserCard/UserCard";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useState } from "react";

export function FollowedView() {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [search, setSearch] = useState("");

  const followedDummyData = [
    {
      id: 1,
      name: "John Doe",
      profileImage: "https://picsum.photos/200/200",
      followed: true,
    },
    {
      id: 2,
      name: "Jane Doe",
      profileImage: "https://picsum.photos/200/200",
      followed: true,
    },
    {
      id: 3,
      name: "John Smith",
      profileImage: "https://picsum.photos/200/200",
      followed: true,
    },
  ];

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  const filteredFollowed = followedDummyData.filter((followed) =>
    followed.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader title="Seguidos" goBack={navigation.goBack} />
        <SearchBar
          onChangeText={handleSearchChange}
          value={search}
        />
        {filteredFollowed.map((followed) => (
          <UserCard
            key={followed.id}
            profileImage={followed.profileImage}
            username={followed.name}
            onPressButton={() => {}}
            variant={UserCardVariant.WITH_BUTTON}
            actionLabel={followed.followed ? "Dejar de seguir" : "Seguir"}
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
