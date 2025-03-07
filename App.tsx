import React, { useState, useEffect } from 'react';
import { Navigation } from "./RootNavigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import i18n from "./i18n";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { FontLoader } from "./FontLoader";
import { ToastProvider } from 'react-native-toast-notifications';
import { NotificationProvider } from './src/contexts/PushNotificationsContext';
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function App() {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    i18n.init().then(() => {
      setIsI18nInitialized(true);
    }).catch((error) => {
      console.error("i18n initialization failed", error);
    });
  }, []);

  if (!isI18nInitialized) {
    return null;
  }

  return (
    
      <FontLoader>
        <ToastProvider>
          <AuthProvider>
          <NotificationProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <PortalProvider>
                  <Navigation />
                </PortalProvider>
              </GestureHandlerRootView>
          </NotificationProvider>
            
          </AuthProvider>
        </ToastProvider>      
      </FontLoader>   
  );
}

export default App;
