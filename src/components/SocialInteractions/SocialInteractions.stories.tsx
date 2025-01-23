import { View } from "react-native";
import type { Meta, StoryObj } from '@storybook/react';
import { SocialInteractions } from "./SocialInteractions";
import { useState } from "react";

const meta = {
    title: 'SocialInteractions', 
    component: SocialInteractions, 
    decorators: [
        (Story) => (          
            <Story />          
        ),
      ],

} satisfies Meta<typeof SocialInteractions>; 

export default meta; 
type Story = StoryObj<typeof meta>; 

export const Default = () => {
    const [isLiked, setIsLiked] = useState(false);
    return (
        <SocialInteractions
            isLiked={isLiked}
            onLike={() => setIsLiked(!isLiked)}
            onComment={() => console.log("COMMENT")}
            onShare={() => console.log("SHARE")}
        />
    )
}