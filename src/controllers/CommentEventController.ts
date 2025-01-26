import { CommentModel } from "../models/CommentModel";
import { t } from "i18next";
export class CommentEventController{

    static async createComment(token: string, eventId: string, data: {
        userId: string, 
        text: string 
        }){
        try {
            return await CommentModel.createComment(token, eventId, data); 
        } catch (error) {
            console.error("Error in CommentEventController:", error);
            throw new Error(t("error.error_creating_comment"));
        }
    }

    static async getEventComments(token: string, eventId: string){
        try {
            return await CommentModel.getEventComments(token, eventId); 
        } catch (error) {
            console.error("Error in CommentEventController:", error);
            throw new Error(t("error.error_fetching_comments"));
        }
    }
}