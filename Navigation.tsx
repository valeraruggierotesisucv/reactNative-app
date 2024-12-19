import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { TabBar } from "./utils/enums";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from "./utils/theme";


// Views 
import { AddView } from "./src/views/AddView";
import { NotificationsView } from "./src/views/NotificationsView";
import { ProfileView } from "./src/views/ProfileView";

// Stacks Navigators
import { HomeStack } from "./src/navigators/HomeStack";
import { SearchStack } from "./src/navigators/SearchStack";
const Tab = createBottomTabNavigator();



function BottomTabNavigator() {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarStyle:{
                    padding: 10
                }
            }}
        >
            <Tab.Screen 
                name={TabBar.Home} 
                component={HomeStack} 
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Entypo name="home" size={size} color={color} />
                    },
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen 
                name={TabBar.Search} 
                component={SearchStack} 
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <AntDesign name="search1" size={size} color={color} />
                    },
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen 
                name={TabBar.Add} 
                component={AddView} 
                options={{
                    tabBarIcon: ({ color, size, focused }) => {                        
                        return <AntDesign name="plus" size={size} color={color} />
                    },
                    tabBarLabel: () => null,
                }}
            />
            
            <Tab.Screen 
                name={TabBar.Notifications} 
                component={NotificationsView} 
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused) {
                            return <Ionicons name="notifications" size={size} color={color} />
                        }
                        return <Ionicons name="notifications-outline" size={size} color={color} />
                    },
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen 
                name={TabBar.Profile} 
                component={ProfileView} 
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <AntDesign name="user" size={size} color={color} />
                    },
                    tabBarLabel: () => null,
                }}
            />
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
