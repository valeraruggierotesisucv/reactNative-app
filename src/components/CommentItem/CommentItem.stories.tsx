import { View } from "react-native";
import type { Meta, StoryObj } from '@storybook/react';
import { CommentItem } from "./CommentItem";    

const meta = {
    title: 'CommentItem', 
    component: CommentItem, 
    decorators: [
        (Story) => (
          <View style={{ padding: 16, alignItems: 'center' }}>
            <Story />
          </View>
        ),
      ],

} satisfies Meta<typeof CommentItem>; 

export default meta; 

type Story = StoryObj<typeof meta>; 

export const Default: Story = {
    args: {
        username: 'John Doe',
        comment: 'This is a commen',
        timestamp: new Date(new Date().getFullYear()-1, new Date().getMonth(), new Date().getDate()),
        likes: 10,
        userAvatar: 'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1',
    }
}