import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { SearchStackNavigationProp } from "../navigators/SearchStack";
import { SearchRoutes } from "../navigators/SearchStack";

export function SearchView() {
    const navigation = useNavigation<SearchStackNavigationProp>();
    return(
        <View style={{flex: 1, gap: 8}}>
           <Text>SearchView</Text>
            <Button
                title="Ver detalles del evento"
                onPress={() => navigation.navigate(SearchRoutes.EventDetails)}
            />
            <Button
                title="Ver detalles del perfil"
                onPress={() => navigation.navigate(SearchRoutes.ProfileDetails)}
            />
        </View>
    )
}