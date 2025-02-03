import Constants from "expo-constants";
import { HOST } from "@env";

export function getServer(){
    const host = Constants.expoConfig?.hostUri;
    const PORT = 5000; 
    let server = host?.split(":")[0];
    console.log(HOST)
    if(HOST !== "localhost"){
        return HOST
    }
    
    server = `${server}:${PORT}`; 
    return server
}