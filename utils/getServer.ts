import Constants from "expo-constants";
import { HOST } from "@env";

export function getServer(){
    const host = Constants.expoConfig?.hostUri;
    const PORT = 5000; 
    let server = host?.split(":")[0];

    if(HOST === "RAILWAY"){
        console.log("api-production-37c6.up.railway.app")
        return "api-production-37c6.up.railway.app"
    }
    
    server = `${server}:${PORT}`; 
    console.log(server)
    return server
}