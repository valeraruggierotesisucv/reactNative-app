import { EventModel } from "../models/EventModel";
import { t } from "i18next";
export class ListEventsController{
    static async getHomeEvents(token: string, userId: string){
        try{
            return await EventModel.getHomeEvents(token, userId)
        }catch(error){
            console.error("Error in ListEventsController:", error);
            throw new Error(t("error.error_fetching_events"));
        }
    }
}