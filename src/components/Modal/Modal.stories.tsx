import { View, Text, Image } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { useState } from 'react';

const meta = {
    title: 'Modal',
    component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        visible: true,
        onClose: () => {},
        children: <View><Text>Hello</Text></View>,
    },
    render: (args) => {
        const [visible, setVisible] = useState(true);

        return (
            <Modal 
                {...args} 
                visible={visible} 
                onClose={() => setVisible(false)}
            >   
                    <Image source={require('../../../assets/icon.png')} style={{ width: 200, height: 200, marginBottom: 16 }} />
                    <Text style={{ 
                        fontSize: 18, 
                        fontWeight: '600',
                        textAlign: 'center',
                        marginBottom: 8,
                    }}>
                        Tu evento se ha publicado con éxito
                    </Text>
            </Modal>
        );
    },
};
