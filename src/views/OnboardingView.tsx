import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { AuthRoutes, AuthStackNavigationProp } from "../navigators/AuthStackNavigator";

export function OnboardingView() {
    const navigation = useNavigation<AuthStackNavigationProp>();
    return(
        <View style={{flex: 1, gap: 8}}>
            <Text>OnboardingView</Text>
            <Button
                title="Autenticación"
                onPress={() => navigation.navigate(AuthRoutes.Auth)}
            />
            <Button
                title="Olvidé mi contraseña"
                onPress={() => navigation.navigate(AuthRoutes.ForgotPassword)}
            />
            <Button
                title="Escoger categorías"
                onPress={() => navigation.navigate(AuthRoutes.ChooseCategories)}
            />

            <Button
                title="Olvide mi contraseña Login View"
                onPress={() => navigation.navigate(AuthRoutes.ForgotPasswordLogin)}
            /> 

        </View>
    )
}   