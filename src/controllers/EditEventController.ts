import { EventModel } from "../models/EventModel";
import { t } from "i18next";
export class EditEventController {
    static async updateEvent(token: string, event: object, eventId: string){
        try {
            return await EventModel.updateEvent(token, event, eventId);
        } catch (error) {
            console.error("Error in EditEventController:", error);
            throw new Error(t("error.error_updating_event"));
        }
    }
}