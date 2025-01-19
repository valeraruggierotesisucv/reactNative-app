// FollowUserModel.follow
// FollowUserModel.unfollow

export class FollowUserController {
  static async followUser(userId: string) {
    try {
    //   const response = await FollowUserModel.follow(userId);
    //   return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async unfollowUser(userId: string) {
    try {
    //   const response = await FollowUserModel.unfollow(userId);
    //   return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

