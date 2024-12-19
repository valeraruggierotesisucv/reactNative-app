import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigator } from "./src/navigators/BottomTabNavigator";
import { AuthStack } from "./src/navigators/AuthStackNavigator";
import { useAuth } from "./src/contexts/AuthContext";

export function Navigation() {
    const { user } = useAuth();
    return(
        <NavigationContainer>
            {   user 
                    ? <BottomTabNavigator /> 
                    : <AuthStack />
            }
        </NavigationContainer>
    )
}