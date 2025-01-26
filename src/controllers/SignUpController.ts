import {UserModel} from "../models/UserModel";
import { t } from "i18next";
export class SignUpController {
    static async signUp({userId, username, fullName, email, birthDate}: {userId: string, username: string, fullName: string, email: string, birthDate: Date}) {
        try {
            const registeredUser = await UserModel.createUser({userId, username, fullName, email, birthDate});
            return registeredUser;
        } catch (error) {
            console.error("Error in SignUpController:", error);
            throw new Error(t("error.error_creating_user"));
        }
    }
}
