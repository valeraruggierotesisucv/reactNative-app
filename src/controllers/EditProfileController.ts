// UserModel.editProfile

import UserModel from "../models/UserModel";

export class EditProfileController {
    static async getProfile(userId: string) {
        try {
            const response = await UserModel.getUserById(userId);

            return {
                fullName: response.fullName,
                profileImage: response.profileImage,
                biography: response.biography
            }
        } catch (error) {
            throw error;
        }
    }
    static async updateProfile(userId: string, data: {
        fullName: string;
        profileImage?: string;
        biography?: string;
    }) {
        try {
            return await UserModel.updateProfile(userId, data);
        } catch (error) {
            throw error;
        }
    }
}

