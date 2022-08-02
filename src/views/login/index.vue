<template>
  <div class="my">
    <!-- 头像 -->
    <div class="avator">
      <img src="../../assets/ava.png" alt="" />
    </div>
    <!-- 表单 -->
    <div class="form">
      <el-form :rules="rules" :model="loginForm" ref="loginForm">
        <el-form-item prop="loginName">
          <el-input
            class="ipt"
            placeholder="输入账号"
            v-model="loginForm.loginName"
          >
            <template #prefix>
              <i class="el-icon-mobile-phone"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="ipt"
            type="password"
            show-password
            placeholder="请输入密码"
            v-model="loginForm.password"
          >
            <template #prefix> <i class="el-icon-lock"></i> </template
          ></el-input>
        </el-form-item>
        <el-form-item id="vail" prop="code">
          <el-input
            class="ipt vail"
            placeholder="验证码"
            v-model="loginForm.code"
          >
            <template #prefix>
              <i class="el-icon-circle-check"></i>
            </template>
            <template #suffix>
              <!-- <img src="../../assets/ava.png" alt="" /> -->
              <!-- <span>1212</span> -->
            </template>
          </el-input>
          <img
            :src="`https://likede2-java.itheima.net/api/user-service/user/imageCode/${loginForm.clientToken}`"
            @click="changeVail"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" @click="login" :loading="isLoad"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { imageCode } from "@/api";
export default {
  data() {
    return {
      loginForm: {
        loginName: "admin",
        password: "admin",
        code: "", //验证码
        clientToken: null,
        loginType: 0,
      },
      isLoad: false,
      check: "",
      radom: "",
      rules: {
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "验证码", trigger: "blur" }],
      },
    };
  },

  created() {
    this.imageCode();
  },

  methods: {
    async imageCode() {
      const radom = Math.random();
      // const res = await imageCode(radom);
      // console.log(res);
      this.loginForm.clientToken = radom;
    },
    //切换验证码
    changeVail() {
      const radom = Math.random();
      this.loginForm.clientToken = radom;
    },
    //登录
    async login() {
      this.isLoad = true;
      try {
        // console.log(this.$refs.loginForm);
        await this.$refs.loginForm.validate();
        await this.$store.dispatch("user/getToken", this.loginForm);
      } finally {
        this.isLoad = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.my {
  width: 100%;
  height: 100%;
  background: url("../../assets/bg.png");
  // margin: 0 auto;
  text-align: center;
  .avator {
  }
  .avator img {
    height: 96px;
    z-index: 1000;
    height: 96px;
    position: absolute;
    top: 140px;
    left: 50%;
    transform: translateX(-50%);
  }
  .form {
    width: 518px;
    height: 388px;
    // text-align: center;
    border-radius: 10px;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    padding: 20px;

    .el-form {
      // width: 518px;
      margin-top: 50px;
      // height: 388px;
      #vail {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: -85px;
        // text-align: center;
        img {
          width: 90px;
          height: 40px;
          margin-top: -20px;
          position: absolute;
          top: 20px;
          left: 355px;
        }
        .vail {
          // width: 10px !important;
          width: 350px;
          margin-bottom: 10px;
        }
      }
      .el-form-item {
        margin: 10px;
        height: 60px;
      }
    }
    // height: 60px;
    .ipt {
      // padding: 10px;
      width: 446px;

      :deep(.el-input__suffix) {
        .el-input__suffix-inner {
          // margin-top: -10px;
          top: -7px;
          right: 5px;
          // -webkit-transition: all 0.3s;
          transition: all 0.3s;
        }
      }
    }

    .loginBtn {
      width: 446px;
      height: 52px;
      border-radius: 10px;
      background-color: #697bee;
      color: #fff;
    }
  }
}
</style>
