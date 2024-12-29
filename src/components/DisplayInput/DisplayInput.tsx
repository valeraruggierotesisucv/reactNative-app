import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../../utils/theme";

interface DisplayInputProps {
    label: string, 
    data: React.ReactNode,
}

export function DisplayInput({
    label, 
    data, 
}: DisplayInputProps){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.data}>{data}</Text>
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

    data: {
        flex: 1,
        color: "gray",
    }
})