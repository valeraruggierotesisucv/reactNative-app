import { apiRequest } from "../../utils/apiRequest";
import { NotificationType } from "../components/NotificationItem/NotificationItem";

export class NotificationModel{
    user: string;
    userAvatar: string;
    timestamp: Date;
    type: NotificationType;
    // TODO: falta imageUrl 
    
    constructor(user: string, userAvatar: string, timestamp: Date, type: NotificationType) {
        this.user = user;
        this.timestamp = timestamp;
        this.userAvatar = userAvatar;
        this.type = type;
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
                notification.type                   
            );
        });

        return notifications
    }
}