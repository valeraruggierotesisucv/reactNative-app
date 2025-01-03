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

export const Default = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <InputField
        label="Label"
        placeholder="Text..."
        value={value}
        onChangeText={setValue}
      />
    );
  },
};

export const WithError = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <InputField
        label="Label"
        placeholder="Text..."
        value={value}
        onChangeText={setValue}
        error="*error message"
      />
    );
  },
};

export const WithValue = {
  render: () => {
    const [value, setValue] = useState("Input text");
    return (
      <InputField
        label="Label"
        placeholder="Text..."
        value={value}
        onChangeText={setValue}
      />
    );
  },
};

export const Password = {
  render: () => {
    const [value, setValue] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
      <InputField
        label="Password"
        value={value}
        onChangeText={setValue}
        secureTextEntry={!isPasswordVisible}
        placeholder="Enter your password"
        icon={isPasswordVisible ? "eye-off" : "eye"}
        onPressIcon={() => setIsPasswordVisible(!isPasswordVisible)}
      />
    );
  },
};

export const WithIcon = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <InputField
        label="Label"
        placeholder="Text..."
        value={value}
        onChangeText={setValue}
        icon="account"
      />
    );
  },
};

export const WithClickableIcon = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <InputField
        label="Label"
        placeholder="Text..."
        value={value}
        onChangeText={setValue}
        icon="magnify"
        onPressIcon={() => console.log("Icon clicked")}
      />
    );
  },
};
