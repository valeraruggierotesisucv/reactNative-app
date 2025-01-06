import Constants from "expo-constants";

export function getServer(){
    const host = Constants.expoConfig?.hostUri;
    const server = host?.split(":")[0];

    return server
}