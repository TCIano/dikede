import { login } from "@/api";
import router from "@/router";
export default {
  namespaced: true,
  state: {
    token: "",
    // errToken: "",
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    errToken(state, payload) {
      state.errToken = payload;
    },
  },
  actions: {
    async getToken({ commit }, payload) {
      try {
        //发送请求
        const res = await login(payload);
        console.log(res);
        console.log(res.request.responseURL);
        console.log(this);
        if (res.data.success) {
          this._vm.$message.success("登录成功");
          commit("setToken", res.data);
          //跳转路由
          router.push("/dashboard");
        } else {
          // throw new Error();
          this._vm.$message.error(res.data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
};
