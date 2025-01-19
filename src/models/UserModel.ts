import { apiRequest } from "../../utils/apiRequest";

class UserModel {
    public userId: string;
    public username: string;
    public fullName: string;
    public email: string;
    public profileImage: string | null;
    public birthDate: Date;
    public biography: string | null;
    public followersCounter: number;
    public followingCounter: number;
    public eventsCounter: number;
    constructor(
        userId: string,
        username: string,
        fullName: string,
        email: string,
        profileImage: string | null,
        birthDate: Date,
        biography: string | null,
        followersCounter: number,
        followingCounter: number,
        eventsCounter: number
    ) {
        this.userId = userId;
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.profileImage = profileImage;
        this.birthDate = birthDate;
        this.biography = biography;
        this.followersCounter = followersCounter;
        this.followingCounter = followingCounter;
        this.eventsCounter = eventsCounter;
    }

    static async createUser(data: {
        username: string;
        fullName: string;
        email: string;
        profileImage?: string;
        birthDate: Date;
        biography?: string;
    }) {
        const user = await apiRequest("users", "POST", data)
        return new UserModel(
            user.userId,
            user.username,
            user.fullName,
            user.email,
            user.profileImage,
            user.birthDate,
            user.biography,
            user.followers_counter,
            user.following_counter,
            user.events_counter
        );
    }

    static async getUserById(userId: string) {
        const response = await apiRequest("users/" + userId, "GET");
        if (!response.data) throw new Error('User not found');
        const user = response.data;
        return new UserModel(
            user.userId,
            user.username,
            user.fullName,
            user.email,
            user.profileImage,
            user.birthDate,
            user.biography,
            user.followers_counter,
            user.following_counter,
            user.events_counter
        );
    }

    static async updateProfile(userId: string, data: {
        fullName: string;
        profileImage?: string;
        biography?: string;
    }) {
        try {
            const updatedUser = await apiRequest("users/" + userId, "PUT", data);
            if(!updatedUser.data) throw new Error('Failed to update profile');
            return updatedUser.data;
        } catch (error) {
            throw error;
        }

    }

    static async getFollowed(userId: string) {
        try {
            const response = await apiRequest("users/" + userId + "/followed", "GET");
            const followed = response.data.map((follow: any) => ({
                followedId: follow.followedId,
                followedName: follow.followedName,
                followedProfileImage: follow.followedProfileImage,
                followed: follow.followed
            }));
            return followed;
        } catch (error) {
            throw error;
        }
    }

    static async getFollowers(userId: string) {
        try {
            const response = await apiRequest("users/" + userId + "/followers", "GET");
            const followers = response.data.map((follower: any) => ({
                followerId: follower.followerId,
                followerName: follower.followerName,
                followerProfileImage: follower.followerProfileImage,
                followed: follower.followed
            }));
            return followers;
        } catch (error) {
            throw error;
        }
    }

    static async getUserEvents(userId: string) {
        const response = await apiRequest("users/" + userId + "/events", "GET")
        console.log(response.data);
        return response.data.map((event: any) => ({
            id: event.eventId,
            imageUrl: event.eventImage,
        }));
    }

}

// getProfile
// editProfile 
// getFollowers
// getFollowing 
// createUser

export default UserModel;