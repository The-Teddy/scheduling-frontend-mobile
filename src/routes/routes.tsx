import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "@src/screens/home/Home";
import { Profile } from "@src/screens/profile/Profile";
import { Login } from "@src/screens/auth/Login";
import { Register } from "@src/screens/auth/Register";
import { Context } from "@src/screens/auth/AuthContext";
import { ForgotPassword } from "@src/screens/auth/ForgotPassword";
import { TopTabs } from "@src/screens/TopTabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Routes = () => {
  const { user, token } = useContext(Context);

  return (
    <NavigationContainer>
      {token?.length > 200 && user !== null && user !== undefined ? (
        // <Stack.Navigator
        //   initialRouteName="Home"
        //   screenOptions={{ headerShown: false }}
        // >
        //   <Stack.Screen name="TopTabs" component={TopTabs}></Stack.Screen>
        //   {/* <Stack.Screen name="Profile" component={Profile}></Stack.Screen> */}
        // </Stack.Navigator>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
        </Drawer.Navigator>
        // <Stack.Navigator
        //   initialRouteName="Login"
        //   screenOptions={{ headerShown: false }}
        // >
        //   <Stack.Screen name="Login" component={Login}></Stack.Screen>
        //   <Stack.Screen name="Register" component={Register}></Stack.Screen>
        //   <Stack.Screen
        //     name="ForgotPassword"
        //     component={ForgotPassword}
        //   ></Stack.Screen>
        // </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export { Routes };
