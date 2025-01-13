import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileView } from "../views/ProfileView";
import { EditProfileView } from "../views/EditProfileView";
import { ConfigurationView } from "../views/ConfigurationView";
import { ChangePasswordView } from "../views/ChangePasswordView";
import { ProfileRoutes } from "../../utils/routes";
import { ProfileStackParamList } from "../../utils/types";
import { FollowersView } from "../views/FollowersView";
import { FollowedView } from "../views/FollowedView";
import { EditEventView } from "../views/EditEventView";
import { EventDetailsView } from "../views/EventDetailsView";

const ProfileStackNavigator = createNativeStackNavigator();

export type ProfileStackNavigationProp =
  NativeStackNavigationProp<ProfileStackParamList>;

export function ProfileStack() {
  return (
    <ProfileStackNavigator.Navigator
      initialRouteName={ProfileRoutes.Profile}
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStackNavigator.Screen name={ProfileRoutes.Profile} component={ProfileView}/>
      <ProfileStackNavigator.Screen name={ProfileRoutes.EditProfile} component={EditProfileView}/>
      <ProfileStackNavigator.Screen name={ProfileRoutes.Configuration} component={ConfigurationView}/>
      <ProfileStackNavigator.Screen name={ProfileRoutes.ChangePassword} component={ChangePasswordView}/>
      <ProfileStackNavigator.Screen name={ProfileRoutes.Followers} component={FollowersView}/>
      <ProfileStackNavigator.Screen name={ProfileRoutes.Followed} component={FollowedView}/>
      <ProfileStackNavigator.Screen name={ProfileRoutes.EventDetails} component={EventDetailsView}/>
      <ProfileStackNavigator.Screen name={ProfileRoutes.EditEvent} component={EditEventView}/>
    </ProfileStackNavigator.Navigator>
  );
}
