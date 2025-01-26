import { apiRequest } from "../../utils/apiRequest";

export class SocialInteractionModel {
  userId: string;
  eventId: string;
  createdAt: Date;
  isActive: boolean;

  constructor(
    userId: string,
    eventId: string,
    createdAt: Date,
    isActive: boolean
  ) {
    this.userId = userId;
    this.eventId = eventId;
    this.createdAt = createdAt;
    this.isActive = isActive;
  }

  static async likeEvent(
    token: string,
    eventId: string,
    userId: string
  ): Promise<SocialInteractionModel> {
    try {
      const response = await apiRequest(
        `events/${eventId}/like`,
        "POST",
        { userId },
        token
      );
      return new SocialInteractionModel(
        response.data.userId,
        response.data.eventId,
        response.data.createdAt,
        response.data.isActive
      );
    } catch (error) {
      console.error("Error in likeEvent:", error);
      throw new Error("Failed to like event.");
    }
  }
}
