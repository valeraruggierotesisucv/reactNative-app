import type { Meta, StoryObj } from "@storybook/react";
import { NotificationItem, NotificationType } from "./NotificationItem";

const meta = {
  title: "NotificationItem",
  component: NotificationItem,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: "John Doe",
    timestamp: new Date("2024-01-01"),
    userAvatar:
      "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
    type: NotificationType.FOLLOW,
    onFollow: () => {},
  },
};

export const LikeEvent: Story = {
  args: {
    ...Default.args,
    type: NotificationType.LIKE_EVENT,
    eventImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7E6_rdzbAZH8-eeas_xAL_E6qrJU9cHuFRA&s",
  },
};

export const CommentEvent: Story = {
  args: {
    ...Default.args,
    type: NotificationType.COMMENT_EVENT,
    eventImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7E6_rdzbAZH8-eeas_xAL_E6qrJU9cHuFRA&s",
  },
};
