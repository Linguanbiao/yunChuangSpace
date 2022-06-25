<template>
  <!--  自定义封装 一个上传图片的组件 -->
  <div>
    <!-- 标题 -->
    <div class="block">{{ uploadTitle }}</div>
    <!-- 上传图片组件 elementUI 的控件 -->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :headers="headers"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { server } from "@/utils/serverConfig.js";
export default {
  props: ["uploadTitle", "value"],
  computed: {
    // 设置一个图片地址的 计算属性
    // imageUrl() {
    //   if (this.value) {
    //     return server + this.value;
    //   }
    // },
    headers() {
      return {
        //由于当前功能是需要授权的，而这里是使用 action 发送请求的，不是经过 axios ，因此我们需要单独为这个请求带上 token
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      };
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        //   寿命图片上传成功了，发送一个事件
        this.$emit("input", res.data);
      }
    },
    beforeAvatarUpload(file) {
      //   const isJPG = file.type === "image/jpeg";
      //   const isLt2M = file.size / 1024 / 1024 < 2;
      //   if (!isJPG) {
      //     this.$message.error("上传头像图片只能是 JPG 格式!");
      //   }
      //   if (!isLt2M) {
      //     this.$message.error("上传头像图片大小不能超过 2MB!");
      //   }
      //   return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
.avatar-uploader {
  border: 1px dashed #333;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 250px;
  height: 178px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 250px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 250px;
  height: 178px;
  display: block;
}
</style>
