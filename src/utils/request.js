/**
 * 封装 axios 请求模块
 */
import axios from "axios";
import store from "@/store";
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础路径
  // timeout: 3000, //超时时间
});

// 请求拦截器
request.interceptors.request.use(
  // 每次请求的网络配置
  (config) => {
    // const { data } = config.data;
    // console.log(data);
    //获取token
    const token = store.state.user.token.token;
    console.log(token);
    if (token) {
      config.headers.Authorization = token;
    }
    // console.log(config);
    return config;
  },
  // 请求失败的fanhui
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response) => {
    if (
      response.request.responseURL ===
      "http://localhost:8080/api/user-service/user/login"
    ) {
      return response;
    }
    // console.log(response);
    const { msg, success, status } = response.data;
    if (success || status) {
      return response.data;
    }
    return Promise.reject(new Error(msg));
  },
  (error) => {
    return Promise.reject(error);
  }
);
// console.dir(request);
export default request;
