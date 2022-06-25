<template>
  <div class="app-container">
    <el-form
      :model="adminInfo"
      :rules="setRules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="用户名">
        <el-input v-model="adminInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input
          type="password"
          v-model="adminInfo.oldLoginPwd"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="loginPwd">
        <el-input
          v-model="adminInfo.loginPwd"
          type="password"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>

      <el-form-item label="确认新密码" prop="checkPwd">
        <el-input
          v-model="adminInfo.checkPwd"
          type="password"
          placeholder="请再次输入新密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="modifyAdminInfo">修改</el-button>
      <el-button type="danger" @click="returnBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getInfoApi, updateAdminApi } from "@/api/user.js";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.adminInfo.loginPwd) {
        callback(new Error("两次输入密码不一致"));
      } else {
        this.isRight = true;
        callback();
      }
    };
    return {
      url: "",
      adminInfo: {
        id: "",
        loginId: "",
        name: "",
        oldLoginPwd: "",
        loginPwd: "",
        checkPwd: "",
        isRight: false,
      },
      setRules: {
        oldLoginPwd: [
          { required: true, trigger: "blur", message: "请输入旧密码" },
        ],
        loginPwd: [
          { required: true, trigger: "blur", message: "请输入新密码" },
        ],
        checkPwd: [
          { required: true, trigger: "blur", message: "请再次输入新密码" },
          { validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.fetchLoginInfo();
  },

  methods: {
    fetchLoginInfo() {
      getInfoApi().then((res) => {
        this.adminInfo = { ...res.data };
      });
    },
    modifyAdminInfo() {
      if (
        this.adminInfo.name &&
        this.adminInfo.oldLoginPwd &&
        this.adminInfo.loginPwd &&
        this.adminInfo.checkPwd
      ) {
        if (this.isRight) {
          updateAdminApi(this.adminInfo).then((res) => {
            if (typeof res === "string") {
              const resp = JSON.parse(res);
              this.$message.error(resp.msg);
            } else {
              this.$message.success("修改成功"); // 密码修改为 123456
              this.$store.dispatch("user/logout");
              this.$router.push(`/login?redirect?${this.$route.fullPath}`);
              this.isRight = false;
            }
          });
        } else {
          this.$message.error("两次密码不一致");
        }
      } else {
        this.$message.error("请填写全部信息");
      }
    },
    returnBack() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style lang="scss" scoped></style>
