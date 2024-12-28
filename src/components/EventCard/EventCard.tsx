import { ImageSourcePropType, Image } from "react-native";
import { UserCard, UserCardVariant } from "../UserCard/UserCard";
import { SocialInteractions } from "../SocialInteractions/SocialInteractions";
import { useState } from "react";

interface EventCardProps{
    profileImage: ImageSourcePropType, 
    username: string, 
    eventImage: ImageSourcePropType, 
    isLiked: boolean, 
    onComment: () => void, 
    onShare: () => void
}

export function EventCard({
    profileImage, 
    username, 
    eventImage, 
    isLiked, 
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
        </>
    )
}