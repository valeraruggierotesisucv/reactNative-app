// SocialInteractionModel.likeEvent 

import { SocialInteractionModel } from "../models/SocialInteractionModel";

export class LikeEventController {
    static async likeEvent(accessToken: string, eventId: string, userId: string) {
        try {
            const response = await SocialInteractionModel.likeEvent(accessToken, eventId, userId);
            return response;
        } catch (error) {
            console.error("Error in likeEvent:", error);
            throw error;
        }
    }
}
