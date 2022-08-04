<template>
  <div>
    <input-form>
      <template>
        <el-form-item label="工单编号">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="工单状态">
          <el-select placeholder="请选择">
            <el-option label="区域一"></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </template>
    </input-form>
    <form-item :tableData="taskList" :tableHead="tableHead">
      <btn></btn>
      <el-button type="primary" class="setting">工单配置</el-button>
      <template #page>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalPage"
          @next-click="nextClick"
          @prev-click="prevClick"
        >
        </el-pagination>
      </template>
    </form-item>
  </div>
</template>

<script>
import { searchTask } from "@/api";
import InputForm from "@/components/InputFrom";
import FormItem from "@/components/form";
import btn from "@/components/button";
export default {
  components: {
    InputForm,
    FormItem,
    btn,
  },
  data() {
    return {
      //表格数据
      taskList: [],
      pageIndex: null, //页数
      totalPage: null, //总页数
      //表頭數據
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
          column_name: "taskType.typeName",
          column_comment: "工单类型",
        },
        {
          column_name: "createType",
          column_comment: "工单方式",
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
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //获取工单
    async searchTask() {
      const res = await searchTask();
      console.log(res);
      this.pageIndex = parseInt(res.pageIndex);
      this.totalPage = parseInt(res.totalPage);
      console.log(this.totalPage);
      console.log(this.pageIndex);
      this.taskList = res.currentPageRecords;
      console.log(this.taskList);
    },
    //获取下一页
    async nextClick() {
      const res = await searchTask({
        pageIndex: `${this.pageIndex + 1}`,
      });
      console.log(res);
      this.pageIndex = parseInt(res.pageIndex);
      console.log(this.pageIndex);
      this.taskList = res.currentPageRecords;
      console.log(this.taskList);
    },
    //上一页
    async prevClick() {
      const res = await searchTask({
        pageIndex: `${this.pageIndex - 1}`,
      });
      console.log(res);
      this.pageIndex = parseInt(res.pageIndex);
      console.log(this.pageIndex);
      this.taskList = res.currentPageRecords;
      console.log(this.taskList);
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
