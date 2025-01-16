import { getServer } from "../../utils/getServer";
import { useAuth } from "../contexts/AuthContext";

export class AddEventController{
    static async postEvent(token: string){
        //const { session} = useAuth(); 
        console.log(" This is the postCONTROLLER")
        console.log(" this is the session ", token); 

        
        // EventModel.create
    }
}