import request from "@/utils/request";
import store from "@/store";
/**
 * 获取用户基本信息
 * @param {String} id 用户id
 * @returns
 */
export const getUserInfo = (id) => {
  return request({
    // headers: {
    //   Authentication: store.state.user.token.token,
    // },
    url: `/user-service/user/${id}`,
  });
};
