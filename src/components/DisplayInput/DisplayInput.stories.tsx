import { Text, View } from "react-native";
import type { Meta, StoryObj } from '@storybook/react';
import { DisplayInput } from "./DisplayInput";
import { Chip, ChipVariant } from "../Chip/Chip";

const meta = {
    title: 'DisplayInput', 
    component: DisplayInput, 
    decorators: [
        (Story) => (    
            <View style={{ padding: 10}}>
                <Story />    
            </View>      
                 
        ),
      ],

} satisfies Meta<typeof DisplayInput>; 

export default meta; 
type Story = StoryObj<typeof meta>; 

const Pills = () => {
    return (
        <View style={{ flexDirection: "row", gap: 8 }}>
            <Chip label="8:00 pm" variant={ChipVariant.LIGHT}/>
            <Chip label="10:00 pm" variant={ChipVariant.LIGHT}/>
            <Chip label="26/07/2024" variant={ChipVariant.LIGHT}/>
        </View>
    );
}

export const Display: Story = {
    args: {
        label: "UBICACIÓN", 
        data: <Text>Av. Universitaria. Los Chaguaramos</Text>, 
    }
}

export const PillsDisplay: Story = {
    args: {
        label: "¿CUÁNDO?", 
        data: <Pills />
    }
}

export const OnePill: Story = {
    args: {
        label: "CATEGORÍA", 
        data: <Chip label="CONCIERTO" variant={ChipVariant.LIGHT}/>
    }
}
