import { EventModel } from "../models/EventModel";

export class SearchEventController {
    static async searchEvents(token: string, search: string, userId: string) {
        try {
            const events = await EventModel.searchEvents(token, search, userId);
            return events;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}