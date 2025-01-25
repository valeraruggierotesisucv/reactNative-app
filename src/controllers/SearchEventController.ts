import { EventModel } from "../models/EventModel";
import { t } from "i18next";
export class SearchEventController {
    static async searchEvents(token: string, search: string, userId: string) {
        try {
            const events = await EventModel.searchEvents(token, search, userId);
            return events;
        } catch (error) {
            console.error("Error in SearchEventController:", error);
            throw new Error(t("error.error_fetching_events"));
        }
    }
}