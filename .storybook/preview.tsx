import React from "react";
import { Preview } from "@storybook/react";
import { FontLoader } from "../FontLoader";
import i18n from "../i18n";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";

const preview: Preview = {
  decorators: [
    (Story) => (
      <FontLoader>
        <GestureHandlerRootView>
          <PortalProvider>
              <Story />
            </PortalProvider>
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
