import { FileTypeEnum, uploadFile, deleteFile } from "../services/storage";

export class FileController {
    static async uploadFile(uri: string, type: FileTypeEnum){        
        const url = await uploadFile(uri, type);            
        return url
    }

    static async deleteFile(uri: string, type: FileTypeEnum){
        const result =  await deleteFile(uri, type); 
        return result
    }
}