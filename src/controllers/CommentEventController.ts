import { CommentModel } from "../models/CommentModel";

// CommentModel.createComment()
export class CommentEventController{

    static async createComment(token: string, eventId: string, data: {
        userId: string, 
        text: string 
        }){
        return await CommentModel.createComment(token, eventId, data); 
    }

    static async getEventComments(token: string, eventId: string){
        return await CommentModel.getEventComments(token, eventId); 
    }
}