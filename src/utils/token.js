import { http } from "./http";

const key = "pc-key";
const setToken = (token) => {
  return window.localStorage.setItem(key, token);
};
const getToken = () => {
  return window.localStorage.getItem(key);
};
const clearToken = () => {
  return window.localStorage.clearItem(key);
};
const isAuth = () => {};

export { setToken, getToken, clearToken };
