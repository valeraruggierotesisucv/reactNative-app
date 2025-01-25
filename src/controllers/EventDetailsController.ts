import { EventModel } from "../models/EventModel";
import { t } from "i18next";
export class EventDetailsController {
    static async getEventDetails(token: string, eventId: string, userId: string) {
        try {
            return await EventModel.getEventDetails(token, eventId, userId);
        } catch (error) {
            console.error("Error in EventDetailsController:", error);
            throw new Error(t("error.error_fetching_event_details"));
        }
    }
}