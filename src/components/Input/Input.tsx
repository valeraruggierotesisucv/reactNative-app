import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../../utils/theme";
import { MaterialIcons } from "@expo/vector-icons";

export enum InputVariant {
    DEFAULT = "default", 
    ARROW = "arrow"
}

interface InputProps {
    label: string, 
    placeholder: string, 
    variant: InputVariant
}

export function Input({
    label, 
    placeholder, 
    variant = InputVariant.DEFAULT
}: InputProps){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.placeholder}>{placeholder}</Text>
            {
                variant === InputVariant.ARROW
                ?   <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
                :   null
            }            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {        
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: theme.colors['gray']
    }, 

    label: {
        flex: 0.45,
        fontWeight: "bold",
    },

    placeholder: {
        flex: 1,
        color: "gray",
    }
})