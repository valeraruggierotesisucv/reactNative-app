import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, FlatList } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { SearchStackNavigationProp } from "../navigators/SearchStack";
import { SearchRoutes } from "../../utils/routes";
import { EventCard } from "../components/EventCard/EventCard";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { events as allEvents} from "../../utils/dummyData";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Tabs, Tab } from "../components/Tabs/Tabs";
import { Pills } from "../components/Pills/Pills";
import { theme } from "../../utils/theme";
import { onShare } from "../../utils/share";
import { useTranslation } from "react-i18next";
import { dummyComments } from "../data/dummyComments";

export enum SearchTabsEnum  {
  EVENTS = "Eventos", 
  ACCOUNTS = "Cuentas"
}

// TODO usar el shareEnum (da error)
export enum CategoriesEnum {
  ALL = "Todos",
  CONFERENCES = "Conferencias",
  PARTIES = "Fiestas",
  CONCERTS = "Conciertos",
  CLUBS = "Clubs", 
  FESTIVALS = "Festivales",
  SPORTS = "Deporte",
  THEATER = "Teatro",
  EXHIBITIONS = "Exhibición",
  EDUCATION = "Educativo",
  CULTURE = "Cultura"
}

export function SearchView() {
    const { t } = useTranslation(); 
    const navigation = useNavigation<SearchStackNavigationProp>();
    const [activeTab, setActiveTab] = useState<string>(SearchTabsEnum.EVENTS); 
    const [activeCategories, setActiveCategories] = useState<string[] | string>([])
    const [search, setSearch] = useState(""); 
    const [events, setEvents] = useState(allEvents); 

    const searchTabs = [
      { id: SearchTabsEnum.EVENTS, label: t("search.tabs.events")},
      { id: SearchTabsEnum.ACCOUNTS, label: t("search.tabs.accounts")},
    ]
    
    const categories = [
      { id: CategoriesEnum.ALL, label: t("categories.all")}, 
      { id: CategoriesEnum.CLUBS, label: t("categories.clubs")}, 
      { id: CategoriesEnum.CONCERTS, label: t("categories.concerts")}, 
      { id: CategoriesEnum.FESTIVALS, label: t("categories.festivals")}, 
      { id: CategoriesEnum.PARTIES, label: t("categories.parties")}, 
    ]

    // TODO: falta 
    const handleSearchChange = (text: string) => {
      setSearch(text);
    };    

    // TODO: mejorar, se filtrará a nivel de front o de backend
    function filteredCategories () {
      const eventsFiltered = allEvents.filter((event) => {
        if (activeCategories.includes(CategoriesEnum.ALL) || activeCategories.length === 0) {
          return true;
        }

        return activeCategories.includes(event.category);
        })
      console.log(eventsFiltered)
      return eventsFiltered
    }

    useEffect(() => {
      console.log("Active Categories -->", activeCategories)
      setEvents(filteredCategories()); 
    }, [activeCategories])

    // Todo falta implementar esto dependiendo del backend y del Search 
    useEffect(() => {
      console.log("Active Tab --> ", activeTab)
    }, [activeTab])

    return(
        <SafeAreaView style={styles.container}>   
          <View style={styles.view}>
            <AppHeader />
            <SearchBar
              onChangeText={handleSearchChange}
              value={search}
            />
            <View style={styles.tabs}>
              <Tabs 
                tabs={searchTabs}
                onTabChange={(tab: Tab) => setActiveTab(tab.id)}
              />
            </View>
            <View style={{padding: 5}}>
              <Pills 
                categories={categories}
                onSelectCategories={(categoryIds) => setActiveCategories(categoryIds)}
              />
            </View>            
            
            <FlatList
              data={events}
              renderItem={({ item }) => {
                return(
                  <EventCard 
                    profileImage={item.profileImage}
                    username={item.username}                
                    eventImage={item.eventImage}
                    title={item.title}
                    description={item.description}
                    isLiked={item.isLiked}
                    date={item.date}
                    onPressUser={() => navigation.navigate(SearchRoutes.ProfileDetails, { userId: item.userId})}
                    onComment={(comment: string) => Promise.resolve()}
                    onShare={() => onShare(t('shareMessage', { eventName: item.title, eventDate: item.date }))}
                    onMoreDetails={() => navigation.navigate(SearchRoutes.EventDetails, {eventId: item.eventId, canEdit: false})}
                    fetchComments={() => Promise.resolve(dummyComments)}
                  />
                )
              }}
              contentContainerStyle={{ paddingBottom: 70 }}
            />
          </View>   
        </SafeAreaView>      
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors['white'],
  },
  view: {
    flex: 1,
    width: "100%",
  },   
  tabs: {
    alignItems: "flex-start", 
    paddingLeft: 5,
    paddingBottom: 5
  }
});