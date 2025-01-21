import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchStackNavigationProp } from "../navigators/SearchStack";
import { SearchRoutes } from "../../utils/routes";
import { EventCard } from "../components/EventCard/EventCard";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Tabs, Tab } from "../components/Tabs/Tabs";
import { Pills } from "../components/Pills/Pills";
import { theme } from "../../utils/theme";
import { onShare } from "../../utils/share";
import { useTranslation } from "react-i18next";
import { dummyComments } from "../data/dummyComments";
import { SearchEventController } from "../controllers/SearchEventController";
import { EventModel } from "../models/EventModel";
import { IMAGE_PLACEHOLDER } from "../../utils/consts";
import { UserCard } from "../components/UserCard/UserCard";
import { UserModel } from "../models/UserModel";
import { SearchUserController } from "../controllers/SearchUserController";
import { CategoriesController } from "../controllers/CategoriesController";
import { useAuth } from "../contexts/AuthContext";
import { CategoryModel } from "../models/CategoryModel";
import { Loading } from "../components/Loading/Loading";

export enum SearchTabsEnum {
  EVENTS = "Eventos",
  ACCOUNTS = "Cuentas",
}

export function SearchView() {
  const { t } = useTranslation();
  const navigation = useNavigation<SearchStackNavigationProp>();
  const [activeTab, setActiveTab] = useState<string>(SearchTabsEnum.EVENTS);
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);
  const [activeCategories, setActiveCategories] = useState<string[] | string>(
    []
  );
  const [search, setSearch] = useState("");
  const [allEvents, setAllEvents] = useState<EventModel[] | null>(null);
  const [events, setEvents] = useState<EventModel[] | null>(null);
  const [userComment, setUserComment] = useState<{
    username: string;
    profileImage: string;
  }>({ username: "", profileImage: IMAGE_PLACEHOLDER });
  const [users, setUsers] = useState<UserModel[] | null>(null);
  const {session} = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const searchTabs = [
    { id: SearchTabsEnum.EVENTS, label: t("search.tabs.events") },
    { id: SearchTabsEnum.ACCOUNTS, label: t("search.tabs.accounts") },
  ];

  useEffect(() => {
    async function fetchCategories(){
      const response = await CategoriesController.getCategories(session!.access_token);
      console.log(response);
      setCategories(response);
      setIsLoading(false);
    }
    fetchCategories();
  }, []);


  const handleSearchChange = async (text: string) => {
    setSearch(text);

    if (text.length > 0) {
      if (activeTab === SearchTabsEnum.EVENTS) {
        const events = await SearchEventController.searchEvents(text);
        console.log("events", events);
        setAllEvents(events);
      } else {
        const users = await SearchUserController.searchUsers(text);
        setUsers(users);
      }
    }
  };

  function filteredCategories() {
    if (allEvents) {
      const eventsFiltered = allEvents.filter((event) => {
        if (activeCategories.length === 0) {
          return true;
        }
        return activeCategories.includes(event.categoryId.toString());
      });
      return eventsFiltered;
    }
    return [];
  }

  useEffect(() => {
    if (search.length > 0) {
      setEvents(filteredCategories());
    }
  }, [activeCategories, allEvents, activeTab]);

  useEffect(() => {
    setSearch("");
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <Loading /> : (
      <View style={styles.view}>
        <AppHeader />
        <View style={{ paddingHorizontal: 10 }}>
          <SearchBar onChangeText={handleSearchChange} value={search} />
          <View style={styles.tabs}>
            <Tabs
              tabs={searchTabs}
              onTabChange={(tab: Tab) => setActiveTab(tab.id)}
            />
          </View>
          {categories && activeTab === SearchTabsEnum.EVENTS && (
            <View style={{ padding: 5 }}>
              <Pills
                categories={categories.map((category) => ({
                  id: category.id.toString(),
                  label: category.nameEs,
                }))}
                onSelectCategories={(categoryIds) =>
                  setActiveCategories(categoryIds)
                }
              />
            </View>
          )}
        </View>

        {activeTab === SearchTabsEnum.ACCOUNTS && (
          <>
            {users && search.length > 0 ? (
              <>
                {users.length > 0 ? (
                  <FlatList
                    data={users}
                    renderItem={({ item }) => {
                      return (
                        <UserCard
                          profileImage={item.profileImage || IMAGE_PLACEHOLDER}
                          username={item.username}
                          onPressButton={() => {}}
                        />
                      );
                    }}
                  />
                ) : (
                  <View style={styles.searchContainer}>
                    <Text style={styles.searchText}>No users found</Text>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.searchContainer}>
                <Text style={styles.searchText}>Busca usuarios</Text>
              </View>
            )}
          </>
        )}

        {activeTab === SearchTabsEnum.EVENTS && (
          <>
            {events && search.length > 0 ? (
              <>
                {events.length > 0 ? (
                  <FlatList
                    data={events}
                    renderItem={({ item }) => {
                      return (
                        <EventCard
                          eventId={item.eventId}
                          latitude={item.latitude}
                          userComment={userComment}
                          profileImage={item.profileImage}
                          username={item.username}
                          eventImage={item.eventImage}
                          title={item.title}
                          description={item.description}
                          isLiked={item.isLiked}
                          date={item.date}
                          onPressUser={() =>
                            navigation.navigate(SearchRoutes.ProfileDetails, {
                              userId: item.userId,
                            })
                          }
                          onComment={(comment: string) => Promise.resolve()}
                          onShare={() =>
                            onShare(
                              t("shareMessage", {
                                eventName: item.title,
                                eventDate: item.date,
                              })
                            )
                          }
                          onMoreDetails={() =>
                            navigation.navigate(SearchRoutes.EventDetails, {
                              eventId: item.eventId,
                              canEdit: false,
                            })
                          }
                          fetchComments={() => Promise.resolve(dummyComments)}
                        />
                      );
                    }}
                    contentContainerStyle={{ paddingBottom: 70 }}
                  />
                ) : (
                  <View style={styles.searchContainer}>
                    <Text style={styles.searchText}>No events found</Text>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.searchContainer}>
                <Text style={styles.searchText}>Busca eventos</Text>
              </View>
            )}
          </>
        )}
      </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors["white"],
  },
  view: {
    flex: 1,
    width: "100%",
  },
  tabs: {
    alignItems: "flex-start",
    paddingLeft: 5,
    paddingBottom: 5,
  },
  searchContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  searchText: {
    fontFamily: "SF-Pro-Rounded-Bold",
    color: "gray",
    fontSize: 18,
  },
});
