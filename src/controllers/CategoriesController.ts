import { CategoryModel } from "../models/CategoryModel";
import { t } from "i18next";
export class CategoriesController {
    static async getCategories(token:string){
        try {
            return await CategoryModel.getCategories(token); 
        } catch (error) {
            console.error("Error in CategoriesController:", error);
            throw new Error(t("error.error_fetching_categories"));
        }
    }
}