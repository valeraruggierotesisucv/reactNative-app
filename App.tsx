import React, { useState, useEffect } from 'react';
import { Navigation } from "./RootNavigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import Constants from "expo-constants";
import i18n from "./i18n";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { FontLoader } from "./FontLoader";
import { ToastProvider } from 'react-native-toast-notifications';

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
          <GestureHandlerRootView style={{ flex: 1 }}>
            <PortalProvider>
              <Navigation />
            </PortalProvider>
          </GestureHandlerRootView>
        </AuthProvider>
      </ToastProvider>      
    </FontLoader>
  );
}

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled === "true") {
  AppEntryPoint = require("./.storybook").default;
}

export default AppEntryPoint;
