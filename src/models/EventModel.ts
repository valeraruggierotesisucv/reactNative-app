import { apiRequest } from "../../utils/apiRequest";
import { formatHour } from "../../utils/formatHour";
export class EventModel {
    eventId: string; 
    profileImage: string; 
    username: string; 
    eventImage: string; 
    title: string; 
    description: string; 
    locationId: string; 
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
        locationId: string, 
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
        this.locationId = locationId, 
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
        try{
            return await apiRequest(
                "events", 
                "POST", 
                event, 
                token
            )
        }catch(error){
            console.error("Error creating event: ", error);
            throw new Error("Failed to create event.");
        }
    }

    // POST api/events/:eventId
    static async updateEvent(token: string, event: object, eventId: string){
        try{
            return await apiRequest(
                `events/${eventId}`, 
                "PUT", 
                event, 
                token
            ); 
        }catch(error){
            console.error("Error updating event: ", error);
            throw new Error("Failed to update event.");
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
                    event.locationId,  
                    event.location.latitude, 
                    event.location.longitude, 
                    event.startsAt, 
                    event.endsAt, 
                    date, 
                    event.category, 
                    event.categoryId, 
                    event.eventMusic, 
                    event.socialInteractions.length > 0 && event.socialInteractions[0].isActive,
                    event.user.userId
                )
            })
            
            return events
        }catch(error){
            console.error("Error fetching home events: ", error);
            throw new Error("Failed to fetch home events.");
        }
        
    }

    // GET api/events/:eventId
    static async getEventDetails(token: string, eventId: string, userId: string) {
        try {
            const { data: event } = await apiRequest(`events/${eventId}/${userId}`, "GET", undefined, token);
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
                event.locationId, 
                event.location.latitude,
                event.location.longitude,
                startsAt,
                endsAt,
                date,
                event.category.nameEs,
                event.categoryId, 
                event.eventMusic,
                event.socialInteractions.length > 0 && event.socialInteractions[0].isActive,
                event.user.userId
            );
        } catch (error) {
            console.error("Error fetching event details:", error);
            throw new Error("Failed to fetch event details.");
        }
    }    

    static async searchEvents(token: string, search: string, userId: string) {
        try {
            const { data } = await apiRequest("search/events", "POST", { search, userId }, token);
            const events = data.map((event: any) => {
                const date = new Date(event.date).toLocaleDateString();
                return new EventModel(
                    event.eventId, 
                    event.user.profileImage, 
                    event.user.username, 
                    event.eventImage, 
                    event.title, 
                    event.description, 
                    event.locationId, 
                    event.location.latitude, 
                    event.location.longitude, 
                    event.startsAt, 
                    event.endsAt, 
                    date, 
                    event.category, 
                    event.categoryId, 
                    event.eventMusic, 
                    event.socialInteractions.length > 0 && event.socialInteractions[0].isActive,
                    event.user.userId
                )
            })
            return events;

        } catch (error) {
            console.error("Error searching events:", error);
            throw new Error("Failed to search events.");
        }
    }
}