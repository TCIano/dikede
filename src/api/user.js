import request from "@/utils/request";
import store from "@/store";
/**
 * 获取用户基本信息
 * @param {String} id 用户id
 * @returns
 */
export const getUserInfo = (id) => {
  return request({
    url: `/user-service/user/${id}`,
  });
};
