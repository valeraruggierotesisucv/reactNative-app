import { EventModel } from "../models/EventModel";

export class ListEventsController{
    static async getHomeEvents(token: string, userId: string){
        try{
            const response = await EventModel.getHomeEvents(token, userId)
            
            return response;
        }catch(error){
            throw error;
        }
    }
}