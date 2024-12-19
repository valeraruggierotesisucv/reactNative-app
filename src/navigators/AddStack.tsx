import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AddView } from "../views/AddView";



const AddStackNavigator = createNativeStackNavigator();

export type AddStackParamList = {
    Add: undefined;
};

export type AddStackNavigationProp = NativeStackNavigationProp<AddStackParamList>;

export function AddStack() {
    return(
        <AddStackNavigator.Navigator
            initialRouteName="Add"
        >
            <AddStackNavigator.Screen name="Add" component={AddView} />
        </AddStackNavigator.Navigator>
    )
}