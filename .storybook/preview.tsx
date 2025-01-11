import React from "react";
import { Preview } from "@storybook/react";
import { FontLoader } from "../FontLoader";
import { TranslationProvider } from "../src/contexts/TranslationContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const preview: Preview = {
  decorators: [
    (Story) => (
      <FontLoader>
        <GestureHandlerRootView>
          <TranslationProvider>
            <Story />
          </TranslationProvider>
        </GestureHandlerRootView>
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
