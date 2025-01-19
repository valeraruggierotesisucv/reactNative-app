import { apiRequest } from "../../utils/apiRequest";
import { formatHour } from "../../utils/formatHour";
import { truncateString } from "../../utils/formatString";
export class EventModel {
    eventId: string; 
    profileImage: string; 
    username: string; 
    eventImage: string; 
    title: string; 
    description: string; 
    latitude: string; 
    longitude: string; 
    startsAt: string; 
    endsAt: string; 
    date: string; 
    category: string; 
    categoryId: string; 
    musicUrl: string; 
    isLiked: boolean; 
    userId: string;

    constructor(
        eventId: string, 
        profileImage: string, 
        username: string, 
        eventImage: string, 
        title: string, 
        description: string, 
        latitude: string, 
        longitude: string, 
        startsAt: string, 
        endsAt: string, 
        date: string, 
        category: string, 
        categoryId: string, 
        musicUrl: string, 
        isLiked: boolean, 
        userId: string
    ){
        this.eventId = eventId, 
        this.profileImage = profileImage, 
        this.username = username, 
        this.eventImage = eventImage, 
        this.title = title, 
        this.description = description, 
        this.latitude = latitude, 
        this.longitude = longitude, 
        this.startsAt = startsAt,
        this.endsAt = endsAt, 
        this.date = date, 
        this.category = category, 
        this.categoryId = categoryId, 
        this.musicUrl = musicUrl, 
        this.isLiked = isLiked,
        this.userId = userId
    }

    // POST api/events
    static async createEvent(token: string, event: object){
        return await apiRequest(
            "events", 
            "POST", 
            event, 
            token
        )
    }

    static async updateEvent(token: string, event: object, eventId: string){
        try{
            return await apiRequest(
                `events/${eventId}`, 
                "POST", 
                event, 
                token
            ); 
        }catch(error){
            console.log(error)
        }
    }

    // GET api/home/:userId/events
    static async getHomeEvents(token: string, userId: string){
        try{
            const { data } = await apiRequest(
                `home/${userId}/events`, 
                "GET", 
                undefined, 
                token            
            )
            
            const events = data.map((event : any) => {
                const date = new Date(event.date).toLocaleDateString(); 
                return new EventModel(
                    event.eventId, 
                    event.user.profileImage, 
                    event.user.username, 
                    event.eventImage, 
                    event.title,  
                    event.description,  
                    event.location.latitude, 
                    event.location.longitude, 
                    event.startsAt, 
                    event.endsAt, 
                    date, 
                    event.category, 
                    event.categoryId, 
                    event.eventMusic, 
                    false, // TODO: FALTA LIKE 
                    event.user.userId
                )
            })
            
            return events
        }catch(error){
            console.error("Error fetching events: ", error);
            throw error;
        }
        
    }

    // GET api/events/:eventId
    static async getEventDetails(token: string, eventId: string) {
        try {
          const { data: event } = await apiRequest(`events/${eventId}`, "GET", undefined, token);
          const date = new Date(event.date).toLocaleDateString();
          const startsAt = formatHour(new Date(event.startsAt)); 
          const endsAt = formatHour(new Date(event.endsAt)); 
                
          return new EventModel(
            event.eventId,
            event.user.profileImage,
            event.user.username,
            event.eventImage,
            event.title,
            event.description,
            event.location.latitude,
            event.location.longitude,
            startsAt,
            endsAt,
            date,
            event.category.nameEs,
            event.categoryId, 
            event.eventMusic,
            false, // TODO: FALTA LIKE
            event.user.userId
          );
        } catch (error) {
          console.error("Error fetching event details:", error);
          return null; 
        }
    }    
}