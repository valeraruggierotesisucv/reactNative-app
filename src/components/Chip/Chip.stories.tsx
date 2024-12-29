import { View } from "react-native";
import type { Meta, StoryObj } from '@storybook/react';
import { Chip, ChipVariant } from "./Chip";

const meta = {
    title: 'Chip', 
    component: Chip, 
    decorators: [
        (Story) => (
          <View style={{ padding: 16, alignItems: 'center' }}>
            <Story />
          </View>
        ),
      ],

} satisfies Meta<typeof Chip>; 

export default meta; 

type Story = StoryObj<typeof meta>; 

export const Default: Story = {
    args: {
        label: "24/12/2024", 
        onPress: () => console.log("PRESSED"), 
        variant: ChipVariant.DEFAULT
    }
}

export const Light: Story = {
    args: {
        label: "24/12/2024", 
        onPress: () => console.log("PRESSED"), 
        variant: ChipVariant.LIGHT
    }
}