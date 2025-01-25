import { apiRequest } from "../../utils/apiRequest";
import { NotificationType } from "../components/NotificationItem/NotificationItem";

export class NotificationModel{
    user: string;
    userAvatar: string;
    timestamp: Date;
    type: NotificationType;
    eventImage?: string; 
    
    constructor(user: string, userAvatar: string, timestamp: Date, type: NotificationType, eventImage: string) {
        this.user = user;
        this.timestamp = timestamp;
        this.userAvatar = userAvatar;
        this.type = type;
        this.eventImage = eventImage
    }

    // POST api/notifications
    static async createNotification(token: string, data: object){
        try{
            return await apiRequest(
                `notifications`, 
                "POST", 
                data, 
                token
            ) 
        }catch(error){
            console.error("Error creating notification: ", error);
            throw new Error("Failed to create notification.");
        }
        
    }

    // GET /api/users/:userId/notifications
    static async getNotifications(token: string, userId: string){       
        try {
            const { data } = await apiRequest(
                `users/${userId}/notifications`, 
                "GET", 
                undefined, 
                token
            )

        const notifications = data.map((item: any) => {
            const { notification, userData } = item;
            
            return new NotificationModel(
                userData.username,                                
                userData.profileImage,              
                new Date(notification.createdAt),  
                notification.type, 
                notification.eventImage                  
                );
            });

            return notifications
        } catch (error) {
            console.error("Error fetching notifications: ", error);
            throw new Error("Failed to fetch notifications.");
        }
    }

    // GET /api/users/:userId/push-notification
    static async getNotificationToken(token: string, toUserId: string){
        try{
            const toNotificationToken = await apiRequest(
                `users/${toUserId}/push-notification`, 
                "GET", 
                undefined, 
                token
            )

            return toNotificationToken
        }catch(error){
            console.error("Error fetching notification token: ", error);
            throw new Error("Failed to fetch notification token.");
        }
    }

    // POST /api/users/:userId/notifications/:notificationToken
    static async updateNotificationToken(token: string, userId: string, notificationToken: string){
        try{
            return await apiRequest(
                `users/${userId}/notifications/${notificationToken}`, 
                "PUT", 
                undefined, 
                token
            )
        }catch(error){
            console.error("Error updating notification token: ", error);
            throw new Error("Failed to update notification token.");
        }
    }

    // api/notifications/:notificationToken
    static async sendNotification(token: string, toNotificationToken: string, data: {
        title: string, 
        body: string
    }){
        try{
            return await apiRequest(
                `push-notifications/${toNotificationToken}`, 
                "POST", 
                data, 
                token
            )
        }catch(error){
            console.error("Error sending notification: ", error);
            throw new Error("Failed to send notification.");
        }
    }
}