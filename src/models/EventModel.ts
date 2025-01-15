import { apiRequest } from "../../utils/apiRequest";
export class EventModel {
    static async createEvent(token: string, event: object){
        const createdEvent = await apiRequest(
            "events", 
            "POST", 
            event, 
            token
        )

        return createdEvent
    }

    // GET api/events/:eventId
    static getEventDetails(){}

    // GET api/home/events
    static getHomeEvents(){}
}