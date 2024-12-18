import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  EventDetails: undefined;
  ProfileDetails: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HomeView() {
    const navigation = useNavigation<NavigationProp>();
    return(
        <View>
            <Text>HomeView</Text>
            <Button
                title="Ver detalles del evento"
                onPress={() => navigation.navigate("EventDetails")}
            />
            <Button
                title="Ver detalles del perfil"
                onPress={() => navigation.navigate("ProfileDetails")}
            />
        </View>
    )
}   