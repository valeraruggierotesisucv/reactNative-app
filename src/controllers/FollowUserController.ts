import { FollowUserModel } from "../models/FollowUserModel";

export class FollowUserController {
  
  static async isFollowing(token: string, userId: string, targetUserId: string) {
    try {
      const response = await FollowUserModel.isFollowing(token, userId, targetUserId);
      console.log("response del controller", response);
      return {
        isFollowing: response.isActive,
        userIdFollows: response.userIdFollows,
        userIdFollowedBy: response.userIdFollowedBy,
      }
      
    } catch (error) {
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
    }
  }
}

