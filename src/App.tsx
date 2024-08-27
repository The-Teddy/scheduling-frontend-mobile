import { StatusBar, StyleSheet } from "react-native";
import { ThemeProvider } from "styled-components/native";
import COLORS from "@src/styles/theme";
import { Routes } from "./routes/routes";
import Toast from "react-native-toast-message";
import { AuthContextProvider } from "./screens/auth/AuthContext";

function App() {
  return (
    <ThemeProvider theme={COLORS}>
      <StatusBar barStyle="light-content" />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
      <Toast visibilityTime={5000} />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export { App };
