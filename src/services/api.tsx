import axios from "axios";
import config from "../../config.json";
import {
  LoginInterface,
  RecoveryPasswordInterface,
} from "@src/screens/auth/user.interface";

const api = config.REACT_APP_API_URL;

export function createUser(data: any) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return axios.post(`${api}/user/create`, data, {
    headers: headers,
  });
}
export function uploadLogoUser(data: FormData, token: string) {
  console.log(token);
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  return axios.put(`${api}/upload/logo`, data, { headers });
}
export function login(data: LoginInterface) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return axios.post(`${api}/auth/login`, data, {
    headers: headers,
  });
}
export function recoveryPassword(data: RecoveryPasswordInterface) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return axios.post(`${api}/auth/change-password`, data, { headers });
}
export function sendCodeEmail(email: string) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return axios.post(`${api}/email/send-code`, { email }, { headers });
}
