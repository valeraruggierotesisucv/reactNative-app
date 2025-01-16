import { getServer } from "../../utils/getServer";

export class EventModel {
    constructor(){

    }

    // POST api/events
    static createEvent(token: string ){
        const event = new EventModel(); 

        const server = getServer();        
        fetch(`http://${server}:5000/api/protected`, {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            return response.json();
            })
            .then((data) => {
            console.log(data);
            })
            .catch((error) => {
            console.error("Fetch error:", error);
            });
    }

    // GET api/events/:eventId
    static getEventDetails(){}

    // GET api/home/events
    static getHomeEvents(){}
}