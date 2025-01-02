import { View } from "react-native";
import type { Meta, StoryObj } from '@storybook/react';
import { CommentInput } from "./CommentInput";

const meta = {
    title: 'CommentInput', 
    component: CommentInput, 
    decorators: [
        (Story) => (
          <View style={{ padding: 16, alignItems: 'center' }}>
            <Story />
          </View>
        ),
      ],

} satisfies Meta<typeof CommentInput>; 

export default meta; 

type Story = StoryObj<typeof meta>; 

export const Default: Story = {
    args: {
        
    }
}