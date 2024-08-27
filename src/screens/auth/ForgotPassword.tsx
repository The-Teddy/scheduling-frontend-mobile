import React, { useEffect, useState } from "react";
import {
  ButtonText,
  Container,
  StyledTextInput,
  styles,
  SubmitButton,
  Title,
} from "./styles";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "react-native";
import { ActivityIndicator } from "react-native";
import { recoveryPassword, sendCodeEmail } from "@src/services/api";
import {
  handleIsNumber,
  handleValidateEmail,
  handleValidateEmailCode,
} from "@src/services/utils";
import Toast from "react-native-toast-message";
import { View } from "react-native";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ForgotPassword = ({
  navigation,
}: {
  navigation: StackNavigationProp<ParamListBase>;
}) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [emailCode, setEmailCode] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [viewErrorCode, setViewErrorCode] = useState<boolean>(false);

  function handleRecoveryPassword() {
    if (!handleValidateEmail(email)) {
      return Toast.show({
        type: "error",
        text1: "Erro no email!",
        text2: "Insira um email válido!",
      });
    }
    if (changePassword) {
      console.log("ham?");
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
      if (emailCode) {
        const validateEmail = handleValidateEmailCode(emailCode);
        if (!validateEmail.isValid) {
          return Toast.show({
            type: "error",
            text1: "Código de email",
            text2: validateEmail.message,
          });
        }
      } else {
        return Toast.show({
          type: "error",
          text1: "Código de email",
          text2: "Insira o código de verificação",
        });
      }
      setLoading(true);
      const data = {
        email,
        password,
        codeEmail: emailCode,
      };
      recoveryPassword(data)
        .then((res) => {
          Toast.show({
            type: "info",
            text1: "Código de verificação",
            text2: res.data.message,
          });
          if (res.status === 201) {
            Toast.show({
              type: "success",
              text1: "Código de verificação",
              text2: res.data.message,
            });
            navigation.navigate("Login");
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 404) {
            return Toast.show({
              type: "error",
              text1: "Usuário não encontrado",
              text2: "Verifique o email",
            });
          }
          Toast.show({
            type: "error",
            text1: "Erro no servidor",
            text2: error.response.message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      sendCodeEmail(email)
        .then((res) => {
          Toast.show({
            type: "info",
            text1: "Código de verificação",
            text2: res.data.message,
          });
          setChangePassword(true);
        })
        .catch((error) => {
          console.error(error.message);
          setChangePassword(false);
          if (error.response.status === 404) {
            return Toast.show({
              type: "error",
              text1: "Usuário não encontrado",
              text2: "Verifique o email",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setEmail("");
      setChangePassword(false);
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <Container>
      <Title>Recuperar Senha</Title>
      <Text style={styles.labelInput}>Email:</Text>
      <StyledTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {changePassword ? (
        <>
          <Text style={styles.labelInput}>Nova Senha:</Text>
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
          <Text style={styles.labelInput}>Confirmação de Senha:</Text>
          <View style={styles.inputBox}>
            <StyledTextInput
              placeholder="Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!viewPassword}
              autoCapitalize="none"
              style={styles.inputBox.input}
            />
          </View>
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
          {viewErrorCode ? (
            <Text style={{ color: "red", marginTop: 5, textAlign: "center" }}>
              Erro: O email não foi verificado. {"\n"} Por favor, informe o
              código de verificação.
            </Text>
          ) : null}
        </>
      ) : (
        <></>
      )}
      <SubmitButton disabled={loading} onPress={handleRecoveryPassword}>
        {loading ? (
          <Text>
            <ActivityIndicator size="small" color="#fff" />
          </Text>
        ) : (
          <ButtonText>Enviar</ButtonText>
        )}
      </SubmitButton>
      <SubmitButton
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate("Login")}
      >
        <ButtonText>Voltar</ButtonText>
      </SubmitButton>
    </Container>
  );
};

export { ForgotPassword };
