import request from "@/utils/request";

/**
 *  图片验证码
 * @param {Number} clientToken 请求随机数
 * @returns
 */
export const imageCode = (clientToken) => {
  return request({
    url: `/user-service/user/imageCode/${clientToken}`,
  });
};

/**
 *  用户登录
 * @param {Object} data
 * loginName	string	必须		用户名(后台登录需要提供)
 * password	string	必须		密码(后台或代理商登录需要提供)
 * mobile	string	必须		客户端登录需要提供
 * code	string	必须		验证码
 * clientToken	string	必须		客户端请求验证码的token，两个后台登录需要提供
 * loginType	integer	必须		登录类型 0：后台；1：运营运维端；2：合作商后台
 * @returns
 */
export const login = (data) => {
  return request({
    method: "POST",
    url: "/user-service/user/login",
    data,
  });
};
