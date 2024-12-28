import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize, ButtonVariant } from './Button';

const meta = {
  title: 'MyButton',
  component: Button, 
  decorators: [
    (Story : StoryObj) => (
      <View style={{ padding: 16, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ExtraSmall: Story = {
  args: {
    label: "Extra small", 
    onPress: () => console.log("Button pressed "), 
    size: ButtonSize.EXTRA_SMALL, 
    variant: ButtonVariant.PRIMARY
  }
};

export const Small: Story = {
  args: {
    label: "Small", 
    onPress: () => console.log("Button pressed "), 
    size: ButtonSize.SMALL, 
    variant: ButtonVariant.PRIMARY
  }
};

export const Medium: Story = {
  args: {
    label: "Medium", 
    onPress: () => console.log("Button pressed "), 
    size: ButtonSize.MEDIUM, 
    variant: ButtonVariant.PRIMARY
  }
};

export const Large: Story = {
  args: {
    label: "Large", 
    onPress: () => console.log("Button pressed "), 
    size: ButtonSize.LARGE, 
    variant: ButtonVariant.PRIMARY
  }
};
