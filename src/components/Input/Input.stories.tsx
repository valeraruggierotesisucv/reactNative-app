import { Text, View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { Input, InputVariant } from "./Input";

const meta = {
  title: "Input",
  component: Input,
  decorators: [
    (Story) => (
      <View style={{ padding: 10 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "UBICACIÓN",
    placeholder: "Agregar ubicación",
    variant: InputVariant.DEFAULT,
    onPress: () => console.log("onPress"),
  },
};

export const Arrow: Story = {
  args: {
    label: "UBICACIÓN",
    placeholder: "Agregar ubicación",
    variant: InputVariant.ARROW,
  },
};
