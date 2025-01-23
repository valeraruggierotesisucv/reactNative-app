import { NotificationModel } from "../models/NotificationModel";

export class NotificationsController{
    static async getNotifications(token: string, userId: string){        
        return await NotificationModel.getNotifications(token, userId); 
    }

    static async createNotification(token: string, data: object){
        return await NotificationModel.createNotification(token, data);        
    }

    static async updateNotificationToken(token:string, userId: string, notificationToken: string){
        return await NotificationModel.updateNotificationToken(token, userId, notificationToken)
    }
}