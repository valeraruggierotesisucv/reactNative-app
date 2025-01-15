import { getServer } from "../../utils/getServer";
import { useAuth } from "../contexts/AuthContext";
import { EventModel } from "../models/EventModel";

export class AddEventController{
    static async postEvent(token: string, event : object){
        const createdEvent = await EventModel.createEvent(token, event); 
        console.log("result-->", createdEvent)        
    }
}