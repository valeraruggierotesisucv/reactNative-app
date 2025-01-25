import { FileTypeEnum, uploadFile, deleteFile } from "../services/storage";
import { t } from "i18next";
export class FileController {
    static async uploadFile(uri: string, type: FileTypeEnum){        
        try {
            const url = await uploadFile(uri, type);            
            return url
        } catch (error) {
            console.error("Error in FileController:", error);
            throw new Error(t("error.error_uploading_file"));
        }
    }

    static async deleteFile(uri: string, type: FileTypeEnum){
        try {
            const result =  await deleteFile(uri, type); 
            return result
        } catch (error) {
            console.error("Error in FileController:", error);
            throw new Error(t("error.error_deleting_file"));
        }
    }
}