import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader/AppHeader";
import {
  useNavigation,
  useRoute,
  NavigationProp,
} from "@react-navigation/native";
import { EventCard, EventCardVariant } from "../components/EventCard/EventCard";
import { IMAGE_PLACEHOLDER } from "../../utils/consts";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList, ProfileStackParamList } from "../../utils/types";
import { HomeRoutes, ProfileRoutes } from "../../utils/routes";
import { useTranslation } from "react-i18next";
import { dummyComments } from "../data/dummyComments";
import { Button } from "../components/Button/Button";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { EventDetailsController } from "../controllers/EventDetailsController";
import { EventModel } from "../models/EventModel";

type EventDetailsRouteProp =
  | RouteProp<ProfileStackParamList, ProfileRoutes.EventDetails>
  | RouteProp<HomeStackParamList, HomeRoutes.EventDetails>;

export function EventDetailsView() {
  const { t } = useTranslation();
  const {session, user } = useAuth(); 
  const [event, setEvent] = useState<EventModel | null >(null); 
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
  const route = useRoute<EventDetailsRouteProp>();
  const canEdit = route.params?.canEdit || false;
 
  useEffect(() => {
    async function fetchEventDetails(){
      if(session && user){
        console.log("fetching event details..")
        const result = await EventDetailsController.getEventDetails(session.access_token, route.params?.eventId); 
        console.log(result)
        setEvent(result)
      }
    }

    fetchEventDetails()
  }, [])

  return (
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
          latitude={event?.latitude}
          longitude={event?.longitude}
          startsAt={event?.startsAt}
          endsAt={event?.endsAt}
          category={event?.category}
          onPressUser={() => console.log("USER")}
          onComment={() => Promise.resolve()}
          onShare={() => console.log("SHARE")}
          fetchComments={() => Promise.resolve(dummyComments)}
          musicUrl={event?.musicUrl}
        />
        {canEdit && (
          <View style={styles.editButtonContainer}>
            <Button
              label={t("eventDetails.edit")}
              onPress={() =>
                navigation.navigate(ProfileRoutes.EditEvent, {
                  eventId: event?.eventId || "",
                })
              }
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
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
