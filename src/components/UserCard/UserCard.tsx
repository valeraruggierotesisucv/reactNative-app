import { View, Image, Text, ImageSourcePropType } from "react-native";
import { StyleSheet } from "react-native";
import { Button, ButtonSize} from "../Button/Button";
import { Avatar } from "../Avatar/Avatar";

export enum UserCardVariant{
    DEFAULT = "default", 
    WITH_BUTTON = "withButton"
}

interface UserCardProps {
    profileImage: ImageSourcePropType, 
    username: string, 
    variant?: UserCardVariant, 
    onPress?: () => void, 
    actionLabel?: string
}

export function UserCard({
    profileImage, 
    username, 
    variant = UserCardVariant.DEFAULT, 
    onPress, 
    actionLabel
}: UserCardProps){
    return(
        <View style={styles.container}>
            <View style={styles.user}>
                <Avatar source={profileImage}/>
                <Text style={styles.text}>{username}</Text>
            </View>
            { variant === UserCardVariant.WITH_BUTTON && (
                <View style={{ padding: 10}}>
                    <Button 
                        label={actionLabel || 'Action'}
                        onPress={onPress ?? (() => {})}
                        size={ButtonSize.EXTRA_SMALL}
                    />
                </View>
            )}           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        alignItems: 'center',
    }, 
    user: {
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 5,
        flex: 1
    }, 
    text: {
        padding: 5
    }
})