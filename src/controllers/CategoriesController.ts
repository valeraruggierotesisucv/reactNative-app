import { CategoryModel } from "../models/CategoryModel";

export class CategoriesController {
    static async getCategories(token:string){
        return await CategoryModel.getCategories(token); 
    }
}