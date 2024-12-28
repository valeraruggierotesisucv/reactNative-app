import { Navigation } from "./RootNavigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import Constants from "expo-constants";

export function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled === "true") {
  AppEntryPoint = require("./.storybook").default;
}

export default AppEntryPoint;
