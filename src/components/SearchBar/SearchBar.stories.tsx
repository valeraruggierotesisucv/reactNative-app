import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

const meta = {
  title: "SearchBar",
  component: SearchBar,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          padding: 10,
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
