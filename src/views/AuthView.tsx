import { View, Text, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export function AuthView() {
    const { login } = useAuth();
    return(
        <View style={{flex: 1, gap: 8}}>
            <Text>AuthView</Text> 
            <Button
                title="Iniciar sesión"
                onPress={() => login()}
            ></Button>           
        </View>
    )
}   