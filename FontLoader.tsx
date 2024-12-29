import React, { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export const FontLoader: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [fontsLoaded, error] = useFonts({
    "SF-Pro-Rounded-Heavy": require("./assets/fonts/SFProRoundedHeavy.otf"),
    "SF-Pro-Rounded-Semibold": require("./assets/fonts/SFProRoundedSemibold.otf"),
    "SF-Pro-Text-Regular": require("./assets/fonts/SFProTextRegular.otf"),
    "SF-Pro-Text-Bold": require("./assets/fonts/SFProTextBold.otf"),
    "SF-Pro-Text-Medium": require("./assets/fonts/SFProTextMedium.otf"),
    "SF-Pro-Text-Semibold": require("./assets/fonts/SFProTextSemibold.otf"),
    "SF-Pro-Text-Light": require("./assets/fonts/SFProTextLight.otf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Error loading fonts:", error);
    }
  }, [error]);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn("Error preventing auto-hide of splash screen:", e);
      }
    };

    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      console.log("Fonts loaded successfully");
      SplashScreen.hideAsync();
    } else {
      console.log("Fonts not loaded yet");
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    console.log("Returning null because fonts are not loaded");
    return null; // Optionally, you can return a loading indicator here
  }

  return <>{children}</>;
};
