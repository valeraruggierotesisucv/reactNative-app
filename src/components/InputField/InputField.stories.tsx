import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";
import { useState } from "react";

const meta = {
  title: "InputField",
  component: InputField,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#F5F5F5" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Text...",
    value: "",
    onChangeText: () => {},
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: "*error message",
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: "Input text",
  },
};

export const Password: Story = {
  args: {
    ...Default.args,
    label: "Password",
    secureTextEntry: true,
    placeholder: "Enter your password",
    icon: "eye",
    onPressIcon: () => console.log("Toggle password visibility"),
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    icon: "account",
  },
};

export const WithClickableIcon: Story = {
  args: {
    ...Default.args,
    icon: "magnify",
    onPressIcon: () => console.log("Icon clicked"),
  },
};
