import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AddView } from "../views/AddView";



const AddStackNavigator = createNativeStackNavigator();

enum AddRoutes {
    Add = "Add"
}

export type AddStackParamList = {
    [AddRoutes.Add]: undefined;
};

export type AddStackNavigationProp = NativeStackNavigationProp<AddStackParamList>;

export function AddStack() {
    return(
        <AddStackNavigator.Navigator
            initialRouteName={AddRoutes.Add}
        >
            <AddStackNavigator.Screen name={AddRoutes.Add} component={AddView} />
        </AddStackNavigator.Navigator>
    )
}