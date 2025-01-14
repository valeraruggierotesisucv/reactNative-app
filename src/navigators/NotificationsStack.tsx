import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NotificationsView } from "../views/NotificationsView";
import { NotificationsRoutes, NotificationsStackParamList } from "../../utils/routes";

const NotificationsStackNavigator = createNativeStackNavigator();

export type NotificationsStackNavigationProp =
  NativeStackNavigationProp<NotificationsStackParamList>;

export function NotificationsStack() {
  return (
    <NotificationsStackNavigator.Navigator
      initialRouteName={NotificationsRoutes.Notifications}
      screenOptions={{
        headerShown: false,
      }}
    >
      <NotificationsStackNavigator.Screen name={NotificationsRoutes.Notifications} component={NotificationsView}/>
    </NotificationsStackNavigator.Navigator>
  );
}
