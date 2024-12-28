import { View } from "react-native";
import type { Meta, StoryObj } from '@storybook/react';
import { EventCard } from "./EventCard";

const meta = {
    title: 'EventCard', 
    component: EventCard, 
    decorators: [
        (Story) => (          
            <Story />         
        ),
      ],

} satisfies Meta<typeof EventCard>; 

export default meta; 
type Story = StoryObj<typeof meta>; 

export const Default: Story = {
    args: {
        profileImage: require("../../assets/Avatar.png") , 
        username: "John Doe",
        eventImage: require("../../assets/event.png"), 
        title: "Martin Garrix Meet and Greet", 
        description: "Martijn Gerard Garritsen, conocido por su nombre artístico Martin Garrix, es un DJ, remezclador y productor discográfico neerlandés; también propietario del sello discográfico STMPD RCRDS", 
        isLiked: false, 
        date: "24/12/2024", 
        onComment: () => console.log("COMMENT"), 
        onShare: () => console.log("SHARE"), 
        onMoreDetails: () =>  console.log("MORE DETAILS")
    }
}
