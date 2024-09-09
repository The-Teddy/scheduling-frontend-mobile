import { StatusBar, StyleSheet } from "react-native";
import { ThemeProvider } from "styled-components/native";
import COLORS from "@src/styles/theme";
import { Routes } from "./routes/routes";
import Toast from "react-native-toast-message";
import { AuthContextProvider } from "./screens/auth/AuthContext";
import NetInfo from "@react-native-community/netinfo";

NetInfo.fetch().then((state) => {
  if (!state.isConnected) {
    console.log("Sem conexão com a Internet");
  }
});
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
