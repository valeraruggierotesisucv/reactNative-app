import { apiRequest } from "../../utils/apiRequest";

export class CategoryModel{
    public id: number;
    public nameEs: string;
    public nameEn: string;
    public description: string;


    constructor(id: number, nameEs: string, nameEn: string, description: string){
        this.id = id;
        this.nameEs = nameEs;
        this.nameEn = nameEn;
        this.description = description;
    }

    static async getCategories(token: string ): Promise<CategoryModel[]>{
        try {
            const response = await apiRequest(
                "categories", 
                "GET", 
                undefined, 
                token
            )
            return response.data.map((category: any) => new CategoryModel(category.categoryId, category.nameEs, category.nameEn, category.description));
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw new Error("Failed to fetch categories.");
        }
    }
}