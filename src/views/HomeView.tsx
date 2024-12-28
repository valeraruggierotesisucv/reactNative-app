import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { HomeStackNavigationProp } from "../navigators/HomeStack";
import { HomeRoutes } from "../../utils/routes";

export function HomeView() {
    const navigation = useNavigation<HomeStackNavigationProp>();
    return(
        <View style={{flex: 1, gap: 8}}>
            <Text>HomeView</Text>
            <Button
                title="Ver detalles del evento"
                onPress={() => navigation.navigate(HomeRoutes.EventDetails)}
            />
            <Button
                title="Ver detalles del perfil"
                onPress={() => navigation.navigate(HomeRoutes.ProfileDetails)}
            />
        </View>
    )
}   