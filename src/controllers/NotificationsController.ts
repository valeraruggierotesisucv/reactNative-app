import { NotificationModel } from "../models/NotificationModel";

export class NotificationsController{
    static async getNotifications(token: string, userId: string){        
        return await NotificationModel.getNotifications(token, userId); 
    }
}