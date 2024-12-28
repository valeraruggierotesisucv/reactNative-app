import { View } from "react-native";
import type { Meta, StoryObj } from '@storybook/react';
import { UserCard, UserCardVariant } from "./UserCard";

const meta = {
    title: 'UserCard', 
    component: UserCard, 
    decorators: [
        (Story) => (
          <View style={{ padding: 16, alignItems: 'center' }}>
            <Story />
          </View>
        ),
      ],

} satisfies Meta<typeof UserCard>; 

export default meta; 

type Story = StoryObj<typeof meta>; 

export const Default: Story = {
    args: {
        profileImage: require("../../assets/Avatar.png") , 
        username: "John Doe",
    }
}

export const WithButton: Story = {
    args: {
        ...Default.args,
        variant: UserCardVariant.WITH_BUTTON,
        onPress: () => console.log("Button pressed"),
        actionLabel: "Follow"
    }
}