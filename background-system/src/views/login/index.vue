<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">云客空间后台管理系统</h3>
      </div>

      <el-form-item prop="loginId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginId"
          v-model="loginForm.loginId"
          placeholder="请输入管理员账号"
          name="loginId"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="loginPwd"
          v-model="loginForm.loginPwd"
          :type="passwordType"
          placeholder="请输入管理员密码"
          name="loginPwd"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <div class="captcha-container">
        <el-form-item prop="captcha" class="captcha">
          <span class="svg-container">
            <svg-icon icon-class="nested" />
          </span>
          <el-input
            ref="captchaInput"
            v-model="loginForm.captcha"
            type="text"
            placeholder="请输入验证码"
            name="captchaInput"
            tabindex="3"
            auto-complete="on"
          />
        </el-form-item>
        <div
          class="captchaImg"
          @click="getCaptchaImg"
          v-html="captchaHtml"
        ></div>
      </div>

      <!-- 7 天内免登录 -->
      <div style="margin-bottom: 15px">
        <el-checkbox v-model="loginForm.checked">7 天内免登录</el-checkbox>
      </div>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { getCaptcha } from "@/api/captcha.js";

export default {
  name: "Login",
  data() {
    return {
      loginRules: {
        //表单的验证规则, 通过 prop 绑定 input， 这个可以看 elementUI 的文档 ， 规则是一个对象, 字段名和含义参考，可以有多个规则
        // 这里我们做的是验证是否为空，trigger 为触发器 ， blur 为当表单失焦时触发，并提醒 message
        loginId: [
          { required: true, trigger: "blur", message: "请输入管理员账号" },
        ],
        loginPwd: [
          { required: true, trigger: "blur", message: "请输入管理员密码" },
        ],
        captcha: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      loginForm: {
        loginId: "",
        loginPwd: "",
        captcha: "",
        checked: true,
      },
      captchaHtml: "",
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 处理登录
    handleLogin() {
      // validate 也是一个验证器， 在 element UI 里面可以查到
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.checked) {
            this.loginForm.remember = 7;
          }
          // dispatch 提交一个 action
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              // 登录成功后进入首页，但是在路由跳转阶段有 鉴权 功能
              this.$router.push({ path: this.redirect || "/" });
              // this.$router.push("/");
            })
            .catch((res) => {
              // 根据后端写的逻辑,如果是验证码错误，返回的是一个字符串，如果是账号密码错误，返回的是一个对象
              if (typeof res === "string") {
                // 使用 elementui 组件
                this.$message.error("验证码错误");
              } else {
                this.$message.error("账号密码错误");
              }
            });
          // 清空验证码的值并重新生成一张验证码
          this.loading = false;
          this.captcha = "";
          this.getCaptchaImg();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取验证码
    getCaptchaImg() {
      // getCaptcha().then((resp) => {
      //   console.log(resp);
      // });
      getCaptcha().then((resp) => {
        this.captchaHtml = resp;
      });
    },
  },
  created() {
    // 一开始就执行一次获取验证码
    this.getCaptchaImg();
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.captcha-container {
  display: flex;
}
.captcha {
  width: 70%;
}
.captchaImg {
  width: 30%;
  height: 52px;
}
</style>
