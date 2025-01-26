import { LocationModel } from "../models/LocationModel";
import { t } from "i18next";
export class LocationController{
    static async addLocation(token: string, location: object){
        try{
            return await LocationModel.createLocation(token, location)
        }catch(error){
            console.error("Error in LocationController:", error);
            throw new Error(t("error.error_creating_location"));
        }
    }

    static async deleteLocation(token: string, locationId: string){
        try{
            return await LocationModel.deleteLocation(token, locationId)
        }catch(error){
            console.error("Error in LocationController:", error);
            throw new Error(t("error.error_deleting_location"));
        }
    }
}