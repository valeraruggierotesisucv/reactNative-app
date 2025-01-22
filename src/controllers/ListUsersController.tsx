import UserModel from "../models/UserModel";

export class ListUsersController {
  static async getFollowers(token:string, userId: string) {
    try {
      const response: { followerId: string, followerName: string, followerProfileImage: string, followed: boolean }[] = await UserModel.getFollowers(token, userId);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getFollowed(token:string, userId: string) {
    try {
      const response: { followedId: string, followedName: string, followedProfileImage: string, followed: boolean }[] = await UserModel.getFollowed(token, userId);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
