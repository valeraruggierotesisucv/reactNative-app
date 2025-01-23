import UserModel from "../models/UserModel";

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
            throw error;
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
            throw error;
        }
    }
}

