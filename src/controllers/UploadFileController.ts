import { FileTypeEnum, uploadFile } from "../services/storage";

export class UploadFileController {
    static async uploadFile(uri: string, type: FileTypeEnum){        
        const url = await uploadFile(uri, type);            
        return url
    }
}