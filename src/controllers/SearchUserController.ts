import { UserModel } from "../models/UserModel";
import { t } from "i18next";
export class SearchUserController {

    static async searchUsers(token: string, search: string) {
        try {
            const users = await UserModel.searchUsers(token, search);
            return users;
        } catch (error) {
            console.error("Error in SearchUserController:", error);
            throw new Error(t("error.error_fetching_users"));
        }
    }
}