import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileView } from "../views/ProfileView";
import { EditProfileView } from "../views/EditProfileView";
import { ConfigurationView } from "../views/ConfigurationView";
import { ChangeLanguageView } from "../views/ChangeLanguageView";
import { ChangePasswordView } from "../views/ChangePasswordView";

const ProfileStackNavigator = createNativeStackNavigator();

export enum ProfileRoutes {
    Profile = "Profile",
    EditProfile = "EditProfile",
    Configuration = "Configuration",
    ChangePassword = "ChangePassword",
    ChangeLanguage = "ChangeLanguage"
}

export type ProfileStackParamList = {
    [ProfileRoutes.Profile]: undefined;
    [ProfileRoutes.EditProfile]: undefined;
    [ProfileRoutes.Configuration]: undefined;
    [ProfileRoutes.ChangePassword]: undefined;
    [ProfileRoutes.ChangeLanguage]: undefined;
};

export type ProfileStackNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

export function ProfileStack() {
    return(
        <ProfileStackNavigator.Navigator
            initialRouteName={ProfileRoutes.Profile}
        >
            <ProfileStackNavigator.Screen name={ProfileRoutes.Profile} component={ProfileView} />
            <ProfileStackNavigator.Screen name={ProfileRoutes.EditProfile} component={EditProfileView} />
            <ProfileStackNavigator.Screen name={ProfileRoutes.Configuration} component={ConfigurationView} />
            <ProfileStackNavigator.Screen name={ProfileRoutes.ChangePassword} component={ChangePasswordView} />
            <ProfileStackNavigator.Screen name={ProfileRoutes.ChangeLanguage} component={ChangeLanguageView} />       
        </ProfileStackNavigator.Navigator>
    )
}