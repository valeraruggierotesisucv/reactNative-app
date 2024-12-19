import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NotificationsView } from "../views/NotificationsView";


const NotificationsStackNavigator = createNativeStackNavigator();

export type NotificationsStackParamList = {
    Notifications: undefined;
};

export type NotificationsStackNavigationProp = NativeStackNavigationProp<NotificationsStackParamList>;

export function NotificationsStack() {
    return(
        <NotificationsStackNavigator.Navigator
            initialRouteName="Notifications"
        >
            <NotificationsStackNavigator.Screen name="Notifications" component={NotificationsView} />
        </NotificationsStackNavigator.Navigator>
    )
}