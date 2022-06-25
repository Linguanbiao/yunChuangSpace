<template>
  <div class="app-container">
    <div class="block">文章标题</div>
    <el-input v-model="form.title" placeholder="请输入标题"></el-input>
    <div class="block">文章编辑</div>
    <editor
      initialValue="写点东西吧..."
      height="800px"
      initialEditType="markdown"
      :options="editOptions"
      v-model="form.editorText"
      ref="toastuiEditor"
    ></editor>
    <div class="block">文章描述</div>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入文章描述"
      v-model="form.description"
    >
    </el-input>
    <div class="block">文章头图</div>
    <UpLoad v-model="form.thumb"></UpLoad>

    <div class="block">选择分类</div>

    <el-select
      v-model="form.select"
      placeholder="请选择文章的分类"
      @change="handleSelectChange"
    >
      <el-option
        v-for="item in blogType"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <div class="Btn">
      <el-button type="primary" @click="handleModifyBlog">提交修改</el-button>
      <el-button type="info" @click="handleCancleModify">取消修改</el-button>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/i18n/zh-cn.js";
import UpLoad from "@/components/UpLoad.vue";
import { getCategory, modifyBlog, getBlog } from "@/api/blog.js";
export default {
  data() {
    return {
      id: null, // 从文章列表带过来的 需要编辑的 文章的 id
      form: {
        // 文章的一些信息
        title: "", // 文章的标题
        description: "", // 文章的描述
        editorText: "", // 用户编写的内容
        thumb: "", // 文章的图片
        select: "", // 选择分类
      },
      blogType: [], // 所有的文章分类有哪些
      editOptions: {
        language: "zh-CN",
      },
    };
  },
  components: {
    editor: Editor,
    UpLoad,
  },
  created() {
    this.id = this.$route.params.id; //  一进来就先获取到要修改的文章的 id , 并把数据还原
    this.fetchBlog();
    this.fetchTypeData();
  },
  methods: {
    fetchTypeData() {
      getCategory().then((res) => {
        this.blogType = res.data;
      });
    },
    fetchBlog() {
      // 根据 id 获取要修改的单篇博客
      getBlog(this.id).then((res) => {
        // 还原数据
        this.form = res.data;
        this.form.select =
          res.data.category === null ? "" : res.data.category.id;
        this.$refs.toastuiEditor.invoke("setHTML", res.data.htmlContent);
      });
    },
    handleModifyBlog() {
      // 处理发布文章
      let htmlContent = this.$refs.toastuiEditor.invoke("getHTML");
      let markdownContent = this.$refs.toastuiEditor.invoke("getMarkdown");
      let option = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        htmlContent: htmlContent,
        markdownContent: markdownContent,
        thumb: this.form.thumb,
      };
      console.log(option);
      console.log(this.form);
      if (
        this.form.title &&
        this.form.description &&
        this.form.select &&
        this.form.thumb &&
        htmlContent
      ) {
        modifyBlog({ id: this.form.id, data: option }).then((res) => {
          this.$message.success("文章修改成功");
          this.$router.push("/blogList");
        });
      } else {
        console.log("为什么");
        this.$message.warning("请填写完整的内容");
      }
    },
    handleCancleModify() {
      // 取消编辑
      this.$router.push("/blogList");
      this.$message.warning("取消编辑");
    },
    handleSelectChange() {
      // 这是 element ui 的  bug ， 这里强制更新组件状态
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  font-weight: 100;
  margin: 15px 0;
}
.Btn {
  display: block;
  margin: 20px 20px;
  margin-left: 0;
}
</style>
