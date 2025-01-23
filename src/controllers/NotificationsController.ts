import { NotificationModel } from "../models/NotificationModel";
import UserModel from "../models/UserModel";

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
        const toNotificationToken = await NotificationModel.getNotificationToken(token, data.toUserId); 
        const fromUserProfile = await UserModel.getUserById(data.fromUserId); 

        console.log("Receiver notification token-->", toNotificationToken.data); 

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
    }

    static async updateNotificationToken(token:string, userId: string, notificationToken: string){
        return await NotificationModel.updateNotificationToken(token, userId, notificationToken)
    }

    
}