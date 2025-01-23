import UserModel from "../models/UserModel";

export interface Event {
    id: string;
    imageUrl: string;
}

export class ProfileController {
    static async getProfile(token: string, userId: string) {
        try {
            const user = await UserModel.getUserById(token, userId);
            return user;
        } catch (error) {
            console.error("Error fetching profile", error);
            throw error;
        }
    }

    static async getUserEvents(token:string, userId: string) {
        try {
            const events: Event[] = await UserModel.getUserEvents(token, userId);
            return events;
        } catch (error) {
            console.error("Error fetching events", error);
            throw error;
        }
    }
}
