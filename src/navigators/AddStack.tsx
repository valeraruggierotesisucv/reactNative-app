import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AddView } from "../views/AddView";
import { AddRoutes } from "../../utils/routes";
import { AddStackParamList } from "../../utils/types";
import { AddDateView } from "../views/AddDateView";

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
      <AddStackNavigator.Screen name={AddRoutes.Add} component={AddView} />
      
    </AddStackNavigator.Navigator>
  );
}
