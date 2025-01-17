import { apiRequest } from "../../utils/apiRequest";
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
    musicUrl: string; 
    isLiked: boolean; 

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
        musicUrl: string, 
        isLiked: boolean, 
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
        this.musicUrl = musicUrl, 
        this.isLiked = isLiked
    }

    static async createEvent(token: string, event: object){
        return await apiRequest(
            "events", 
            "POST", 
            event, 
            token
        )
    }

    // GET api/home/:userId/events
    static async getHomeEvents(token: string, userId: string){
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
                event.eventMusic, 
                false, // TODO: FALTA LIKE 
            )
        })
        
        return events
    }

    // GET api/events/:eventId
    static getEventDetails(){}

    
}