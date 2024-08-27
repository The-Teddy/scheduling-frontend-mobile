import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Container } from "../inputs/styles";
import {
  ButtonText,
  StyledTextInput,
  SubmitButton,
  Title,
} from "@src/screens/auth/styles";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native";

const ConfirmEmail = ({
  navigation,
}: {
  navigation: StackNavigationProp<ParamListBase>;
}) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleConfirmEmail(email: string) {}
  return (
    <Container>
      <Title>Confirmar Email</Title>
      <StyledTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <SubmitButton
        disabled={loading}
        onPress={() => {
          handleConfirmEmail(email);
        }}
      >
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

export { ConfirmEmail };
