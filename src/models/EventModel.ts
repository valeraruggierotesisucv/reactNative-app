import { apiRequest } from "../../utils/apiRequest";
export class EventModel {
    static async createEvent(token: string, event: object){
        return await apiRequest(
            "events", 
            "POST", 
            event, 
            token
        )
    }

    // GET api/events/:eventId
    static getEventDetails(){}

    // GET api/home/events
    static getHomeEvents(){}
}