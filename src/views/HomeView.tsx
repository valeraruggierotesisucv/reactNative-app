import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { HomeStackNavigationProp } from "../navigators/HomeStack";
import { HomeRoutes } from "../../utils/routes";
import { Button } from "../components/Button/Button";
import { UserCard, UserCardVariant } from "../components/UserCard/UserCard";

export function HomeView() {
    const navigation = useNavigation<HomeStackNavigationProp>();
    return(
        <View style={{flex: 1, gap: 8, alignItems: 'center'}}>
            <Text>HomeView</Text>
            <Button
                label="Ver detalles del evento"
                onPress={() => navigation.navigate(HomeRoutes.EventDetails)}
            />
            <Button
                label="Ver detalles del perfil"
                onPress={() => navigation.navigate(HomeRoutes.ProfileDetails)}
            />
            <UserCard 
                profileImage={require("../assets/Avatar.png")}
                username="John Doe"
                variant={UserCardVariant.DEFAULT}
            />
            <UserCard 
                profileImage={require("../assets/Avatar.png")}
                username="John Doe"
                variant={UserCardVariant.WITH_BUTTON}
                onPressButton={() => console.log("PRESSED")}
                actionLabel="seguir"
            />
        </View>
    )
}   