import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { Context } from "../auth/AuthContext";
import Toast from "react-native-toast-message";

const Home = ({ navigation }: { navigation: any }) => {
  const { user, handleLogout } = useContext(Context);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text>Hello, {user?.name}</Text>
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      <Button
        title="Logout"
        onPress={() => {
          handleLogout(),
            Toast.show({
              type: "success",
              text1: "Logout!",
              text2: "Logout efetuado com sucesso!",
            });
        }}
      />
    </View>
  );
};

export { Home };
