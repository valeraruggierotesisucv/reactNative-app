import { apiRequest } from "../../utils/apiRequest";

export class CategoryModel{
    public id: number;
    public name: string;
    public description: string;
    public icon: string;

    constructor(id: number, name: string, description: string, icon: string){
        this.id = id;
        this.name = name;
        this.description = description;
        this.icon = icon;
    }

    static async getCategories(token: string ){
        return await apiRequest(
            "categories", 
            "GET", 
            undefined, 
            token
        )
    }
}