import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta = {
  title: "Avatar",
  component: Avatar,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: "center" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    source:
      "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
  },
};
