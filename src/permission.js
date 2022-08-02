import router from "@/router";
import store from "@/store";
const whiteList = ["/login", "/404"];
router.beforeEach((to, from, next) => {
  const token = store.state.user.token.token;
  if (token) {
    //登录之后进行用户信息的获取
    store.dispatch("user/getUserInfo");
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    const isClouds = whiteList.includes(to.path);
    if (isClouds) {
      next();
    } else {
      next("/login");
    }
  }
});
