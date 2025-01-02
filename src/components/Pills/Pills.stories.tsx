import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Pills } from './Pills';

const meta = {
    title: 'Pills',
    component: Pills,
    decorators: [
        (Story) => (
            <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Pills>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        categories: [
            { id: 'all', label: 'All' },
            { id: 'concerts', label: 'Concerts' },
            { id: 'festivals', label: 'Festivals' },
            { id: 'clubs', label: 'Clubs' },
            { id: 'parties', label: 'Parties' },
        ],
        onSelectCategories: (categoryIds) => console.log('Selected categories:', categoryIds),
    },
};

export const WithPreselected: Story = {
    args: {
        categories: [
            { id: 'all', label: 'Category' },
            { id: 'food', label: 'Category' },
            { id: 'drinks', label: 'Category' },
            { id: 'desserts', label: 'Category' },
            { id: 'snacks', label: 'Category' },
        ],
        selectedCategories: ['food', 'drinks'],
        onSelectCategories: (categoryIds) => console.log('Selected categories:', categoryIds),
    },
};
