import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { EventThumbnailList } from "./EventThumbnailList";

const meta = {
  title: "EventThumbnailList",
  component: EventThumbnailList,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof EventThumbnailList>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockEvents = Array.from({ length: 22 }, (_, index) => ({
  id: `event-${index + 1}`,
  imageUrl: `https://picsum.photos/400/400?random=${index + 1}`,
}));

export const Default: Story = {
  args: {
    events: mockEvents,
    onPressEvent: (eventId) => console.log("Pressed event:", eventId),
  },
};

export const FewItems: Story = {
  args: {
    events: mockEvents.slice(0, 5),
    onPressEvent: (eventId) => console.log("Pressed event:", eventId),
  },
};
