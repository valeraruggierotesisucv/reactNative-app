import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NotificationsView } from "../views/NotificationsView";

const NotificationsStackNavigator = createNativeStackNavigator();

enum NotificationsRoutes {
    Notifications = "Notifications"
}

export type NotificationsStackParamList = {
    [NotificationsRoutes.Notifications]: undefined;
};

export type NotificationsStackNavigationProp = NativeStackNavigationProp<NotificationsStackParamList>;

export function NotificationsStack() {
    return(
        <NotificationsStackNavigator.Navigator
            initialRouteName={NotificationsRoutes.Notifications}
        >
            <NotificationsStackNavigator.Screen name={NotificationsRoutes.Notifications} component={NotificationsView} />
        </NotificationsStackNavigator.Navigator>
    )
}