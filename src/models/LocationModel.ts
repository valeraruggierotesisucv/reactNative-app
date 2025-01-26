import { apiRequest } from "../../utils/apiRequest";

export class LocationModel {
    locationId: string;
    latitude: string;
    longitude: string;

    constructor(locationId: string, latitude: string, longitude: string){
        this.locationId = locationId, 
        this.latitude = latitude, 
        this.longitude = longitude
    }

    // POST api/locations
    static async createLocation(token: string, location: object){
        try {
            const { data } = await apiRequest(
                "locations", 
                "POST", 
                location, 
                token
            )

            return data.locationId
        } catch (error) {
            console.error("Error creating location: ", error);
            throw new Error("Failed to create location.");
        }
    }

    static async deleteLocation(token: string, locationId: string){
        try {
            await apiRequest(
                `locations/${locationId}`, 
                "DELETE", 
                undefined, 
                token
            )
        } catch (error) {
            console.error("Error deleting location: ", error);
            throw new Error("Failed to delete location.");
        }
    }
}