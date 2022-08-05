<template>
  <div class="page">
    <div class="content">
      <span
        >总共{{ pageInfo.totalCount }}记录 第{{ pageInfo.pageIndex }}/{{
          pageInfo.totalPage
        }}页</span
      >
    </div>
    <div class="option">
      <el-button
        @click="$emit('prevClick')"
        :disabled="pageInfo.pageIndex === 1"
        >上一页</el-button
      >
      <el-button
        @click="$emit('nextClick')"
        :disabled="pageInfo.pageIndex === pageInfo.totalPage"
        >下一页</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    pageInfo: {
      type: Object,
      required: true,
    },
  },
  created() {},

  methods: {},
};
</script>

<style scoped lang="less">
.page {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .content {
    color: #e5e2e5;
  }
}
</style>
