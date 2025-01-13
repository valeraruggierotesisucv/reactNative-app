import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeView } from "../views/HomeView";
import { EventDetailsView } from "../views/EventDetailsView";
import { ProfileDetailsView } from "../views/ProfileDetailsView";
import { HomeRoutes } from "../../utils/routes";
import { HomeStackParamList } from "../../utils/types";

const HomeStackNavigator = createNativeStackNavigator();

export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

export function HomeStack() {
  return (
    <HomeStackNavigator.Navigator
      initialRouteName={HomeRoutes.Home}
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStackNavigator.Screen name={HomeRoutes.Home} component={HomeView} />
      <HomeStackNavigator.Screen name={HomeRoutes.EventDetails} component={EventDetailsView}/>
      <HomeStackNavigator.Screen name={HomeRoutes.ProfileDetails} component={ProfileDetailsView}/>
    </HomeStackNavigator.Navigator>
  );
}
