/**
 * 封装 axios 请求模块
 */
import axios from "axios";
import store from "@/store";
import { getTokenTime, setTokenTime } from "./auth";
import { Message } from "element-ui";
import router from "@/router";
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础路径
  // timeout: 3000, //超时时间
});

//token超时函数返回boolean
const timeout = () => {
  const currentTime = Date.now(); //当前时间
  const tokenTime = getTokenTime(); //获取登录时候生成的时间戳
  const timeout = 2 * 60 * 60 * 1000;
  return currentTime - tokenTime > timeout;
};
// 请求拦截器
request.interceptors.request.use(
  // 每次请求的网络配置
  async (config) => {
    // const { data } = config.data;
    // console.log(data);
    //获取token
    const token = store.state.user.token.token;
    console.log(token);
    if (token) {
      if (timeout()) {
        //登录之后如果token超时那么就退出登录清除token和信息
        await store.dispatch("user/logout");
        router.push("/login");
        // 抛出错误，提交到响应的错误里
        return Promise.reject(new Error("登录超时"));
      } else {
        //如果没有超时那就继续存token
        config.headers.Authorization = token;
      }
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
    console.log(response);
    if (
      response.request.responseURL ===
      "http://localhost:8080/api/user-service/user/login"
    ) {
      return response;
    }

    const { msg, success, status } = response.data;
    if (success || status || response.status === 200) {
      return response.data;
    }

    Message.error(msg);
    return Promise.reject(new Error(msg));
  },
  async (error) => {
    console.dir(error);
    //如果没有错误或者response字段就中断
    if (error?.response?.status === 401) {
      Message.error("登录超时");
      await store.dispatch("user/logout");
      router.push("/login");
    } else {
      //正常抛出错误
      Message.error(error.message);
    }
    // if(error.response.)
    return Promise.reject(error);
  }
);
// console.dir(request);
export default request;
