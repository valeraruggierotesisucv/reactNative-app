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
            console.log(error)
        }
        
    }

    // GET /api/users/:userId/notifications
    static async getNotifications(token: string, userId: string){       
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
            console.log(error)
        }
    }
}