import { TouchableOpacity, Text, StyleSheet} from "react-native";
import { theme } from "../../../utils/theme";

export enum ChipVariant {
    DEFAULT = "default", 
    LIGHT = "light"
}

interface ChipProps {
    label: string, 
    onPress?: () => void, 
    variant: ChipVariant
}
export function Chip({
    label, 
    onPress, 
    variant = ChipVariant.DEFAULT
}: ChipProps){
    return(
        <TouchableOpacity 
            onPress={onPress}
            style={styles.container}
        >
            <Text 
                style={[styles.label, styles[variant]]}
            >{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors['gray'], 
        alignItems: 'center', 
        justifyContent: "center", 
        minWidth: 80, 
        height: 25, 
        padding: 5, 
        borderRadius: 6
    }, 
    label: {
        fontSize: 12, 
        fontWeight: "regular"
    }, 
    default: {
        color: theme.colors['primary'],
    }, 
    light: {
        color: theme.colors['secondary']
    }
})