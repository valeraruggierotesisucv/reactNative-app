import UserModel from "../models/UserModel";
import { t } from "i18next";
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
            console.error("Error in ProfileController:", error);
            throw new Error(t("error.error_fetching_profile"));
        }
    }

    static async getUserEvents(token:string, userId: string) {
        try {
            const events: Event[] = await UserModel.getUserEvents(token, userId);
            return events;
        } catch (error) {
            console.error("Error in ProfileController:", error);
            throw new Error(t("error.error_fetching_user_events"));
        }
    }

    static async getUserId(token:string, eventId: string){
        try{
            return await UserModel.getUserId(token, eventId)
        }catch(error){
            console.error("Error getting user Id", error);
            throw error;
        }
    }
}
