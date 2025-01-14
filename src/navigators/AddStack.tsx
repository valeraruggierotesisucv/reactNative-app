import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AddEventView } from "../views/AddEventView";
import { AddRoutes } from "../../utils/routes";
import { AddStackParamList } from "../../utils/types";

const AddStackNavigator = createNativeStackNavigator();

export type AddStackNavigationProp =
  NativeStackNavigationProp<AddStackParamList>;

export function AddStack() {
  return (
    <AddStackNavigator.Navigator
      initialRouteName={AddRoutes.Add}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AddStackNavigator.Screen name={AddRoutes.Add} component={AddEventView} />
      
    </AddStackNavigator.Navigator>
  );
}
