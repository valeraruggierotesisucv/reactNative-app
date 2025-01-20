import { CommentModel } from "../models/CommentModel";

export class CommentEventController{

    static async createComment(token: string, eventId: string, data: {
        userId: string, 
        text: string 
        }){
        try {
            return await CommentModel.createComment(token, eventId, data); 
        } catch (error) {
            console.error("Error creating comment", error);
            throw error;
        }
    }

    static async getEventComments(token: string, eventId: string){
        try {
            return await CommentModel.getEventComments(token, eventId); 
        } catch (error) {
            console.error("Error getting event comments", error);
            throw error;
        }
    }
}