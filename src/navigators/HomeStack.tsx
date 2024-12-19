import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeView } from "../views/HomeView";
import { EventDetailsView } from "../views/EventDetailsView";
import { ProfileDetailsView } from "../views/ProfileDetailsView";

const HomeStackNavigator = createNativeStackNavigator();

export enum HomeRoutes {
    Home = "Home",
    EventDetails = "EventDetails",
    ProfileDetails = "ProfileDetails"
}

export type HomeStackParamList = {
    [HomeRoutes.Home]: undefined;
    [HomeRoutes.EventDetails]: undefined;
    [HomeRoutes.ProfileDetails]: undefined;
};
  
export type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export function HomeStack() {
    return(
        <HomeStackNavigator.Navigator
            initialRouteName={HomeRoutes.Home}    
        >
            <HomeStackNavigator.Screen name={HomeRoutes.Home} component={HomeView} />
            <HomeStackNavigator.Screen name={HomeRoutes.EventDetails} component={EventDetailsView} />
            <HomeStackNavigator.Screen name={HomeRoutes.ProfileDetails} component={ProfileDetailsView} />
        </HomeStackNavigator.Navigator>
    )
}