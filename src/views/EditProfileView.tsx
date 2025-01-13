import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { useTranslation } from "../contexts/TranslationContext";
import { useNavigation } from "@react-navigation/native";
import { Button, ButtonSize } from "../components/Button/Button";
import { theme } from "../../utils/theme";
import { InputField } from "../components/InputField/InputField";
import { useImagePicker } from "../hooks/useImagePicker";
import { Avatar } from "../components/Avatar/Avatar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ProfileRoutes } from "../../utils/routes";



export function EditProfileView() {
    
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const { t } = useTranslation();
  const { isModalVisible, imageUri, openCamera, openGallery, setModalVisible } = useImagePicker();
  const [image, setImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [biography, setBiography] = useState<string>("");

  useEffect(() => {
    setImage(imageUri);
  }, [imageUri]);

  const profileImage = () => {
    return (
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profileImageContainer}>    
          <Avatar
          size={100}
          source={image ? image : "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1"}
          />
          <View style={styles.cameraIcon}>
            <MaterialCommunityIcons name="camera" size={24} color={"#fff"} />
          </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader
          title={t("editProfile.title")}
          goBack={() => navigation.goBack()}
        />
        <View style={styles.content}>
          {profileImage()}
          <InputField
            label={t("editProfile.fullName")}
            value={fullName}
            onChangeText={setFullName}
            icon={"account"}
            secureTextEntry={false}
            onPressIcon={() => {}}
            variant={"grayBackground"}
          />
          <InputField
            label={t("editProfile.biography")}
            value={biography}
            onChangeText={setBiography}
            icon={"book-open"}
            secureTextEntry={false}
            onPressIcon={() => {}}
            variant={"grayBackground"}
          />
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Button
              label={t("editProfile.save")}
              onPress={() => navigation.navigate(ProfileRoutes.Profile)}
              size={ButtonSize.MEDIUM}
            />
          </View>
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity onPress={openCamera} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>{t("addEvent.take_photo")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>
                {t("addEvent.choose_from_gallery")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>{t("common.cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors["white"],
  },
  scrollViewContent: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 46,
    alignItems: "center",
    marginBottom: 56,
    marginTop: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalButton: {
    backgroundColor: "transparent",
    margin: 10,
    borderRadius: 20,
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Semibold",
    textAlign: "center",
    color: "#007AFF",
  },
  modalButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "white",
    width: "60%",
    padding: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "SF-Pro-Text-Regular",
    color: theme.colors['black'],
    marginBottom: 5,
    textAlign: "left",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors["primary"],
    borderRadius: 500,
    padding: 10,
  },
  profileImageContainer: {
    position: "relative",

  },
});
