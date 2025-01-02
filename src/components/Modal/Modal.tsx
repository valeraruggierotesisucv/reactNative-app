import { Modal as RNModal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function Modal({ visible, onClose, children }: ModalProps) {
    return (
        <RNModal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <TouchableOpacity 
                        style={styles.closeButton} 
                        onPress={onClose}
                    >
                        <Feather name="x" size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        {children}
                    </View>
                </View>
            </View>
        </RNModal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: '80%',
        maxWidth: 400,
        position: 'relative',
    },
    content: {
        margin: 24,
        marginTop: 48,
        marginBottom: 48,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    closeButton: {
        position: 'absolute',
        right: 16,
        top: 16,
        zIndex: 1,
    },
});
