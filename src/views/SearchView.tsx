import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { SearchStackNavigationProp } from "../navigators/SearchStack";
import { SearchRoutes } from "../../utils/routes";
import { EventCard } from "../components/EventCard/EventCard";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { events } from "../../utils/dummyData";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useState } from "react";
import { Tabs } from "../components/Tabs/Tabs";
import { Pills } from "../components/Pills/Pills";

export enum SearchTabsEnum  {
  EVENTS = "Eventos", 
  ACCOUNTS = "Cuentas"
}

export function SearchView() {
    const navigation = useNavigation<SearchStackNavigationProp>();
    const [activeTab, setActiveTab] = useState<SearchTabsEnum>(SearchTabsEnum.EVENTS); 
    const [search, setSearch] = useState(""); 

    const searchTabs = [
      { id: 'Eventos', label: SearchTabsEnum .EVENTS},
      { id: 'Cuentas', label: SearchTabsEnum .ACCOUNTS },
    ]
  
    const handleSearchChange = (text: string) => {
      setSearch(text);
    };

    
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
                tabs={[
                  { id: 'Eventos', label: 'Eventos' },
                  { id: 'Cuentas', label: 'Cuentas' },
                ]}
                onTabChange={(tabId) => console.log('Tab changed:', tabId)}
              />
            </View>
            <View style={{padding: 5}}>
              <Pills 
                categories={[
                  { id: 'all', label: 'All' },
                  { id: 'concerts', label: 'Concerts' },
                  { id: 'festivals', label: 'Festivals' },
                  { id: 'clubs', label: 'Clubs' },
                  { id: 'parties', label: 'Parties' },
                ]}
                onSelectCategories={(categoryIds) => console.log('Selected categories:', categoryIds)}
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
                    onPressUser={() => navigation.navigate(SearchRoutes.EventDetails)}
                    onComment={() => console.log("COMMENT")}
                    onShare={() => console.log("SHARE")}
                    onMoreDetails={() => navigation.navigate(SearchRoutes.EventDetails)}
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