import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchView } from "../views/SearchView";
import { EventDetailsView } from "../views/EventDetailsView";
import { ProfileDetailsView } from "../views/ProfileDetailsView";

const SearchStackNavigator = createNativeStackNavigator();

export enum SearchRoutes {
    Search = "Search",
    EventDetails = "EventDetails",
    ProfileDetails = "ProfileDetails"
}

export type SearchStackParamList = {
    [SearchRoutes.Search]: undefined;
    [SearchRoutes.EventDetails]: undefined;
    [SearchRoutes.ProfileDetails]: undefined;
};

export type SearchStackNavigationProp = NativeStackNavigationProp<SearchStackParamList>;

export function SearchStack() {
    return(
        <SearchStackNavigator.Navigator
            initialRouteName={SearchRoutes.Search}
        >
            <SearchStackNavigator.Screen name={SearchRoutes.Search} component={SearchView} />
            <SearchStackNavigator.Screen name={SearchRoutes.EventDetails} component={EventDetailsView} />
            <SearchStackNavigator.Screen name={SearchRoutes.ProfileDetails} component={ProfileDetailsView} />
        </SearchStackNavigator.Navigator>
    )
}