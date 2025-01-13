import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthView } from "../views/AuthView";
import { OnboardingView } from "../views/OnboardingView";
import { ChooseCategoriesView } from "../views/ChooseCategoriesView";
import { ForgotPasswordView } from "../views/ForgotPasswordView";
import { ForgotPasswordLoginView } from "../views/ForgotPasswordLoginView";
import { AuthRoutes } from "../../utils/routes";
import { AuthStackParamList } from "../../utils/types";
import { SuccessView } from "../views/SuccessView";

const AuthStackNavigator = createNativeStackNavigator();

export type AuthStackNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

export function AuthStack() {
  return (
    <AuthStackNavigator.Navigator
      initialRouteName={AuthRoutes.Onboarding}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStackNavigator.Screen name={AuthRoutes.Auth} component={AuthView} />
      <AuthStackNavigator.Screen name={AuthRoutes.Onboarding} component={OnboardingView}/>
      <AuthStackNavigator.Screen name={AuthRoutes.ChooseCategories} component={ChooseCategoriesView}/>
      <AuthStackNavigator.Screen name={AuthRoutes.ForgotPassword} component={ForgotPasswordView}/>
      <AuthStackNavigator.Screen name={AuthRoutes.ForgotPasswordLogin} component={ForgotPasswordLoginView}/>
      <AuthStackNavigator.Screen name={AuthRoutes.Success} component={SuccessView}/>
    </AuthStackNavigator.Navigator>
  );
}
