import { EventModel } from "../models/EventModel";

export class AddEventController {
    static async postEvent(token: string, event : object){
        return await EventModel.createEvent(token, event);     
    }
}