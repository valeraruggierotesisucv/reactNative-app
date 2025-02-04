import { NotificationModel } from "../models/NotificationModel";
import UserModel from "../models/UserModel";
import { t } from "i18next";

export class NotificationsController{
    static async getNotifications(token: string, userId: string){        
        return await NotificationModel.getNotifications(token, userId); 
    }

    static async createNotification(token: string, data: {
        fromUserId: string, 
        toUserId: string, 
        type:  string, 
        message: string
    }){
        try{
            const toNotificationToken = await NotificationModel.getNotificationToken(token, data.toUserId); 
            const fromUserProfile = await UserModel.getUserById(token, data.fromUserId); 

            // send push notification
            if(toNotificationToken){
                const result = await NotificationModel.sendNotification(token, toNotificationToken.data, {
                    "title": fromUserProfile.username, 
                    "body": data.message
                })
                console.log(result)
            }

            // create notification 
            return await NotificationModel.createNotification(token, data);        

        }catch(error){
            console.error("Error in NotificationsController:", error);
            throw new Error(t("error.error_creating_notification"));
        }
    }

    static async updateNotificationToken(token:string, userId: string, notificationToken: string){
        try{
            return await NotificationModel.updateNotificationToken(token, userId, notificationToken)
        }catch(error){
            console.error("Error in NotificationsController:", error);
            throw new Error(t("error.error_updating_notification_token"));
        }
    }

    
}