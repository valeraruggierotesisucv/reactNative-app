import { EventModel } from "../models/EventModel";

export class EventDetailsController{
    static async getEventDetails(token: string, eventId: string){
        return await EventModel.getEventDetails(token, eventId); 
    }
}