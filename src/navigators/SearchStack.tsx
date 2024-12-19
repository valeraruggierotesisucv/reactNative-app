import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchView } from "../views/SearchView";
import { EventDetailsView } from "../views/EventDetailsView";
import { ProfileDetailsView } from "../views/ProfileDetailsView";


const SearchStackNavigator = createNativeStackNavigator();

export type SearchStackParamList = {
    Search: undefined;
    EventDetails: undefined;
    ProfileDetails: undefined;
};

export type SearchStackNavigationProp = NativeStackNavigationProp<SearchStackParamList>;

export function SearchStack() {
    return(
        <SearchStackNavigator.Navigator
            initialRouteName="Search"
        >
            <SearchStackNavigator.Screen name="Search" component={SearchView} />
            <SearchStackNavigator.Screen name="EventDetails" component={EventDetailsView} />
            <SearchStackNavigator.Screen name="ProfileDetails" component={ProfileDetailsView} />
        </SearchStackNavigator.Navigator>
    )
}