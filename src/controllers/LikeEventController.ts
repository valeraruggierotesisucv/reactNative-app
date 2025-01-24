// SocialInteractionModel.likeEvent 

import { SocialInteractionModel } from "../models/SocialInteractionModel";

export class LikeEventController {
    static async likeEvent(token: string, eventId: string, userId: string) {
        try {
            const response = await SocialInteractionModel.likeEvent(token, eventId, userId);
            return response;
        } catch (error) {
            console.error("Error in likeEvent:", error);
            throw error;
        }
    }
}
