import request from "@/utils/request";

/**
 *  搜索工单
 * @param {Object} params
 * pageIndex	否		
    pageSize	否		
    innerCode	否		设备编号
    userId	否		工单所属人Id
    taskCode	否		工单编号
    status	否	1:待办;2:进行;3:取消;4:完成	工单状态
    isRepair	否		是否是维修工单
    start	否	2020-01-01	开始日期
    end	否	2020-12-31	结束日期
 * @returns
 */
export const searchTask = (params) => {
  return request({
    url: "/task-service/task/search",
    params,
  });
};
