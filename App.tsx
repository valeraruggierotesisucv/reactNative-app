import { Navigation } from "./RootNavigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import Constants from "expo-constants";
import { FontLoader } from "./FontLoader";
export function App() {
  return (
    <FontLoader>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </FontLoader>
  );
}

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled === "true") {
  AppEntryPoint = require("./.storybook").default;
}

export default AppEntryPoint;
