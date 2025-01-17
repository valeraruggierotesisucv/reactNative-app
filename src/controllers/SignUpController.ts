// UserModel.createUser


import {UserModel} from "../models/UserModel";
export class SignUpController {
    static async signUp({userId, username, fullName, email, birthDate}: {userId: string, username: string, fullName: string, email: string, birthDate: Date}) {
        try {
            const registeredUser = await UserModel.createUser({userId, username, fullName, email, birthDate});
            return registeredUser;
        } catch (error) {
            throw error
        }
    }
}
