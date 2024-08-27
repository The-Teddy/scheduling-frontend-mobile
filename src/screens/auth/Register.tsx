import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  StyledTextInput,
  SubmitButton,
  ButtonText,
  styles,
} from "./styles";
import { createUser } from "@src/services/api";
import Toast from "react-native-toast-message";
import { ActivityIndicator, Text } from "react-native";
import { Pressable } from "react-native";
import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { handleValidateEmail } from "@src/services/utils";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Register = ({
  navigation,
}: {
  navigation: StackNavigationProp<ParamListBase>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  function handleRegister() {
    if (name.length < 3) {
      return Toast.show({
        type: "error",
        text1: "Erro no nome!",
        text2: "Insira o seu nome!",
      });
    }
    if (!handleValidateEmail(email)) {
      return Toast.show({
        type: "error",
        text1: "Erro no email!",
        text2: "Insira um email válido!",
      });
    }
    if (password.length < 8) {
      return Toast.show({
        type: "error",
        text1: "Erro na senha!",
        text2: "A senha precisar ter no minímo 8 caracteres!",
      });
    }
    if (password !== confirmPassword) {
      return Toast.show({
        type: "error",
        text1: "Erro na confirmação de senha!",
        text2: "Senha e confirmar senha não coincidem!",
      });
    }
    const data = {
      name,
      email,
      password,
    };
    setLoading(true);
    createUser(data)
      .then((res) => {
        if (res.status === 200) {
          Toast.show({
            type: "success",
            text1: "Registro",
            text2: "Conta registrada com sucesso!",
          });
          navigation.navigate("Login");
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  }
  useEffect(() => {
    navigation.addListener("blur", () => {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    });
  }, [navigation]);
  return (
    <Container>
      <Title>Registro de Conta</Title>
      <View style={styles.textLinkContainer}>
        <Text style={styles.text}>Já tem uma conta? </Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Login</Text>
        </Pressable>
      </View>
      <StyledTextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <StyledTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.inputBox}>
        <StyledTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!viewPassword}
          autoCapitalize="none"
          style={styles.inputBox.input}
        />

        <Pressable
          style={styles.inputBox.inputEye}
          onPress={() => setViewPassword(!viewPassword)}
        >
          <FontAwesome
            name={`${viewPassword ? "eye-slash" : "eye"}`}
            size={30}
            color="black"
          />
        </Pressable>
      </View>
      <StyledTextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!viewPassword}
        autoCapitalize="none"
      />
      <SubmitButton disabled={loading} onPress={handleRegister}>
        {loading ? (
          <Text>
            <ActivityIndicator size="small" color="#fff" />
          </Text>
        ) : (
          <ButtonText>Registrar</ButtonText>
        )}
      </SubmitButton>
    </Container>
  );
};

export { Register };
