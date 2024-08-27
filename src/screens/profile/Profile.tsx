import {} from "@src/services/utils";
import React, { useContext, useState } from "react";
import { Button, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { Context } from "../auth/AuthContext";
import { uploadLogoUser } from "@src/services/api";

const Profile = ({
  navigation,
}: {
  navigation: StackNavigationProp<ParamListBase>;
}) => {
  const [image, setImage] =
    useState<ImagePicker.ImagePickerSuccessResult | null>(null);
  const { token } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert(
        "Desculpe, precisamos de permissões para acessar sua biblioteca de fotos!"
      );
      return;
    }

    // Abrir a biblioteca de imagens
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Somente imagens
      allowsEditing: true, // Permitir edição de imagem
      aspect: [3, 3], // Proporção da imagem
      quality: 1, // Qualidade da imagem
    });
    if (!result.canceled) {
      setImage(result); // Definir URI da imagem
    }
  };
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Desculpe, precisamos de permissões para acessar sua câmera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };
  function handleUploadLogo() {
    const formData = new FormData();
    formData.append("file", {
      uri: image?.assets[0].uri,
      type: image?.assets[0].mimeType,
      name: image?.assets[0].fileName,
      imageSize: image?.assets[0].fileSize,
    } as any);

    uploadLogoUser(formData, token)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  console.log(image);
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}></View>
      {/* <Button title="Selecionar Imagem" onPress={pickImage} />
      <Button
        title="Tirar Foto"
        onPress={takePhoto}
        style={{ marginTop: 10 }}
      />
      {image?.assets[0].uri ? (
        <Image source={{ uri: image.assets[0].uri }} style={styles.image} />
      ) : (
        <Text>Nenhuma imagem selecionada</Text>
      )}
      <Button title="Upload Image" onPress={handleUploadLogo} /> */}
    </View>
  );
};

export { Profile };
