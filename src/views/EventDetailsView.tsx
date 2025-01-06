import { ScrollView, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { HomeStackNavigationProp } from "../navigators/HomeStack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { EventCard, EventCardVariant } from "../components/EventCard/EventCard";
import { events } from "../../utils/dummyData";
import { IMAGE_PLACEHOLDER } from "../../utils/consts";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../../utils/types";
import { HomeRoutes } from "../../utils/routes";

export function EventDetailsView() {
    const navigation = useNavigation<HomeStackNavigationProp>();
    const route = useRoute<RouteProp<HomeStackParamList, HomeRoutes.EventDetails>>();

    function getEventDetails(eventId: string){
        return events.find(event => event.eventId === eventId)
    }

    const event = getEventDetails(route.params?.eventId); 

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <AppHeader title="Detalles" goBack={navigation.goBack} />
                <EventCard 
                    profileImage={event?.profileImage || IMAGE_PLACEHOLDER}
                    username={event?.username || "No disponible"}
                    eventImage={event?.eventImage || IMAGE_PLACEHOLDER}
                    title={event?.title || "No disponible"}
                    description={event?.description || "No disponible"}
                    isLiked={event?.isLiked || false}
                    date={event?.date || "No disponible"}
                    variant={EventCardVariant.DETAILS}
                    location={event?.location}
                    startsAt={event?.startsAt}
                    endsAt={event?.endsAt}
                    category={event?.category}
                    onPressUser={() => console.log("USER")}
                    onComment={() => console.log("Comment")}
                    onShare={() => console.log("SHARE")}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingTop: 20
    },
});