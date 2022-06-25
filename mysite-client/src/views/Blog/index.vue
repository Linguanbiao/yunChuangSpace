<template>
  <Layout>
    <template #default>
      <!-- RouterView 或者 router-view 都是占位符，和 slot 效果类似-->
      <div class="main_blogContainer">
        <BlogList></BlogList>
      </div>
    </template>
    <template #right>
      <div class="right">
        <BlogCategory></BlogCategory>
      </div>
    </template>
  </Layout>
</template>
<script>
import Layout from "@/components/Layout.vue";
import BlogList from "./BlogList/BlogList.vue";
import BlogCategory from "./BlogList/BlogCategory.vue";

export default {
  mixins: [fetch({})],
  components: {
    Layout,
    BlogList,
    BlogCategory,
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.main_blogContainer {
  height: 100%;
  width: 100%;
}
.right {
  width: 250px;
  height: 100%;
}
</style>
