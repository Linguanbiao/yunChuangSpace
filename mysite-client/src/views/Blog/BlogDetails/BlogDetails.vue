<template>
  <div class="container">
    <Loading v-if="isLoading"></Loading>
    <h1>{{ data.title }}</h1>
    <div class="aside" v-if="Object.keys(data).length !== 0">
      <span>日期 : {{ formatDate(data.createDate) }}</span>
      <span>浏览 : {{ data.scanNumber }}</span>
      <span
        ><a href="#dataCommentList">评论 : {{ data.commentNumber }}</a></span
      >
      <span
        ><a href="">分类 : {{ data.category.name }}</a></span
      >
    </div>
    <div class="markdown-body" v-html="data.htmlContent"></div>
    <BlogComment v-if="!isLoading"></BlogComment>
  </div>
</template>

<script>
import formatDate from "@/utils/formatDate.js";
import fetch from "@/mixins/fetchData.js";
import Loading from "@/components/Loading.vue";
import { getBlog } from "@/api/blog.js";
import BlogComment from "./BlogComment.vue";
import titleSet from "@/utils/titleSet.js";

export default {
  mixins: [fetch({})],
  components: {
    Loading,
    BlogComment,
  },
  computed: {
    getBlogId() {
      const blogId = this.$route.params.id;
      return blogId;
    },
  },
  methods: {
    formatDate,
    async fetchData() {
      const resp = await getBlog(this.getBlogId);

      if (resp.title) {
        titleSet.setRouterTitle(resp.title);
      }
      return resp;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
@import "~@/style/github-markdown.css";
@import "//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/default.min.css";
.container {
  width: 100%;
  height: 100%;
  .aside {
    color: @gray;
    font-size: 12px;
    padding: 2px;
    span {
      margin-right: 15px;
    }
  }
}
.markdown-body {
  padding-top: 20px;
  padding-left: 10px;
}
</style>
