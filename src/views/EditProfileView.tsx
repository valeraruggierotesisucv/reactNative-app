import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal as RNModal, Alert  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileStackNavigationProp } from "../navigators/ProfileStack";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Button, ButtonSize } from "../components/Button/Button";
import { theme } from "../../utils/theme";
import { InputField } from "../components/InputField/InputField";
import { useImagePicker } from "../hooks/useImagePicker";
import { Avatar } from "../components/Avatar/Avatar";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal } from "../components/Modal/Modal";
import { useAuth } from "../contexts/AuthContext";
import { IMAGE_PLACEHOLDER } from "../../utils/consts";
import { EditProfileController } from "../controllers/EditProfileController";
import { Formik } from "formik";
import { FileTypeEnum } from "../services/storage";
import { Loading } from "../components/Loading/Loading";
import { FileController } from "../controllers/FileController";

export function EditProfileView() {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const { t } = useTranslation();
  const { isModalVisible, imageUri, openCamera, openGallery, setModalVisible } = useImagePicker();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const { user, session } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (user && session) {
        try {
          setIsLoading(true);
          const response = await EditProfileController.getProfile(session?.access_token, user.id);
          setProfileImage(response.profileImage || IMAGE_PLACEHOLDER);
          setOriginalImage(response.profileImage || IMAGE_PLACEHOLDER);
          setFullName(response.fullName);
          setBiography(response.biography || "");
          setIsLoading(false);
        } catch (error) {
          console.error("Error in EditProfileView:", error);
          Alert.alert("Error", (error as Error).message);
        }
      }
    };
    getUser();
  }, []);



  const handleSubmit = async (values: {fullName: string, biography: string, image: string| null}) => {
    if (user && session) {
        try {
          let imageUrl: string | undefined = undefined;
          if(imageUri && originalImage){
              await FileController.deleteFile(originalImage, FileTypeEnum.IMAGE);
              imageUrl = await FileController.uploadFile(imageUri, FileTypeEnum.IMAGE); 
          }
          await EditProfileController.updateProfile(session?.access_token, user.id, {
            fullName: values.fullName,
            profileImage: imageUrl,
            biography: values.biography,
          });
          setSuccessModalVisible(true);
        } catch (error) {
          console.error("Error in EditProfileView:", error);
          Alert.alert("Error", (error as Error).message);
        }
      }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppHeader
          title={t("editProfile.title")}
          goBack={() => navigation.goBack()}
        />
        {isLoading ? (
          <Loading />
        ) : ( 
        <Formik
          enableReinitialize
          initialValues={{
            fullName: fullName,
            biography: biography,
            image: profileImage,
          }}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, setFieldValue, isSubmitting, dirty }) => {
            useEffect(() => {
              if(imageUri){
                setFieldValue("image", imageUri);
              }
            }, [imageUri]);
          
          return(
            <View style={styles.content}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={styles.profileImageContainer}
              >
                <Avatar
                  size={100}
                  source={values.image ? values.image : IMAGE_PLACEHOLDER}
                />
                <View style={styles.cameraIcon}>
                  <AntDesign name="camera" size={24}  color="white"/>
                </View>
              </TouchableOpacity>
              <InputField
                label={t("editProfile.fullName")}
                value={values.fullName}
                onChangeText={handleChange("fullName")}
                icon={"account"}
                secureTextEntry={false}
                onPressIcon={() => {}}
                variant={"grayBackground"}
              />
              <InputField
                label={t("editProfile.biography")}
                value={values.biography}
                onChangeText={handleChange("biography")}
                icon={"book-open"}
                secureTextEntry={false}
                onPressIcon={() => {}}
                variant={"grayBackground"}
              />
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Button
                  label={t("editProfile.save")}
                  onPress={handleSubmit}
                  size={ButtonSize.MEDIUM}
                  disabled={!dirty || isSubmitting} 
                />
                </View>
              </View>
            );
          }}
        </Formik>
        )}

      <Modal 
        visible={successModalVisible} 
        onClose={() => {setSuccessModalVisible(false); navigation.goBack()}}
      >   
        <Image source={require('../../assets/images/Onboarding.png')} style={{ width: 200, height: 200, marginBottom: 16 }} />  
        <Text style={{ 
            fontSize: 18, 
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 8,
        }}>
            {t("editProfile.profile_updated")}
        </Text>
      </Modal>


        <RNModal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                onPress={() => {
                  openCamera();
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>{t("addEvent.take_photo")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  openGallery();
                }}
                style={styles.modalButton}
              >
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
        </RNModal>
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
    color: theme.colors['secondary'],
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
    bottom: -5,
    right: -5,
    backgroundColor: theme.colors["primary"],
    borderRadius: 500,
    padding: 10,
  },
  profileImageContainer: {
    position: "relative",
  },
});
