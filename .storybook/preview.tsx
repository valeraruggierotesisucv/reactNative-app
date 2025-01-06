import React from "react";
import { Preview } from "@storybook/react";
import { FontLoader } from "../FontLoader";
import { TranslationProvider } from "../src/contexts/TranslationContext";

const preview: Preview = {
  decorators: [
    (Story) => (
      <FontLoader>
        <TranslationProvider>
          <Story />
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
