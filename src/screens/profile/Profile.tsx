import { handleGetEnvVariable } from "@src/services/utils";
import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { Context } from "../auth/AuthContext";
import { getUser, uploadCoverUser, uploadLogoUser } from "@src/services/api";
import { UserInterface } from "./UserInterface";
import profileImage from "@src/assets/images/profile.png";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ConfirmModal } from "@src/components/partials/ConfirmModal";
import { StyledTextInput } from "../auth/styles";

const Profile = ({
  navigation,
}: {
  navigation: StackNavigationProp<ParamListBase>;
}) => {
  const [imageLogo, setImageLogo] =
    useState<ImagePicker.ImagePickerSuccessResult | null>(null);
  const [imageCover, setImageCover] =
    useState<ImagePicker.ImagePickerSuccessResult | null>(null);
  const { token } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserInterface | null>(null);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [document, setDocument] = useState<string>("");
  const [isProfile, setIsProfile] = useState<boolean>(false);

  const pickImage = async (isCover: boolean) => {
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
      quality: 1,
    });
    if (!result.canceled) {
      setViewModal(true);
      if (isCover) {
        setImageCover(result);
      } else {
        setImageLogo(result);
      }
    }
  };

  function handleUploadLogo() {
    const formData = new FormData();
    formData.append("file", {
      uri: imageLogo?.assets[0].uri,
      type: imageLogo?.assets[0].mimeType,
      name: imageLogo?.assets[0].fileName,
      imageSize: imageLogo?.assets[0].fileSize,
    } as any);

    setLoading(true);
    formData.append("old_path_logo", data?.logo ? data.logo : "");
    uploadLogoUser(formData, token)
      .then((res) => {
        setViewModal(false);
        handleGetUser();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleUpdateCover() {
    const formData = new FormData();

    formData.append("file", {
      uri: imageCover?.assets[0].uri,
      type: imageCover?.assets[0].mimeType,
      name: imageCover?.assets[0].fileName,
      imageSize: imageCover?.assets[0].fileSize,
    } as any);

    formData.append("old_path_cover", data?.cover ? data.cover : "");

    setLoading(true);
    uploadCoverUser(formData, token)
      .then((res) => {
        handleGetUser();
        setViewModal(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleGetUser() {
    setLoading(true);
    getUser(token)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: handleGetEnvVariable() + "/" + data?.cover }}
          style={[{}, styles.containerImage]}
        >
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
                  imageLogo?.assets[0]?.uri
                    ? { uri: imageLogo.assets[0].uri }
                    : data?.logo
                    ? { uri: handleGetEnvVariable() + "/" + data.logo }
                    : profileImage
                }
                style={[{ opacity: loading ? 0.5 : 1 }, styles.image]}
              />
            </View>

            <TouchableOpacity
              style={styles.containerIcon}
              onPress={() => {
                setIsProfile(true), pickImage(false);
              }}
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
            onPress={() => {
              setIsProfile(false), pickImage(true);
            }}
            style={[styles.containerIcon, { right: 20, bottom: 15 }]}
          >
            <FontAwesome
              style={styles.cameraIcon}
              name="camera"
              size={25}
              color="black"
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.containerContent}>
          <Text style={styles.title}>Dados do usuário</Text>
          <Text style={styles.labelInput}>Nome Fantasia:</Text>
          <StyledTextInput
            placeholder="João Augusto"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <Text style={styles.labelInput}>Email:</Text>
          <StyledTextInput
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <Text style={styles.labelInput}>Documento:</Text>
          <StyledTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
      </View>
      <ConfirmModal
        title="Você realmente desejar salvar esta foto?"
        loading={loading}
        handleSubmit={() =>
          isProfile ? handleUploadLogo() : handleUpdateCover()
        }
        setView={viewModal}
        handleViewModal={() => setViewModal(false)}
      />
    </>
  );
};

export { Profile };
