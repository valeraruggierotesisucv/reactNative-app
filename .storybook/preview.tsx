import React from "react";
import { Preview } from "@storybook/react";
import { FontLoader } from "../FontLoader";

const preview: Preview = {
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
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
