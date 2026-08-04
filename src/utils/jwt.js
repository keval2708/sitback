const jwt = require("jsonwebtoken");
// import * as jose from 'jose'

export const encodeData = (data, key, name, storeToLocal = true) => {
  if (storeToLocal) {
    localStorage.setItem(name, jwt.sign(data, key));
  } else {
    return jwt.sign(data, key);
  }
};

export const decodeData = async (token, key) => {
  if (token) {
    return jwt.decode(token, key);
  }
  return null;
};

export const getDecodedData = (localKey, secureKey) => {
  if (typeof window !== "undefined") {
    const encodedData = localStorage.getItem(localKey);

    if (encodedData) {
      const data = decodeData(encodedData, secureKey);

      return data;
    }
  }
  return null;
};
