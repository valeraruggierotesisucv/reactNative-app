import { LocationModel } from "../models/LocationModel";

export class LocationController{
    static async addLocation(token: string, location: object){
        return await LocationModel.createLocation(token, location)
    }
}