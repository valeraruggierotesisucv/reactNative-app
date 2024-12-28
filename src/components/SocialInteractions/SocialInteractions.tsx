import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity} from "react-native";

interface SocialInteractionsProps {
    isLiked: boolean, 
    onLike: () => void, 
    onComment: () => void, 
    onShare: () => void
}

export function SocialInteractions({
    isLiked, 
    onLike, 
    onComment, 
    onShare
}: SocialInteractionsProps) {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onLike}>
                <AntDesign name={ isLiked ? "heart" : "hearto"} size={26} color="black" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onComment}>
                <FontAwesome5 name="comment-alt" size={23} color="black" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onShare}>
                <Feather name="send" size={24} color="black" />
            </TouchableOpacity>            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        gap: 14, 
        padding: 5
    }
})