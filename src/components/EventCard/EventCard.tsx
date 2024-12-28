import { ImageSourcePropType, Image, View, Text, StyleSheet } from "react-native";
import { UserCard, UserCardVariant } from "../UserCard/UserCard";
import { SocialInteractions } from "../SocialInteractions/SocialInteractions";
import { useState } from "react";
import { Chip, ChipVariant } from "../Chip/Chip";

interface EventCardProps{
    profileImage: ImageSourcePropType, 
    username: string, 
    eventImage: ImageSourcePropType, 
    title: string, 
    isLiked: boolean, 
    date: string, 
    onComment: () => void, 
    onShare: () => void, 
}

export function EventCard({
    profileImage, 
    username, 
    eventImage, 
    title,                      // max 28 caracteres
    isLiked, 
    date, 
    onComment, 
    onShare
}: EventCardProps){
    const [like, setLike] = useState(isLiked); 

    const handleLike = () => {
        setLike(!like)
    }
    return(
        <>
            <UserCard 
                profileImage={profileImage}
                username={username}
                variant={UserCardVariant.DEFAULT}
            />
            <Image 
                source={eventImage} 
                style= {{ height: 277}}                
            />
            <SocialInteractions 
                isLiked={like}
                onLike={handleLike}
                onComment={onComment}
                onShare={onShare}            
            />
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.chipContainer}>
                    <Chip
                        label={date}
                        variant={ChipVariant.LIGHT}
                    />
                </View>                
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row", 
        alignItems: "center",
    }, 
    chipContainer: {
        flex: 1, 
        alignItems: "flex-end",
        paddingRight: 10
    }, 
    title: {
        fontFamily: "Inter", 
        fontSize: 20, 
        fontWeight: "bold", 
        padding: 8, 
    }
})