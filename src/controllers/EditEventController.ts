import { EventModel } from "../models/EventModel";

export class EditEventController {
    static async updateEvent(token: string, event: object, eventId: string){
        return await EventModel.updateEvent(token, event, eventId);
    }
}