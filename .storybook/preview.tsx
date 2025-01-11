import React from "react";
import { Preview } from "@storybook/react";
import { FontLoader } from "../FontLoader";
import { TranslationProvider } from "../src/contexts/TranslationContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";

const preview: Preview = {
  decorators: [
    (Story) => (
      <FontLoader>
        <TranslationProvider>
          <GestureHandlerRootView>
            <PortalProvider>
              <Story />
            </PortalProvider>
          </GestureHandlerRootView>
        </TranslationProvider>
      </FontLoader>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
