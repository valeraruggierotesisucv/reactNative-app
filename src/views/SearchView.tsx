import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, FlatList, Text, Alert } from "react-native";
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
import { useTranslation } from "react-i18next";
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
import { ShareEventController } from "../controllers/ShareEventController";
import { CommentEventController } from "../controllers/CommentEventController";
import { ProfileController } from "../controllers/ProfileController";
import { LikeEventController } from "../controllers/LikeEventController";
import { NotificationType } from "../components/NotificationItem/NotificationItem";
import { NotificationsController } from "../controllers/NotificationsController";

export enum SearchTabsEnum {
  EVENTS = "Eventos",
  ACCOUNTS = "Cuentas",
}

export function SearchView() {
  const { t } = useTranslation();
  const navigation = useNavigation<SearchStackNavigationProp>();
  const [activeTab, setActiveTab] = useState<string>(SearchTabsEnum.EVENTS);
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);
  const [activeCategories, setActiveCategories] = useState<string[] | string>([]);
  const [search, setSearch] = useState("");
  const [allEvents, setAllEvents] = useState<EventModel[] | null>(null);
  const [events, setEvents] = useState<EventModel[] | null>(null);
  const [userComment, setUserComment] = useState<{
    username: string;
    profileImage: string;
  }>({ username: "", profileImage: IMAGE_PLACEHOLDER });
  const [users, setUsers] = useState<UserModel[] | null>(null);
  const {session, user} = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const searchTabs = [
    { id: SearchTabsEnum.EVENTS, label: t("search.tabs.events") },
    { id: SearchTabsEnum.ACCOUNTS, label: t("search.tabs.accounts") },
  ];

  useEffect(() => {
    
    async function fetchCategories(){
      try{
        const response = await CategoriesController.getCategories(session!.access_token);
        setCategories(response);
        setIsLoading(false);
      }catch(error){
        console.error("Error in fetchCategories:", error);
        Alert.alert("Error", (error as Error).message);
      }
    }

    async function fetchProfile(){
      if (!session) return
      try{
        const profile = await ProfileController.getProfile(session?.access_token, user?.id || "");
        setUserComment({
          "username": profile.username, 
          "profileImage": profile.profileImage || IMAGE_PLACEHOLDER
        })
      }catch(error){
        console.error("Error in fetchProfile:", error);
        Alert.alert("Error", (error as Error).message);
      }
    }

    fetchCategories();
    fetchProfile();
  }, []);

  async function fetchEvents(text: string){ 
    if (!session) return
    if (text.length > 0) {
      if (activeTab === SearchTabsEnum.EVENTS) {
        try{
          const events = await SearchEventController.searchEvents(session.access_token, text, user!.id);
          console.log("events", events);
          setAllEvents(events);
        }catch(error){
          console.error("Error in fetchEvents:", error);
          Alert.alert("Error", (error as Error).message);
        }
      } else {
        try{
          const users = await SearchUserController.searchUsers(session.access_token, text);
          setUsers(users);
        }catch(error){
          console.error("Error in fetchUsers:", error);
          Alert.alert("Error", (error as Error).message);
        }
      }
    }
  }

  const handleLike = async (eventId: string, eventImage: string, toUserId: string, isLiked: boolean) => {
    if (session && user) {
      try {
        setEvents(currentEvents => {
          if(!currentEvents) return [];
          const newEvents = currentEvents.map(event => 
            event.eventId === eventId 
              ? { ...event, isLiked: !event.isLiked }
              : event
          );
          
          return newEvents;
        });
        const result = await LikeEventController.likeEvent(session.access_token, eventId, user.id);

        // Send notification      
        const notificationData = {
          fromUserId: user.id, 
          toUserId: toUserId,  
          type:  NotificationType.LIKE_EVENT, 
          message: t("notifications.LIKE"), 
          eventImage: eventImage
        }
  
        if(session && !isLiked){
          const notificationResult = await NotificationsController.createNotification(session?.access_token, notificationData); 
          console.log("Notificación enviada: " , notificationResult);
        } 
        
        if(result.isActive){
          setEvents(currentEvents => {
            if(!currentEvents) return [];
            const newEvents = currentEvents.map(event => 
              event.eventId === eventId 
                ? { ...event, isLiked: result.isActive }
                : event
            );
            return newEvents;
          });
        }
        
      } catch (error) {
        console.error("Error handling like:", error);
        Alert.alert("Error", (error as Error).message);
      }
    }
  };

  const handleSearchChange = async (text: string) => {
    setSearch(text);

    if (text.length > 0) {
      if (activeTab === SearchTabsEnum.EVENTS) {
        try{  
          const events = await SearchEventController.searchEvents(session!.access_token, text, user!.id);
          setAllEvents(events);
        }catch(error){
          console.error("Error in handleSearchChange:", error);
          Alert.alert("Error", (error as Error).message);
        }
      } else {
        try{
          const users = await SearchUserController.searchUsers(session!.access_token, text);
          setUsers(users);
        }catch(error){
          console.error("Error in handleSearchChange:", error);
          Alert.alert("Error", (error as Error).message);
        }
      }
    }
  };

  useEffect(() => {
    fetchEvents(search);
  }, [activeTab]);

  const fetchComments = async (eventId: string) => {
    try {
     
      if(session){
        const comments = await CommentEventController.getEventComments(session?.access_token, eventId)
        return comments;
      }      
    } catch (error) {
      console.error("Error fetching comments for event:", eventId, error);
      Alert.alert("Error", (error as Error).message);
      return []; 
    }
  };

  const onComment = async (eventId: string, comment: string, eventImage: string) => {
    if(session && user){
      try {
        await CommentEventController.createComment(session?.access_token, eventId, {
          userId: user?.id, 
          text: comment
        })
        const toUserId = await ProfileController.getUserId(session.access_token, eventId); 

        // Send notification      
        const notificationData = {
          fromUserId: user.id, 
          toUserId: toUserId.data,  
          type:  NotificationType.COMMENT_EVENT, 
          message: t("notifications.COMMENT"), 
          eventImage: eventImage
        }
  
        if(session){
          const notificationResult = await NotificationsController.createNotification(session?.access_token, notificationData); 
          console.log("Notificación enviada: " , notificationResult);
        } 
      
      } catch (error) {
        console.error("Error adding comment", error);
        Alert.alert("Error", (error as Error).message);
      }
    }    
  }

  

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
                          onPressUser={() => {
                            console.log("item", item);
                            navigation.navigate(SearchRoutes.ProfileDetails, {
                              userId: item.userId,
                            })
                          }}
                        />
                      );
                    }}
                  />
                ) : (
                  <View style={styles.searchContainer}>
                    <Text style={styles.searchText}>{t('search.no_users_found')}</Text>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.searchContainer}>
                <Text style={styles.searchText}>{t('search.search_users')}</Text>
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
                          handleLike={() => handleLike(item.eventId, item.eventImage, item.userId, item.isLiked)}
                          date={item.date}
                          onPressUser={() => {
                            navigation.navigate(SearchRoutes.ProfileDetails, {
                              userId: item.userId,
                            })
                          }}
                          onComment={onComment}
                          onShare={() =>
                            ShareEventController.shareEvent(
                              t("common.share_message", {
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
                          fetchComments={() => fetchComments(item.eventId)}
                        />
                      );
                    }}
                    contentContainerStyle={{ paddingBottom: 70 }}
                  />
                ) : (
                  <View style={styles.searchContainer}>
                    <Text style={styles.searchText}>{t('search.no_events_found')}</Text>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.searchContainer}>
                <Text style={styles.searchText}>{t('search.search_events')}</Text>
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
