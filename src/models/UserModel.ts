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
        console.log(user);
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

    async updateProfile(data: {
        fullName?: string;
        profileImage?: string;
        biography?: string;
    }) {
        const updatedUser = await apiRequest("users", "PUT", data, this.userId);
        this.fullName = updatedUser.fullName;
        this.profileImage = updatedUser.profileImage;
        this.biography = updatedUser.biography;
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