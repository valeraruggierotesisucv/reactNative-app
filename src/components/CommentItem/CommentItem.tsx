import { View, Text, StyleSheet, Image, TouchableOpacity, LayoutChangeEvent } from "react-native";
import { formatDate } from "../../../utils/formatDate";
import { useState } from "react";

const MAX_LINES = 3;
const MIN_LINES = 3;

interface CommentItemProps {
    username: string;
    comment: string;
    timestamp: Date;
    likes?: number;
    userAvatar?: string;
    onLike?: () => void;
    onReply?: () => void;
}

export function CommentItem({
    username,
    comment,
    timestamp,
    likes = 0,
    userAvatar,
    onLike,
    onReply
}: CommentItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [textHeight, setTextHeight] = useState(0);
    const [hasTextOverflow, setHasTextOverflow] = useState(false);
    
    const formattedTimestamp = formatDate(timestamp);

    const onTextLayout = (e: LayoutChangeEvent) => {
        const lineHeight = styles.commentText.lineHeight || 20;
        const maxHeight = lineHeight * MIN_LINES;
        setTextHeight(e.nativeEvent.layout.height);
        setHasTextOverflow(e.nativeEvent.layout.height > maxHeight);
    };

    return (
        <View style={styles.container}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
                {userAvatar ? (
                    <Image 
                        source={{ uri: userAvatar }} 
                        style={styles.avatar}
                    />
                ) : (
                    <View style={[styles.avatar, styles.defaultAvatar]} />
                )}
            </View>

            {/* Comment Content */}
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.timestamp}>{formattedTimestamp}</Text>
                </View>
                
                <View>
                    <Text 
                        style={styles.commentText}
                        numberOfLines={isExpanded ? undefined : MAX_LINES}
                        onLayout={onTextLayout}
                    >
                        {comment}
                    </Text>
                    
                    {hasTextOverflow && (
                        <TouchableOpacity 
                            onPress={() => setIsExpanded(!isExpanded)}
                            style={styles.seeMoreButton}
                        >
                            <Text style={styles.seeMoreText}>
                                {isExpanded ? 'See less' : 'See more'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Actions */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={onReply} style={styles.action}>
                        <Text style={styles.actionText}>Reply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 12,
        alignSelf: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 500,
    },
    defaultAvatar: {
        backgroundColor: '#DDDDDD',
    },
    contentContainer: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    username: {
        fontWeight: '600',
        fontSize: 14,
        marginRight: 8,
    },
    timestamp: {
        color: '#666666',
        fontSize: 12,
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333333',
        marginBottom: 4,
    },
    seeMoreButton: {
        marginBottom: 8,
    },
    seeMoreText: {
        color: '#666666',
        fontSize: 14,
        fontWeight: '600',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    action: {
        marginRight: 16,
    },
    actionText: {
        color: '#666666',
        fontSize: 12,
    },
});