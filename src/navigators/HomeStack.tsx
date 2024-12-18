import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeView } from "../views/HomeView";
import { EventDetailsView } from "../views/EventDetailsView";
import { ProfileDetailsView } from "../views/ProfileDetailsView";

const HomeStackNavigator = createNativeStackNavigator();

export function HomeStack() {
    return(
        <HomeStackNavigator.Navigator
            initialRouteName="Home"    
        >
            <HomeStackNavigator.Screen name="Home" component={HomeView} />
            <HomeStackNavigator.Screen name="EventDetails" component={EventDetailsView} />
            <HomeStackNavigator.Screen name="ProfileDetails" component={ProfileDetailsView} />
        </HomeStackNavigator.Navigator>
    )
}