import { InitDataSchema } from "../core/private/Private.schema";

const tokenKey = "token";
const userKey = "user";

export const getStorageData = () => {
  let token: any | null = null;
  try {
    token = JSON.parse(localStorage.getItem(tokenKey) as string);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("Get Token Err", err);
  }

  return token;
};

export const setToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

export const getToken = (): string | null => {
  if (localStorage.getItem(tokenKey)) {
    return localStorage.getItem(tokenKey);
  }
  return null;
};

export const setUsersInfo = (userData: InitDataSchema) => {
  localStorage.setItem(userKey, JSON.stringify(userData));
};

export const getUserData = (): InitDataSchema | null => {
  let userData = localStorage.getItem(userKey);
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};
