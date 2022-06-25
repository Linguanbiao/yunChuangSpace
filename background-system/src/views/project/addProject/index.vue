<template>
  <div class="app-container">
    <el-form :model="formData">
      <el-form-item label="项目名称" class="block">
        <el-input
          v-model="formData.name"
          autocomplete="off"
          placeholder="请输入项目名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目描述（每一项描述以英文逗号分隔）" class="block">
        <el-input
          v-model="formData.description"
          autocomplete="off"
          placeholder="请输入项目描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目链接" class="block">
        <el-input
          v-model="formData.url"
          autocomplete="off"
          placeholder="请输入项目连接"
        ></el-input>
      </el-form-item>
      <el-form-item label="github地址" class="block">
        <el-input
          v-model="formData.github"
          autocomplete="off"
          placeholder="请输入项目github地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="预览图地址" class="block">
        <UpLoad v-model="formData.thumb"></UpLoad>
      </el-form-item>
      <el-form-item label="排序等级" class="block">
        <el-select v-model="formData.order" placeholder="请选择排序等级">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="postNewProject">发布此项目</el-button>
  </div>
</template>

<script>
import { addProject } from "@/api/project.js";
import UpLoad from "@/components/UpLoad.vue";
export default {
  data() {
    return {
      formData: {
        name: "",
        description: "",
        github: "",
        url: "",
        thumb: "",
        order: 1,
      },
    };
  },
  components: {
    UpLoad,
  },
  methods: {
    postNewProject() {
      let formDataObj = { ...this.formData };
      formDataObj.description = formDataObj.description.split(",");
      addProject(formDataObj)
        .then(() => {
          this.$message.success("项目发布成功");
          this.$router.push("/projectList");
        })
        .catch((err) => {
          this.$message.error("项目发布失败");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  font-weight: 100;
  margin: 10px 0;
}
</style>
