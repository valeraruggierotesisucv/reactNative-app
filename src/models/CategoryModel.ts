import { apiRequest } from "../../utils/apiRequest";

export class CategoryModel{
    static async getCategories(token: string ){
        return await apiRequest(
            "categories", 
            "GET", 
            undefined, 
            token
        )
    }
}