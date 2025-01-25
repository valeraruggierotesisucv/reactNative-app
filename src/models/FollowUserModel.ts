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

    static async isFollowing(token:string, userId: string, targetUserId: string) {
        try {
            const response = await apiRequest(`users/${userId}/isFollowing/${targetUserId}`, "GET", undefined, token);
            return {
                userIdFollows: response?.data?.userIdFollows,
                userIdFollowedBy: response?.data?.userIdFollowedBy,
                isActive: response?.data?.isActive,
            };
        } catch (error) {
            console.error("Error checking if user is following: ", error);
            throw new Error("Failed to check if user is following.");
        }
    }

    static async followUser(token:string, userIdFollows: string, userIdFollowedBy: string) {
        try {
            const response = await apiRequest(`users/${userIdFollows}/follow/${userIdFollowedBy}`, "POST", undefined, token);
            return response;
        } catch (error) {
            console.error("Error following user: ", error);
            throw new Error("Failed to follow user.");
        }
    }

    static async unfollowUser(token:string, userIdFollows: string, userIdFollowedBy: string) {
        try {
            const response = await apiRequest(`users/${userIdFollows}/unfollow/${userIdFollowedBy}`, "DELETE", undefined, token);
            return response;
        } catch (error) {
            console.error("Error unfollowing user: ", error);
            throw new Error("Failed to unfollow user.");
        }
    }
}