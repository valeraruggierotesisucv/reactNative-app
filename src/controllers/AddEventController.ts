import { EventModel } from "../models/EventModel";
import { t } from "i18next";
export class AddEventController {
    static async postEvent(token: string, event : object){
        try {
            return await EventModel.createEvent(token, event);     
        } catch (error) {
            console.error("Error in AddEventController:", error);
            throw new Error(t("error.error_creating_event"));
        }
    }
}