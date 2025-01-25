import UserModel from "../models/UserModel";
import { t } from "i18next";
export class EditProfileController {
    static async getProfile(token:string, userId: string) {
        try {
            const response = await UserModel.getUserById(token, userId);

            return {
                fullName: response.fullName,
                profileImage: response.profileImage,
                biography: response.biography
            }
        } catch (error) {
            console.error("Error in EditProfileController:", error);
            throw new Error(t("error.error_fetching_profile"));
        }
    }
    static async updateProfile(token:string, userId: string, data: {
        fullName: string;
        profileImage?: string;
        biography?: string;
    }) {
        try {
            return await UserModel.updateProfile(token, userId, data);
        } catch (error) {
            console.error("Error in EditProfileController:", error);
            throw new Error(t("error.error_updating_profile"));
        }
    }
}

