import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { useNavigation } from "@react-navigation/native";

export function ProfileDetailsView() {
    const navigation = useNavigation<ProfileStackNavigationProp>();
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <AppHeader title="Detalles del Perfil" goBack={navigation.goBack} />
                

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingTop: 20
    },
});