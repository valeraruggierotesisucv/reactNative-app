import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { EventThumbnailList } from "../components/EventThumbnailList/EventThumbnailList";
import { ProfileRoutes } from "../../utils/routes";
import { user } from "../../utils/dummyData";
import { ProfileCard } from "../components/ProfileCard/ProfileCard";
import { theme } from "../../utils/theme";

export function ProfileDetailsView() {
    const navigation = useNavigation<ProfileStackNavigationProp>();

    const mockEvents = Array.from({ length: 22 }, (_, index) => ({
        id: `event-${index + 1}`,
        imageUrl: `https://picsum.photos/400/400?random=${index + 1}`,
      }));

    // TODO: En la tarjeta de perfil, agregar variacion con el boton de seguir | dejar de seguir
    
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <AppHeader title="Detalles del Perfil" goBack={navigation.goBack} />
                <ProfileCard
                    profileImage={user?.profileImage}
                    username={user?.username || "No disponible"}
                    biography={user?.biography || "No disponible"}
                    events={user?.events || 0}
                    followers={user?.followers || 0}
                    following={user?.following || 0}
                    onFollowers={() => {
                        navigation.navigate(ProfileRoutes.Followers);
                    }}
                    onFollowed={() => {
                        navigation.navigate(ProfileRoutes.Followed);
                    }}                  
                    />
                    <View style={styles.separator} />
                    <EventThumbnailList
                        events={mockEvents}
                        onPressEvent={(eventId) => {
                            console.log("Pressed event", eventId);
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors['white'],
    },
    scrollViewContent: {
        flexGrow: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
    },
    separator: {
        height: 1,
        width: "90%",
        backgroundColor: theme.colors['black'],
        marginBottom: 10,
    },
});