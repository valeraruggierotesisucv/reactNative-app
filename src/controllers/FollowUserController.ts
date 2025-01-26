import { FollowUserModel } from "../models/FollowUserModel";
import { t } from "i18next";
export class FollowUserController {
  
  static async isFollowing(token: string, userId: string, targetUserId: string) {
    try {
      const response = await FollowUserModel.isFollowing(token, userId, targetUserId);
      return {
        isFollowing: response.isActive,
        userIdFollows: response.userIdFollows,
        userIdFollowedBy: response.userIdFollowedBy,
      }
      
    } catch (error) {
      console.error("Error in FollowUserController:", error);
      throw new Error(t("error.error_fetching_profile"));
    }
  }

  static async followUser(token:string, userId: string, targetUserId: string) {
    try {
      const response = await FollowUserModel.followUser(token, userId, targetUserId);
      let message = "Usuario seguido correctamente";
      let success = true;
      
      if(!response.success){
        message = "Error al seguir al usuario";
        success = false;
      }
      return {
        message,
        success,
      };
    } catch (error) {
      console.error("Error in FollowUserController:", error);
      throw new Error(t("error.error_following_user"));
    }
  }

  static async unfollowUser(token:string, userId: string, targetUserId: string) {
    try {
      const response = await FollowUserModel.unfollowUser(token, userId, targetUserId);
      let message = "Usuario dejado de seguir correctamente";
      let success = true;
      if(!response.success){
        message = "Error al dejar de seguir al usuario";
        success = false;
      }
      return {
        message,
        success,
      };
    } catch (error) {
      console.error("Error in FollowUserController:", error);
      throw new Error(t("error.error_unfollowing_user"));
    }
  }
}

