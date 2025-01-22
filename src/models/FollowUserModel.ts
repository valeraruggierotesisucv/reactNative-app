import { apiRequest } from "../../utils/apiRequest";

export class FollowUserModel {
    public userIdFollows: string;
    public userIdFollowedBy: string;
    public createdAt: Date;

    constructor(userIdFollows: string, userIdFollowedBy: string, createdAt: Date) {
        this.userIdFollows = userIdFollows;
        this.userIdFollowedBy = userIdFollowedBy;
        this.createdAt = createdAt;
    }

    static async isFollowing(userId: string, targetUserId: string) {
        try {
            const response = await apiRequest(`users/${userId}/isFollowing/${targetUserId}`, "GET");
            return {
                userIdFollows: response?.data?.userIdFollows,
                userIdFollowedBy: response?.data?.userIdFollowedBy,
                isActive: response?.data?.isActive,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async followUser(userIdFollows: string, userIdFollowedBy: string) {
        try {
            const response = await apiRequest(`users/${userIdFollows}/follow/${userIdFollowedBy}`, "POST");
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async unfollowUser(userIdFollows: string, userIdFollowedBy: string) {
        try {
            const response = await apiRequest(`users/${userIdFollows}/unfollow/${userIdFollowedBy}`, "DELETE");
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}