import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthView } from "../views/AuthView";
import { OnboardingView } from "../views/OnboardingView";
import { ChooseCategoriesView } from "../views/ChooseCategoriesView";
import { ForgotPasswordView } from "../views/ForgotPasswordView";
import { ForgotPasswordLoginView } from "../views/ForgotPasswordLoginView";

const AuthStackNavigator = createNativeStackNavigator();

export enum AuthRoutes {
    Auth = "Auth",
    Onboarding = "Onboarding",
    ChooseCategories = "ChooseCategories",
    ForgotPassword = "ForgotPassword",
    ForgotPasswordLogin = "ForgotPasswordLogin"
}

export type AuthStackParamList = {
    [AuthRoutes.Auth]: undefined;
    [AuthRoutes.Onboarding]: undefined;
    [AuthRoutes.ChooseCategories]: undefined;
    [AuthRoutes.ForgotPassword]: undefined;
    [AuthRoutes.ForgotPasswordLogin]: undefined;
};
  
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export function AuthStack() {
    return(
        <AuthStackNavigator.Navigator
            initialRouteName={AuthRoutes.Onboarding}    
        >
            <AuthStackNavigator.Screen name={AuthRoutes.Auth} component={AuthView} />
            <AuthStackNavigator.Screen name={AuthRoutes.Onboarding} component={OnboardingView} />
            <AuthStackNavigator.Screen name={AuthRoutes.ChooseCategories} component={ChooseCategoriesView} />
            <AuthStackNavigator.Screen name={AuthRoutes.ForgotPassword} component={ForgotPasswordView} />
            <AuthStackNavigator.Screen name={AuthRoutes.ForgotPasswordLogin} component={ForgotPasswordLoginView} /> 
        </AuthStackNavigator.Navigator>
    )
}