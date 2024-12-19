import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { ProfileRoutes } from "../navigators/ProfileStack";
export function ProfileView() {
    const navigation = useNavigation<ProfileStackNavigationProp>();

    return(
        <View style={{flex: 1, gap: 8}}>
            <Text>ProfileView</Text>
            <Button
                title="Edit Profile"
                onPress={() => navigation.navigate(ProfileRoutes.EditProfile)}
            />
            <Button
                title="Configuration"
                onPress={() => navigation.navigate(ProfileRoutes.Configuration)}
            />
            <Button
                title="Change Password"
                onPress={() => navigation.navigate(ProfileRoutes.ChangePassword)}
            />
            <Button
                title="Change Language"
                onPress={() => navigation.navigate(ProfileRoutes.ChangeLanguage)}
            />
        </View>
    )
}   