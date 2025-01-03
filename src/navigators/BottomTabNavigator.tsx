import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TabBar } from "../../utils/tabs";
import { theme } from "../../utils/theme";

// Stacks Navigators
import { HomeStack } from "./HomeStack";
import { SearchStack } from "./SearchStack";
import { AddStack } from "./AddStack";
import { NotificationsStack } from "./NotificationsStack";
import { ProfileStack } from "./ProfileStack";

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        tabBarStyle: {
          padding: 10,
        },
      }}
    >
      <Tab.Screen
        name={TabBar.Home}
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="home" size={size} color={color} />;
          },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name={TabBar.Search}
        component={SearchStack}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="search1" size={size} color={color} />;
          },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name={TabBar.Add}
        component={AddStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return <AntDesign name="plus" size={size} color={color} />;
          },
          tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name={TabBar.Notifications}
        component={NotificationsStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Ionicons name="notifications" size={size} color={color} />
              );
            }
            return (
              <Ionicons
                name="notifications-outline"
                size={size}
                color={color}
              />
            );
          },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name={TabBar.Profile}
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="user" size={size} color={color} />;
          },
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
