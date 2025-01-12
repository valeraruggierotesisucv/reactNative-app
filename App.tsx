import { Navigation } from "./RootNavigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import Constants from "expo-constants";
import { FontLoader } from "./FontLoader";
import { TranslationProvider } from "./src/contexts/TranslationContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";

export function App() {
  return (
    <FontLoader>
      <AuthProvider>
        <TranslationProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <PortalProvider>
              <Navigation />
            </PortalProvider>
          </GestureHandlerRootView>
        </TranslationProvider>
      </AuthProvider>
    </FontLoader>
  );
}

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled === "true") {
  AppEntryPoint = require("./.storybook").default;
}

export default AppEntryPoint;
