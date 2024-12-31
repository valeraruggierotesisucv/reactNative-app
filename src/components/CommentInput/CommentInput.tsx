import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

interface CommentInputProps {
    onSubmit?: (comment: string) => void;
    placeholder?: string;
}

export function CommentInput({ onSubmit, placeholder = "Add a comment..." }: CommentInputProps) {
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        if (comment.trim()) {
            onSubmit?.(comment);
            setComment("");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={comment}
                onChangeText={setComment}
                placeholder={placeholder}
                placeholderTextColor="#666"
                multiline
                maxLength={1000}
                onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity 
                style={[styles.sendButton]} 
                onPress={handleSubmit}
                disabled={!comment.trim()}
            >
                <View style={styles.iconContainer}>
                    <Feather 
                        name="send" 
                        size={24} 
                        color={!comment.trim() ? "gray" : "black"} 
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'white',

    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        marginRight: 10,
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: 'transparent',
    },
    sendArrow: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        transform: [{ rotate: '90deg' }],
    },
    iconContainer: {
        transform: [{ rotate: '45deg' }]
    },
});