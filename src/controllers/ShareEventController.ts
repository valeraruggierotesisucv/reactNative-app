import { Share } from "react-native";

export class ShareEventController {

    static async shareEvent(message: string) {
        try {
            const result = await Share.share({
              message: message,
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error: any) {
            console.log(error);
          }
    }
}