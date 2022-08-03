import Cookies from "js-cookie";

const TokenKey = "vue_admin_template_token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

// 存储用户用户登录时间戳
export const setTokenTime = () => {
  Cookies.set("tokenTime", Date.now());
};
//获取用户登录事件戳
export const getTokenTime = () => {
  return Cookies.get("tokenTime");
};
