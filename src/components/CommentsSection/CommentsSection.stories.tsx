import { View, ScrollView } from "react-native";
import type { Meta, StoryObj } from '@storybook/react';
import { CommentsSection } from "./CommentsSection";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { dummyComments } from "../../data/dummyComments";

const meta = {
    title: 'CommentsSection', 
    component: CommentsSection, 
    decorators: [
        (Story) => (
            <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>

                    <Story />

            </View>
        ),
    ],
} satisfies Meta<typeof CommentsSection>; 

export default meta; 

type Story = StoryObj<typeof meta>; 

export const Default: Story = {
    args: {
        comments: dummyComments,
        onReply: (commentId) => console.log('Reply to comment:', commentId),
        onAddComment: (comment) => console.log('New comment:', comment)
    }
}

export const NoComments: Story = {
    args: {
        comments: [],
        onReply: (commentId) => console.log('Reply to comment:', commentId)
    }
}

export const SingleComment: Story = {
    args: {
        comments: [dummyComments[0]],
        onReply: (commentId) => console.log('Reply to comment:', commentId)
    }
}