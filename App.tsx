import { Navigation } from "./RootNavigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import Constants from "expo-constants";
import { FontLoader } from "./FontLoader";
import { TranslationProvider } from "./src/contexts/TranslationContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function App() {
  return (
    <FontLoader>
      <AuthProvider>
        <TranslationProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Navigation />
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
