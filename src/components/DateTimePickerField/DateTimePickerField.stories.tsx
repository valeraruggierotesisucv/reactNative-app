import { View, ScrollView } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { DateTimePickerField, DateTimePickerFieldVariant } from "./DateTimePickerField";
import { useState } from "react";


const meta = {
  title: "DateTimePickerField",
  component: DateTimePickerField,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 16, backgroundColor: "#f5f5f5" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof DateTimePickerField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = () => {
  const [date, setDate] = useState(new Date());

  return <DateTimePickerField label="Date of Birth" value={date} onChange={setDate} variant={DateTimePickerFieldVariant.GRAY_BACKGROUND}/>;
};



