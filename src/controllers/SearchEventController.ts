import { EventModel } from "../models/EventModel";

export class SearchEventController {
    static async searchEvents(search: string) {
        try {
            const events = await EventModel.searchEvents(search);
            return events;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}