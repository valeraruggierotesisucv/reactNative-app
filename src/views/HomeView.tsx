import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { HomeStackNavigationProp } from "../navigators/HomeStack";
import { HomeRoutes } from "../../utils/routes";
import { Button } from "../components/Button/Button";
import { UserCard, UserCardVariant } from "../components/UserCard/UserCard";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import Constants from "expo-constants";

export function HomeView() {
    const navigation = useNavigation<HomeStackNavigationProp>();
    const { user } = useAuth(); 
    
    // Solo para testing 
    useEffect(() => {
        const host = Constants.expoConfig?.hostUri;
        const localhost = host?.split(":")[0];    
        fetch(`http://${localhost}:5000/api/users`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data)
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            
          });
    }, [])
    return(
        <View style={{flex: 1, gap: 8, alignItems: 'center'}}>
            <Text>HomeView</Text>
            <Text> Bienvenido, {user?.email}</Text>
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