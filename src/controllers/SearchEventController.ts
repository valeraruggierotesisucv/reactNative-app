import { EventModel } from "../models/EventModel";

export class SearchEventController {
    static async searchEvents(token:string, search: string) {
        try {
            const events = await EventModel.searchEvents(token, search);
            return events;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}