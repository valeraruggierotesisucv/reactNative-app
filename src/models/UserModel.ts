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
        try {
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
        } catch (error) {
            console.error("Error creating user: ", error);
            throw new Error("Failed to create user.");
        }
    }

    static async getUserById(token:string, userId: string) {
        try {
            const response = await apiRequest(`users/${userId}`, "GET", undefined, token);
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
        } catch (error) {
            console.error("Error fetching user by id: ", error);
            throw new Error("Failed to fetch user by id.");
        }
    }

    static async updateProfile(token:string, userId: string, data: {
        fullName: string;
        profileImage?: string;
        biography?: string;
    }) {
        try {
            const updatedUser = await apiRequest(`users/${userId}`, "PUT", data, token);
            if(!updatedUser.data) throw new Error('Failed to update profile');
            return updatedUser.data;
        } catch (error) {
            console.error("Error updating profile: ", error);
            throw new Error("Failed to update profile.");
        }

    }

    static async getFollowed(token:string, userId: string) {
        try {
            const response = await apiRequest(`users/${userId}/followed`, "GET", undefined, token);
            const followed = response.data.map((follow: any) => ({
                followedId: follow.followedId,
                followedName: follow.followedName,
                followedProfileImage: follow.followedProfileImage,
                followed: follow.followed
            }));
            return followed;
        } catch (error) {
            console.error("Error fetching followed: ", error);
            throw new Error("Failed to fetch followed.");
        }
    }

    static async getFollowers(token:string, userId: string) {
        try {
            const response = await apiRequest(`users/${userId}/followers`, "GET", undefined, token);
            const followers = response.data.map((follower: any) => ({
                followerId: follower.followerId,
                followerName: follower.followerName,
                followerProfileImage: follower.followerProfileImage,
                followed: follower.followed
            }));
            return followers;
        } catch (error) {
            console.error("Error fetching followers: ", error);
            throw new Error("Failed to fetch followers.");
        }
    }

    static async getUserEvents(token:string, userId: string) {
        try {
            const response = await apiRequest(`users/${userId}/events`, "GET", undefined, token)
            return response.data.map((event: any) => ({
                id: event.eventId,
                imageUrl: event.eventImage,
            }));
        } catch (error) {
            console.error("Error fetching user events: ", error);
            throw new Error("Failed to fetch user events.");
        }
    }

    static async searchUsers(token:string, search: string) {
        try {
            const response = await apiRequest("search/users", "POST", { search }, token)
            return response.data.map((user: any) => ({
                userId: user.userId,
                username: user.username,
                profileImage: user.profileImage,
            }));
        } catch (error) {
            console.error("Error searching users: ", error);
            throw new Error("Failed to search users.");
        }
    }

    static async getUserId(token:string, eventId:string){
        try{
            return await apiRequest(`user-event/${eventId}`, "GET", undefined, token)
        }catch(error){
            throw error;
        }
    }
}

export default UserModel;
