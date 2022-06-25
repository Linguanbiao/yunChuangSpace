<template>
  <div class="app-container">
    <div class="block">关于我</div>
    <el-input v-model="url" placeholder="请输入内容" :disabled="isDisabled">
    </el-input>
    <el-button type="primary" style="margin-top: 15px" @click="handleClick">{{
      btnContent
    }}</el-button>
  </div>
</template>

<script>
import { getAboutApi, postAboutApi } from "@/api/aboutme.js";
export default {
  data() {
    return {
      url: null,
      checkUrl: null,
      isDisabled: true,
    };
  },
  computed: {
    btnContent() {
      return this.isDisabled ? "编辑" : "完成";
    },
  },

  methods: {
    fetchAboutData() {
      getAboutApi().then((res) => {
        console.log(res);
        this.url = res.data;
        this.checkUrl = res.data;
      });
    },
    handleClick() {
      if (this.isDisabled) {
        this.isDisabled = false;
      } else {
        console.log(this.url);
        postAboutApi({ url: this.url }).then((res) => {
          this.$message.success("编辑成功");
          this.isDisabled = true;
          this.fetchAboutData(); //再重新获取一次数据
        });
      }
    },
  },
  created() {
    this.fetchAboutData();
  },
};
</script>

<style lang="less" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>
