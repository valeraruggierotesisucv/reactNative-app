import { ScrollView, StyleSheet, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useNavigation, useRoute, NavigationProp } from "@react-navigation/native";
import { EventCard, EventCardVariant } from "../components/EventCard/EventCard";
import { events } from "../../utils/dummyData";
import { IMAGE_PLACEHOLDER } from "../../utils/consts";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList, ProfileStackParamList } from "../../utils/types";
import { HomeRoutes, ProfileRoutes } from "../../utils/routes";
import { useTranslation } from "react-i18next";
import { dummyComments } from "../data/dummyComments";
import { Button } from "../components/Button/Button";

type EventDetailsRouteProp = 
| RouteProp<ProfileStackParamList, ProfileRoutes.EventDetails>
| RouteProp<HomeStackParamList, HomeRoutes.EventDetails>

export function EventDetailsView() {
    const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
    const route = useRoute<EventDetailsRouteProp>();
    const canEdit = route.params?.canEdit || false;

    function getEventDetails(eventId: string){
        return events.find(event => event.eventId === eventId)

        // EventDetailsController(id)
    }

    const event = getEventDetails(route.params?.eventId); 

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <AppHeader title={t("eventDetails.title")} goBack={navigation.goBack} />
                <EventCard 
                    profileImage={event?.profileImage || IMAGE_PLACEHOLDER}
                    username={event?.username || t("common.not_available")}
                    eventImage={event?.eventImage || IMAGE_PLACEHOLDER}
                    title={event?.title || t("common.not_available")}
                    description={event?.description || t("common.not_available")}
                    isLiked={event?.isLiked || false}
                    date={event?.date || t("common.not_available")}
                    variant={EventCardVariant.DETAILS}
                    location={event?.location}
                    startsAt={event?.startsAt}
                    endsAt={event?.endsAt}
                    category={event?.category}
                    onPressUser={() => console.log("USER")}
                    onComment={() => Promise.resolve()}
                    onShare={() => console.log("SHARE")}
                    fetchComments={() => Promise.resolve(dummyComments)}
                />
                {canEdit && 
                    <View style={styles.editButtonContainer}>
                        <Button label={t("eventDetails.edit")} onPress={() => navigation.navigate(ProfileRoutes.EditEvent, { eventId: event?.eventId || "" })} />
                    </View>
                }
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
    },
    editButtonContainer: {
        paddingVertical: 30,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});