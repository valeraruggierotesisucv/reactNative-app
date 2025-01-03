import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { HomeStackNavigationProp } from "../navigators/HomeStack";
import { HomeRoutes } from "../../utils/routes";
import { Button } from "../components/Button/Button";
import { UserCard, UserCardVariant } from "../components/UserCard/UserCard";

export function HomeView() {
  const navigation = useNavigation<HomeStackNavigationProp>();
  return (
    <View style={{ flex: 1, gap: 8, alignItems: "center" }}>
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
        profileImage="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1"
        username="John Doe"
        variant={UserCardVariant.DEFAULT}
      />
      <UserCard
        profileImage="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1"
        username="John Doe"
        variant={UserCardVariant.WITH_BUTTON}
        actionLabel="seguir"
      />
    </View>
  );
}
