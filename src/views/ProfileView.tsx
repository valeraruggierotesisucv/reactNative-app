import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";

export function ProfileView() {
    const navigation = useNavigation<ProfileStackNavigationProp>();

    return(
        <View style={{flex: 1, gap: 8}}>
            <Text>ProfileView</Text>
            <Button
                title="Edit Profile"
                onPress={() => navigation.navigate('EditProfile')}
            />
            <Button
                title="Configuration"
                onPress={() => navigation.navigate('Configuration')}
            />
            <Button
                title="Change Password"
                onPress={() => navigation.navigate('ChangePassword')}
            />
            <Button
                title="Change Language"
                onPress={() => navigation.navigate('ChangeLanguage')}
            />
        </View>
    )
}   