import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigator } from "./src/navigators/BottomTabNavigator";
import { AuthStack } from "./src/navigators/AuthStackNavigator";

export function Navigation() {
    const user = true; // TODO: crear contexto con la autenticacion
    return(
        <NavigationContainer>
            {   user 
                    ? <BottomTabNavigator /> 
                    : <AuthStack />
            }
        </NavigationContainer>
    )
}