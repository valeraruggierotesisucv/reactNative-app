import { getServer } from "./getServer";

export async function apiRequest(
    endpoint: string, 
    method: string, 
    data?: object, 
    token?: string
){
    const server = getServer(); 
    const PORT = 5000; 
    const url = `http://${server}:${PORT}/api/${endpoint}`; 

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }

    try{
        const response = await fetch(url, {
            method, 
            headers, 
            body: data ? JSON.stringify(data) :  undefined
        }); 

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error: ${response.statusText}`);
        }

        return await response.json();
    }catch(error){
        console.log(`Error en la petición ${method} a ${url}: `, error); 
        throw error; 
    }
}