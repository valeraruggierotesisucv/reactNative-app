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
        const { data } = await apiRequest(
            "locations", 
            "POST", 
            location, 
            token
        )

        return data.locationId
    }

    static async deleteLocation(token: string, locationId: string){
        await apiRequest(
            `locations/${locationId}`, 
            "DELETE", 
            undefined, 
            token
        )
    }
}