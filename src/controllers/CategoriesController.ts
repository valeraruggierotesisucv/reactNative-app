import { CategoryModel } from "../models/CategoryModel";

export class CategoriesController {
    static async getCategories(token:string){
        try {
            return await CategoryModel.getCategories(token); 
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    }
}