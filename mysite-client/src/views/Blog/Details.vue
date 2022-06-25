<template>
  <Layout class="blogDetails-container">
    <template #default>
      <div class="main" ref="mianContainer">
        <BlogDetails></BlogDetails>
      </div>
    </template>
    <template #right>
      <div class="right">
        <BlogToc></BlogToc>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import BlogDetails from "./BlogDetails/BlogDetails.vue";
import BlogToc from "./BlogDetails/BlogToc.vue";
import BlogComment from "./BlogDetails/BlogComment.vue";
export default {
  components: {
    Layout,
    BlogToc,
    BlogDetails,
    BlogComment,
  },
  created() {
    // 监听  ToTop 上事件总线上抛出的事件，修改滚动条高度
    this.$bus.$on("setMainScroll", this.setMainScroll);
  },
  methods: {
    /**
     * 为监听的滚动事件抛出一个事件, 添加的是 事件总线，这样更灵活可以跨组建，子组件可以处理父组件抛出的事件
     * 事件名称： mainScroll
     * 含义：主区域滚动条位置发生变化后触发
     * 参数：滚动的dom元素
     */
    handleScroll() {
      this.$bus.$emit("mainScroll", this.$refs.mianContainer);
    },

    /**
     * 在接受到 ToTop 在事件总线上抛出的事件后， 将滚动条的 scrollTop 进行修改
     */
    setMainScroll(top) {
      this.$refs.mianContainer.scrollTop = top;
    },
  },

  mounted() {
    // 元素挂载以后，添加一个页面监听事件
    this.$refs.mianContainer.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$refs.mianContainer.removeEventListener("scroll", this.handleScroll);
    this.$bus.$off("setMainScroll", this.setMainScroll);
  },
};
</script>

<style lang="less" scoped>
.blogDetails-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  .main {
    position: relative;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
  }
  .right {
    position: relative;
    width: 250px;
    height: 100%;
  }
}
</style>
