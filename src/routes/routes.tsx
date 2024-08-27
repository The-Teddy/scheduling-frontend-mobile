import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "@src/screens/home/Home";
import { Profile } from "@src/screens/profile/Profile";
import { Login } from "@src/screens/auth/Login";
import { Register } from "@src/screens/auth/Register";
import { Context } from "@src/screens/auth/AuthContext";
import { ForgotPassword } from "@src/screens/auth/ForgotPassword";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { user, token } = useContext(Context);

  return (
    <NavigationContainer>
      {token?.length > 200 && user !== null && user !== undefined ? (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Register" component={Register}></Stack.Screen>
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
          ></Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export { Routes };
