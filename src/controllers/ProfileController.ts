import UserModel from "../models/UserModel";

export interface Event {
    id: string;
    imageUrl: string;
}

export class ProfileController {
    static async getProfile(userId: string) {
        const user = await UserModel.getUserById(userId);

        return user;
    }

    static async getUserEvents(userId: string) {
        const events: Event[] = await UserModel.getUserEvents(userId);
        return events;
    }
}
