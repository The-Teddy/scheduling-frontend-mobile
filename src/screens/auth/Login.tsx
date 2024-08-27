import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Title,
  StyledTextInput,
  SubmitButton,
  ButtonText,
  styles,
} from "./styles";
import { Text } from "react-native";
import { Context } from "./AuthContext";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { handleIsNumber } from "@src/services/utils";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Login = ({
  navigation,
}: {
  navigation: StackNavigationProp<ParamListBase>;
}) => {
  const [emailCode, setEmailCode] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [viewErrorCode, setViewErrorCode] = useState<boolean>(false);
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const { loading, handleLogin, emailNotVerified, setEmailNotVerified } =
    useContext(Context);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    setViewErrorCode(emailNotVerified);
  }, [emailNotVerified]);

  useEffect(() => {
    navigation.addListener("blur", () => {
      setEmail("");
      setPassword("");
      setViewErrorCode(false);
      setEmailNotVerified(false);
      setEmailCode(null);
      setViewPassword(false);
    });
  }, [navigation]);

  return (
    <Container>
      <Title>Login</Title>
      <View style={styles.textLinkContainer}>
        <Text style={styles.text}>Ainda não possui conta? </Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Registrar</Text>
        </Pressable>
      </View>
      <Text style={styles.labelInput}>Email:</Text>
      <StyledTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <Text style={styles.labelInput}>Senha:</Text>
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
      {emailNotVerified ? (
        <>
          <Text style={styles.labelInput}>Código de verificação:</Text>
          <StyledTextInput
            placeholder="Exemplo: 528931"
            value={emailCode}
            onChangeText={(code: string) => [
              setEmailCode(handleIsNumber(code)),
              setViewErrorCode(false),
            ]}
            autoCapitalize="none"
            maxLength={6}
          />
        </>
      ) : null}
      {viewErrorCode ? (
        <Text style={{ color: "red", marginTop: 5, textAlign: "center" }}>
          Erro: O email não foi verificado. {"\n"} Por favor, informe o código
          de verificação.
        </Text>
      ) : null}

      <SubmitButton
        disabled={loading}
        onPress={() => {
          handleLogin(email, password, emailCode);
        }}
      >
        {loading ? (
          <Text>
            <ActivityIndicator size="small" color="#fff" />
          </Text>
        ) : (
          <ButtonText>Entrar</ButtonText>
        )}
      </SubmitButton>
      <View style={styles.textLinkContainer}>
        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </Pressable>
      </View>
    </Container>
  );
};

export { Login };
