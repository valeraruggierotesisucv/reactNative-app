import { apiRequest } from "../../utils/apiRequest";
import { getServer } from "../../utils/getServer";

export class EventModel {
    constructor(){

    }

    // POST api/events
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