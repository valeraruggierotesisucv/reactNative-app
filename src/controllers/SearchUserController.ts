import { UserModel } from "../models/UserModel";

export class SearchUserController {

    static async searchUsers(token: string, search: string) {
        try {
            const users = await UserModel.searchUsers(token, search);
            return users;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}