import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
    title: 'Tabs',
    component: Tabs,
    decorators: [
        (Story) => (
            <View style={{ flex: 1, padding: 16 }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tabs: [
            { id: 'eventos', label: 'Eventos' },
            { id: 'eventos2', label: 'Eventos' },
            { id: 'eventos3', label: 'Eventos' },
        ],
        onTabChange: (tabId) => console.log('Tab changed:', tabId),

    },
};
