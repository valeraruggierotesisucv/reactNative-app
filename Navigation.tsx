import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { TabBar } from "./utils/enums";

// Views 
import HomeView from "./src/views/HomeView";
import AddView from "./src/views/AddView";
import SearchView from "./src/views/SearchView";
import NotificationsView from "./src/views/NotificationsView";
import ProfileView from "./src/views/ProfileView";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return(
        <Tab.Navigator>
            <Tab.Screen name={TabBar.Home} component={HomeView} />
            <Tab.Screen name={TabBar.Add} component={AddView} />
            <Tab.Screen name={TabBar.Search} component={SearchView} />
            <Tab.Screen name={TabBar.Notifications} component={NotificationsView} />
            <Tab.Screen name={TabBar.Profile} component={ProfileView} />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return(
        <NavigationContainer>
            <BottomTabNavigator />
        </NavigationContainer>
    )
}
