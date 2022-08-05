<template>
  <div>
    <input-form :option="option" @searchContionTask="searchContionTask">
    </input-form>
    <form-item :tableData="taskList" :tableHead="tableHead">
      <btn></btn>
      <el-button type="primary" class="setting">工单配置</el-button>
      <template #page>
        <!-- //分页 -->
        <pageItem
          :pageInfo="pageInfo"
          @prevClick="prevClick"
          @nextClick="nextClick"
        ></pageItem>
      </template>
    </form-item>
  </div>
</template>

<script>
import pageItem from "@/components/pageItem";
import { searchTask } from "@/api";
import InputForm from "@/components/InputFrom";
import FormItem from "@/components/form";
import btn from "@/components/button";
export default {
  components: {
    InputForm,
    FormItem,
    btn,
    pageItem,
  },
  data() {
    return {
      //表格数据
      taskList: [],
      pageInfo: {
        pageIndex: 1, //页数
        totalPage: null, //总页数
        totalCount: null,
      },
      //表头数据
      tableHead: [
        {
          column_name: "taskCode",
          column_comment: "工单编号",
        },
        {
          column_name: "innerCode",
          column_comment: "设备编号",
        },
        {
          column_name: "createType",
          column_comment: "工单方式",
        },
        {
          column_name: "taskType.typeName",
          column_comment: "工单类型",
        },
        {
          column_name: `taskStatusTypeEntity.statusName`,
          column_comment: "工单状态",
        },
        {
          column_name: "userName",
          column_comment: "运营人员",
        },
        {
          column_name: "createTime",
          column_comment: "创建日期",
        },
      ],
      //选项数据
      option: [
        {
          label: "代办",
        },
        {
          label: "进行",
        },
        {
          label: "取消",
        },
        {
          label: "完成",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //获取工单
    async searchTask(contion) {
      const res = await searchTask(contion);
      res.currentPageRecords.forEach((item) => {
        if (item.createType === 0) {
          item.createType = "自动";
        } else {
          item.createType = "手动";
        }
        item.createTime = item.createTime.replace(/-/g, ".");
        item.createTime = item.createTime.replace(/T/g, " ");
      });
      console.log(res.currentPageRecords);
      this.pageInfo.pageIndex = parseInt(res.pageIndex);
      this.pageInfo.totalPage = parseInt(res.totalPage);
      this.pageInfo.totalCount = parseInt(res.totalCount);
      this.taskList = res.currentPageRecords;
      // console.log(this.taskList);
    },
    //获取下一页
    async nextClick() {
      // const res = await searchTask({
      //   pageIndex: `${this.pageInfo.pageIndex + 1}`,
      // });
      // this.pageInfo.pageIndex = parseInt(res.pageIndex);

      // this.taskList = res.currentPageRecords;
      this.searchTask({ pageIndex: `${this.pageInfo.pageIndex + 1}` });
    },
    //上一页
    async prevClick() {
      // const res = await searchTask({
      //   pageIndex: `${this.pageInfo.pageIndex - 1}`,
      // });
      // this.pageInfo.pageIndex = parseInt(res.pageIndex);

      // this.taskList = res.currentPageRecords;
      this.searchTask({ pageIndex: `${this.pageInfo.pageIndex - 1}` });
    },
    //条件搜索 工单
    searchContionTask(val) {
      console.log(val);
      this.searchTask(val);
    },
  },
  created() {
    this.searchTask();
  },
};
</script>

<style scoped lang="less">
.setting {
  border: 0;
  background-color: rgb(251, 244, 240) !important;
  color: black;
}
</style>
