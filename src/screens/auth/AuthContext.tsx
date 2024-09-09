import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { login } from "@src/services/api";
import { UserModel } from "./user.interface";
import {
  handleValidateEmail,
  handleValidateEmailCode,
} from "@src/services/utils";

interface AuthContextType {
  user: UserModel | null;
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  emailNotVerified: boolean;
  handleLogin: (email: string, senha: string, code: string | null) => void;
  handleLogout: () => void;
  setEmailNotVerified: (value: boolean) => void;
}

const defaultContextValue: AuthContextType = {
  user: null,
  token: "",
  isAuthenticated: false,
  loading: false,
  emailNotVerified: false,
  handleLogin: () => {},
  handleLogout: () => {},
  setEmailNotVerified: () => {},
};

const Context = createContext<AuthContextType>(defaultContextValue);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [emailNotVerified, setEmailNotVerified] = useState<boolean>(false);

  async function handleLogin(
    email: string,
    password: string,
    code: string | null
  ) {
    const data = {
      email: email.toLowerCase(),
      password,
      codeEmail: code ?? null,
    };
    if (!handleValidateEmail(email)) {
      return Toast.show({
        type: "error",
        text1: "Erro no email!",
        text2: "Insira um email válido.",
      });
    }
    if (password.length < 8) {
      return Toast.show({
        type: "error",
        text1: "Erro na senha!",
        text2: "Insira uma senha válida.",
      });
    }
    const validateEmail = handleValidateEmailCode(code);
    if (!validateEmail.isValid && emailNotVerified) {
      return Toast.show({
        type: "error",
        text1: "Código de email",
        text2: validateEmail.message,
      });
    }
    setLoading(true);
    login(data)
      .then((res) => {
        setToken(res.data.token);
        setUser(res.data.data);
        AsyncStorage.setItem("token", res.data.token);
        AsyncStorage.setItem("userData", JSON.stringify(res.data.data));
      })
      .catch((error) => {
        console.log(error.response.data.error);
        if (error.response.data.error.credentialsIsInvalid) {
          return Toast.show({
            type: "error",
            text1: "Credenciais inválidas",
            text2: error.response.data.error.message,
          });
        } else if (error.response.data.error.codeOrEmailInvalid) {
          setEmailNotVerified(true);
          return Toast.show({
            type: "error",
            text1: "Email não verificado",
            text2: error.response.data.error.message,
          });
        } else if (error.response.data.error.emailNotVerified) {
          setEmailNotVerified(true);
          return Toast.show({
            type: "error",
            text1: "Email não verificado",
            text2: error.response.data.error.message,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleLogout() {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userData");
    setToken("");
    setUser(null);
  }

  useEffect(() => {
    async function loadInitialData() {
      try {
        const storedToken = (await AsyncStorage.getItem("token")) || "";
        const userData = await AsyncStorage.getItem("userData");
        setToken(storedToken);
        setUser(userData ? JSON.parse(userData) : null);
      } catch (error) {
        console.log("Failed to load initial data", error);
      }
    }

    loadInitialData();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        emailNotVerified,
        handleLogin,
        handleLogout,
        setEmailNotVerified,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { AuthContextProvider, Context };
