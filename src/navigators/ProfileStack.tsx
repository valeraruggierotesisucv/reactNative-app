import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileView } from "../views/ProfileView";
import { EditProfileView } from "../views/EditProfileView";
import { ConfigurationView } from "../views/ConfigurationView";
import { ChangeLanguageView } from "../views/ChangeLanguageView";
import { ChangePasswordView } from "../views/ChangePasswordView";

const ProfileStackNavigator = createNativeStackNavigator();

export type ProfileStackParamList = {
    Profile: undefined;
    EditProfile: undefined;
    Configuration: undefined;
    ChangePassword: undefined;
    ChangeLanguage: undefined;
};

export type ProfileStackNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

export function ProfileStack() {
    return(
        <ProfileStackNavigator.Navigator
            initialRouteName="Profile"
        >
            <ProfileStackNavigator.Screen name="Profile" component={ProfileView} />
            <ProfileStackNavigator.Screen name="EditProfile" component={EditProfileView} />
            <ProfileStackNavigator.Screen name="Configuration" component={ConfigurationView} />
            <ProfileStackNavigator.Screen name="ChangePassword" component={ChangePasswordView} />
            <ProfileStackNavigator.Screen name="ChangeLanguage" component={ChangeLanguageView} />       
        </ProfileStackNavigator.Navigator>
    )
}