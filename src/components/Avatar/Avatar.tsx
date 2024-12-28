import { Image, ImageSourcePropType } from "react-native"; 

interface AvatarProps {
    source: ImageSourcePropType
}

export function Avatar({
    source
}: AvatarProps) {
    return(
        <Image 
            source={source}
            style={{ borderRadius: 500}}
        />
    )
}