import UserModel from "../models/UserModel";

export interface Event {
    id: string;
    imageUrl: string;
}

export class ProfileController {
    static async getProfile(userId: string) {
        try {
            const user = await UserModel.getUserById(userId);
            return user;
        } catch (error) {
            console.error("Error fetching profile", error);
            throw error;
        }
    }

    static async getUserEvents(userId: string) {
        try {
            const events: Event[] = await UserModel.getUserEvents(userId);
            return events;
        } catch (error) {
            console.error("Error fetching events", error);
            throw error;
        }
    }
}
