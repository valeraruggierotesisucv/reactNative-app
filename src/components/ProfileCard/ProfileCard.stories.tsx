import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { ProfileCard } from "./ProfileCard";

const meta = {
  title: "ProfileCard",
  component: ProfileCard,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: "#E5E5E5",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ProfileCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: "José Miguel Valera",
    profileImage:
      "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
    biography: "No 15 uti street off ovie palace road effurun delta state",
    events: 24,
    followers: 32,
    following: 40,
    isFollowing: false,
    onFollow: () => console.log("Follow pressed"),
  },
};

export const Following: Story = {
  args: {
    ...Default.args,
    isFollowing: true,
    onFollow: () => console.log("Unfollow pressed"),
  },
};
