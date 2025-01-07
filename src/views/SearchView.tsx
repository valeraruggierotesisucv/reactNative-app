import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { SearchStackNavigationProp } from "../navigators/SearchStack";
import { SearchRoutes } from "../../utils/routes";
import { EventCard } from "../components/EventCard/EventCard";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { events as allEvents} from "../../utils/dummyData";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Tabs } from "../components/Tabs/Tabs";
import { Pills } from "../components/Pills/Pills";


export enum SearchTabsEnum  {
  EVENTS = "Eventos", 
  ACCOUNTS = "Cuentas"
}

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
    const navigation = useNavigation<SearchStackNavigationProp>();
    const [activeTab, setActiveTab] = useState<string>(SearchTabsEnum.EVENTS); 
    const [activeCategories, setActiveCategories] = useState<string[] | string>([])
    const [search, setSearch] = useState(""); 
    const [events, setEvents] = useState(allEvents); 

    const searchTabs = [
      { id: SearchTabsEnum.EVENTS, label: SearchTabsEnum.EVENTS},
      { id: SearchTabsEnum.ACCOUNTS, label: SearchTabsEnum.ACCOUNTS },
    ]
    
    const categories = [
      { id: CategoriesEnum.ALL, label: CategoriesEnum.ALL}, 
      { id: CategoriesEnum.CLUBS, label: CategoriesEnum.CLUBS}, 
      { id: CategoriesEnum.CONCERTS, label: CategoriesEnum.CONCERTS}, 
      { id: CategoriesEnum.FESTIVALS, label: CategoriesEnum.FESTIVALS}, 
      { id: CategoriesEnum.PARTIES, label: CategoriesEnum.PARTIES}, 
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
              placeholder="Search"
              onChangeText={handleSearchChange}
              value={search}
            />
            <View style={styles.tabs}>
              <Tabs 
                tabs={searchTabs}
                onTabChange={(tabId) => setActiveTab(tabId)}
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
                    onComment={() => console.log("COMMENT")}
                    onShare={() => console.log("SHARE")}
                    onMoreDetails={() => navigation.navigate(SearchRoutes.EventDetails, {eventId: item.eventId})}
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
    backgroundColor: "#FFFFFF",
  },
  view: {
    flexGrow: 1,
    width: "100%",
    paddingTop: 20,              // check padding 
  },   
  tabs: {
    alignItems: "flex-start", 
    paddingLeft: 5,
    paddingBottom: 5
  }
});