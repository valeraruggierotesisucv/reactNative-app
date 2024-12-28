import { ImageSourcePropType, Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserCard, UserCardVariant } from "../UserCard/UserCard";
import { SocialInteractions } from "../SocialInteractions/SocialInteractions";
import { useState } from "react";
import { Chip, ChipVariant } from "../Chip/Chip";
import { theme } from "../../../utils/theme";

interface EventCardProps{
    profileImage: ImageSourcePropType, 
    username: string, 
    eventImage: ImageSourcePropType, 
    title: string, 
    description: string, 
    isLiked: boolean, 
    date: string, 
    onComment: () => void, 
    onShare: () => void, 
    onMoreDetails: () => void
}

export function EventCard({
    profileImage, 
    username, 
    eventImage,                 // falta este campo en la db 
    title,                      // max 28 caracteres
    description, 
    isLiked, 
    date, 
    onComment, 
    onShare, 
    onMoreDetails
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
            <Text style={styles.description} numberOfLines={3}>
                {description}
            </Text>
            <TouchableOpacity onPress={onMoreDetails}>
                <Text style={styles.details}>
                    Ver más detalles ...
                </Text>
            </TouchableOpacity>
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
    }, 
    description: {
        fontFamily: "Inter", 
        fontSize: 13, 
        fontWeight: "regular", 
        padding: 10, 
        justifyContent: "space-evenly"
    }, 
    details: {
        color: theme.colors["darkGray"], 
        textAlign: "center"
    }
})