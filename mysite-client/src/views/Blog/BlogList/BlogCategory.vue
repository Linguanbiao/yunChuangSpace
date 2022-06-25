<template>
  <div class="cate-Container">
    <Loading v-if="isLoading"></Loading>
    <h2 v-if="data.length != 0">文章分类</h2>
    <RightList
      :list="list"
      v-if="data.length != 0"
      @select="handleSelect"
    ></RightList>
  </div>
</template>

<script>
import RightList from "../RightList.vue";
import fetch from "@/mixins/fetchData.js";
import { getBlogTypes } from "@/api/blog.js";
import Loading from "@/components/Loading.vue";

export default {
  mixins: [fetch([])],
  components: {
    RightList,
    Loading,
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const result = [
        { id: -1, name: "全部", articleCount: totalArticleCount },
        ...this.data,
      ];
      return result.map((item) => ({
        ...item,
        isSelected: item.id === this.categoryId,
        aside: `${item.articleCount}篇`,
      }));
    },
  },

  methods: {
    fetchData() {
      return getBlogTypes();
    },
    handleSelect(cateItem) {
      // 处理侧边栏点击事件，点击以后根据 点击的选项的 id 进行改变路由地址， 路由地址改变又会重新进行渲染，进行 第40 行代码匹配改变当前 isSelectd = true
      // 同样这里也是两种情况分析
      const newPage = 1;
      this.$router.push(
        `/blog/cate/${cateItem.id}?page=${newPage}&limit=${this.limit}`
      );
      // if (Object.keys(this.$route.params).length === 0) {
      //   //代码中的路由跳转，使用 vue-router 提供的实例 router 进行 push 跳转
      //   this.$router.push(`/blog?page=${newPage}&limit=${this.limit}`);
      // } else {
      //   this.$router.push(
      //     `/blog/cate/${cateItem.id}?page=${newPage}&limit=${this.limit}`
      //   );
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.cate-Container {
  height: 100%;
  width: 250px;
  position: relative;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 10px;
  overflow: auto;
}
</style>
