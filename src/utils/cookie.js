import Cookies from "js-cookie";

export const getCookie = async (name) => {
  return await Cookies.get(name);
};

export const setCookie = (name, value, path = '') => {
  Cookies.set(name, value, { path: path });
  return true;
};

export const removeCookie = (name, path = '') => {
  Cookies.remove(name, { path: path })
};
