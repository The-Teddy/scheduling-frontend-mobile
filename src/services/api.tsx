import axios from "axios";
import config from "../../config.json";
import {
  LoginInterface,
  RecoveryPasswordInterface,
} from "@src/screens/auth/user.interface";
import { handleGetHeaders } from "./utils";

const api = config.REACT_APP_API_URL;

//Rotas "públicas"
export function createUser(data: any) {
  return axios.post(`${api}/user/create`, data, {
    headers: handleGetHeaders("application/json"),
  });
}
export function login(data: LoginInterface) {
  return axios.post(`${api}/auth/login`, data, {
    headers: handleGetHeaders("application/json"),
  });
}

export function recoveryPassword(data: RecoveryPasswordInterface) {
  return axios.post(`${api}/auth/change-password`, data, {
    headers: handleGetHeaders("application/json"),
  });
}
export function sendCodeEmail(email: string) {
  return axios.post(
    `${api}/email/send-code`,
    { email },
    { headers: handleGetHeaders("application/json") }
  );
}

//Rotas "privadas"
export function uploadLogoUser(data: FormData, token: string) {
  return axios.put(`${api}/upload/logo`, data, {
    headers: handleGetHeaders("multipart/form-data", token),
  });
}
export function uploadCoverUser(data: FormData, token: string) {
  return axios.put(`${api}/upload/cover`, data, {
    headers: handleGetHeaders("multipart/form-data", token),
  });
}
export function getUser(token: string) {
  return axios.get(`${api}/user`, {
    headers: handleGetHeaders("application/json", token),
  });
}
