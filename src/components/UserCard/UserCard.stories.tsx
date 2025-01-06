import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { UserCard, UserCardVariant } from "./UserCard";

const meta = {
  title: "UserCard",
  component: UserCard,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: "center" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof UserCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profileImage:
      "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
    username: "John Doe",
    onPressUser: () => console.log("User pressed"),
  },
};

export const WithButton: Story = {
  args: {
    ...Default.args,
    variant: UserCardVariant.WITH_BUTTON,
    onPressUser: () => console.log("User pressed"),
    onPressButton: () => console.log("Button pressed"),
    actionLabel: "Follow",
  },
};
