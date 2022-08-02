import { login, getUserInfo } from "@/api";
import router from "@/router";
export default {
  namespaced: true,
  state: {
    token: "",
    // errToken: "",
    userInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
  },
  actions: {
    //获取用户token
    async getToken({ commit }, payload) {
      //发送请求
      const res = await login(payload);
      // console.log(res);
      console.log(res.request.responseURL);
      // console.log(this);
      if (res.data.success) {
        this._vm.$message.success("登录成功");
        commit("setToken", res.data);
        //跳转路由
        router.push("/home");
      } else {
        // throw new Error();
        this._vm.$message.error(res.data.msg);
      }
    },
    //获取用户信息
    async getUserInfo(context) {
      const res = await getUserInfo(context.state.token.userId);
      console.log(res);
      context.commit("setUserInfo", res);
    },
  },
  getters: {},
};
