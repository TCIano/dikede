import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";
import user from "./modules/user";
import createVuexPersisted from "vuex-persistedstate";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
  },
  getters,
  plugins: [createVuexPersisted()], //持久化插件
});

export default store;
