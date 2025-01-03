import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";

const meta = {
  title: "Calendar",
  component: Calendar,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
