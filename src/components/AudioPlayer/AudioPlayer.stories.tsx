import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { AudioPlayer } from "./AudioPlayer";

const meta = {
  title: "AudioPlayer",
  component: AudioPlayer,
  decorators: [
    (Story) => (
      <View
        style={{ flex: 1, padding: 16, alignItems: "center", width: "100%" }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof AudioPlayer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    uri: "https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/EventMusic/1737756414228",
  },
};
