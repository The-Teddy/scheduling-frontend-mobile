declare module "*.png";
declare module "styled-components/native";
declare module "react-native";
declare module "jwt-decode";

declare module "react-native-toast-message" {
  import { Component } from "react";
  export default class Toast extends Component<any, any> {
    static show(options: {
      type: "success" | "error" | "info";
      text1: string;
      text2?: string;
      position?: "top" | "bottom";
      visibilityTime?: number;
    }): void;
  }
}
