<template>
  <div class="search">
    <el-form :inline="true" class="demo-form-inline">
      <!-- <slot></slot> -->
      <el-form-item label="工单编号">
        <el-input
          placeholder="请输入"
          v-model="searchContion.taskCode"
        ></el-input>
      </el-form-item>
      <el-form-item label="工单状态">
        <el-select placeholder="请选择" v-model="searchContion.status">
          <el-option
            :label="item.label"
            :value="index + 1"
            v-for="(item, index) in option"
            :key="index"
          ></el-option>
          <!-- <el-option label="进行 " value="2"></el-option>
          <el-option label="取消" value="3"></el-option>
          <el-option label="完成" value="4"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.native="$emit('searchContionTask', searchContion)"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchContion: {
        status: "",
        taskCode: "",
      },
    };
  },
  props: {
    option: {
      type: Array,
      required: true,
    },
  },
  created() {},

  methods: {},
};
</script>

<style scoped>
.search {
  background-color: #fff;
  width: 100%;
  height: 70px;
  /* line-height: 70px; */
  padding-top: 15px;
  padding-left: 15px;
  margin-bottom: 30px;
}
</style>
