import { SocialInteractionModel } from "../models/SocialInteractionModel";
import { t } from "i18next";
export class LikeEventController {
    static async likeEvent(token: string, eventId: string, userId: string) {
        try {
            return await SocialInteractionModel.likeEvent(token, eventId, userId);
        } catch (error) {
            console.error("Error in LikeEventController:", error);
            throw new Error(t("error.error_liking_event"));
        }
    }
}
