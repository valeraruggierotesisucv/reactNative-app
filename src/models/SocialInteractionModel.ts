// likeEvent
// /api/events/:eventId/like

import { apiRequest } from "../../utils/apiRequest";

export class SocialInteractionModel {
    static async likeEvent(eventId: string, userId: string) {
        try {
            const response = await apiRequest(`events/${eventId}/like`, "POST", { userId });
            return response;
        } catch (error) {
            console.error("Error in likeEvent:", error);
            throw error; // Just throw the original error
        }
    }
}