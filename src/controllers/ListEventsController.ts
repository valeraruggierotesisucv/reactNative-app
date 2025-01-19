// EventModel.getEvents

import { EventModel } from "../models/EventModel";

export class ListEventsController{
    static async getHomeEvents(token: string, userId: string){
        try {
            return await EventModel.getHomeEvents(token, userId)
        } catch (error) {
            throw error;
        }
    }
}