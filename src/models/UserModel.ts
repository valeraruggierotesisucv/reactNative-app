import { apiRequest } from "../../utils/apiRequest";

export class UserModel {
    public userId: string;
    public username: string;
    public fullName: string;
    public email: string;
    public profileImage: string | undefined;
    public birthDate: Date;
    public biography: string | undefined;
    public followersCounter: number;
    public followingCounter: number;
    public eventsCounter: number;
    constructor(
        userId: string,
        username: string,
        fullName: string,
        email: string,
        profileImage: string | undefined,
        birthDate: Date,
        biography: string | undefined,
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
        userId: string;
        username: string;
        fullName: string;
        email: string;
        birthDate: Date;
    }) {
        const response = await apiRequest("signup", "POST", data)
        const user = response.data
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

    async getFollowing() {
        return await apiRequest("users", "GET", { userId: this.userId, following: true });
    }

    async getFollowers() {
        return await apiRequest("users", "GET", { userId: this.userId, followers: true })
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
