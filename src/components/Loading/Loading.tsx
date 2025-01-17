import { StyleSheet, View, Text, ActivityIndicator} from "react-native";
import { useTranslation } from "react-i18next";
import { theme } from "../../../utils/theme";

export function Loading(){
     const { t } = useTranslation();
    return(
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.black} />
            <Text style={styles.loadingText}>{t("common.loading")}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors["white"],
  },
  view: {
    flex: 1,
    width: "100%",
  },   
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors['black'],
  },
});