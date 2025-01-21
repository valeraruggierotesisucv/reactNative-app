import { UserModel } from "../models/UserModel";

export class SearchUserController {

    static async searchUsers(search: string) {
        try {
            const users = await UserModel.searchUsers(search);
            return users;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}