import { handleGetEnvVariable } from "@src/services/utils";
import React, { useContext, useEffect, useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { Context } from "../auth/AuthContext";
import { getUser, uploadLogoUser } from "@src/services/api";
import profileImage from "@src/assets/images/profile.png";
import { UserInterface } from "./UserInterface";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import { ProfilePhotoModal } from "@src/components/partials/ProfilePhotoModal";
import { Alert } from "react-native";

const Profile = ({
  navigation,
}: {
  navigation: StackNavigationProp<ParamListBase>;
}) => {
  const [image, setImage] =
    useState<ImagePicker.ImagePickerSuccessResult | null>(null);
  const { token } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserInterface | null>(null);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [isProfile, setIsProfile] = useState<boolean>(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert(
        "Desculpe, precisamos de permissões para acessar sua biblioteca de fotos!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      // aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result);
      handleUploadLogo();
    }
  };
  // const takePhoto = async () => {
  //   const { status } = await ImagePicker.requestCameraPermissionsAsync();

  //   if (status !== "granted") {
  //     alert("Desculpe, precisamos de permissões para acessar sua câmera");
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync({
  //     allowsEditing: true,
  //     aspect: [3, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImage(result);
  //   }
  // };
  function handleUploadLogo() {
    const formData = new FormData();
    formData.append("file", {
      uri: image?.assets[0].uri,
      type: image?.assets[0].mimeType,
      name: image?.assets[0].fileName,
      imageSize: image?.assets[0].fileSize,
    } as any);

    setLoading(true);
    setViewModal(false);

    uploadLogoUser(formData, token)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleGetUser() {
    getUser(token)
      .then((res) => {
        res.data.data.logo = handleGetEnvVariable() + "/" + res.data.data.logo;
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }
  useEffect(() => {
    handleGetUser();
  }, []);
  console.log(data?.logo);
  return (
    <>
      <View style={styles.container}>
        <View style={[{}, styles.containerImage]}>
          <View style={styles.containerLogo}>
            <View style={styles.logoBox}>
              {loading ? (
                <ActivityIndicator
                  style={{ position: "absolute" }}
                  size="large"
                  color="#000"
                />
              ) : (
                ""
              )}
              <Image
                source={
                  image?.assets[0]?.uri
                    ? { uri: image.assets[0].uri }
                    : data?.logo
                    ? { uri: data.logo }
                    : profileImage
                }
                style={[{ opacity: loading ? 0.5 : 1 }, styles.image]}
              />
            </View>

            <TouchableOpacity
              style={styles.containerIcon}
              onPress={() => [setIsProfile(true), setViewModal(true)]}
            >
              <FontAwesome
                style={styles.cameraIcon}
                name="camera"
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => [setIsProfile(false), setViewModal(true)]}
            style={[styles.containerIcon, { right: 20, bottom: 15 }]}
          >
            <FontAwesome
              style={styles.cameraIcon}
              name="camera"
              size={25}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ProfilePhotoModal
        handleViewPhoto={() =>
          isProfile ? Alert.alert("é perfil") : Alert.alert("é capa")
        }
        handleChoosePhoto={() =>
          isProfile ? pickImage() : Alert.alert("é capa")
        }
        isProfile={isProfile}
        setView={viewModal}
        handleViewModal={() => setViewModal(false)}
      />
    </>
  );
};

export { Profile };
