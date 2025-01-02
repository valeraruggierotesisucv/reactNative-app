import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { AppHeader } from "./AppHeader";

const meta = {
  title: "AppHeader",
  component: AppHeader,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: "center" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof AppHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithTitle: Story = {
  args: {
    title: "Eventos",
  },
};

export const WithGoBack: Story = {
  args: {
    goBack: () => {},
  },
};

export const WithGoBackAndTitle: Story = {
  args: {
    title: "Eventos",
    goBack: () => {},
  },
};

export const WithGoToConfig: Story = {
  args: {
    goToConfig: () => {},
  },
};
