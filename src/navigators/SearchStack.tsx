import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchView } from "../views/SearchView";
import { EventDetailsView } from "../views/EventDetailsView";
import { ProfileDetailsView } from "../views/ProfileDetailsView";
import { SearchRoutes } from "../../utils/routes";
import { SearchStackParamList } from "../../utils/types";

const SearchStackNavigator = createNativeStackNavigator();

export type SearchStackNavigationProp =
  NativeStackNavigationProp<SearchStackParamList>;

export function SearchStack() {
  return (
    <SearchStackNavigator.Navigator
      initialRouteName={SearchRoutes.Search}
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchStackNavigator.Screen name={SearchRoutes.Search} component={SearchView}/>
      <SearchStackNavigator.Screen name={SearchRoutes.EventDetails}component={EventDetailsView}/>
      <SearchStackNavigator.Screen name={SearchRoutes.ProfileDetails}component={ProfileDetailsView}/>
    </SearchStackNavigator.Navigator>
  );
}
