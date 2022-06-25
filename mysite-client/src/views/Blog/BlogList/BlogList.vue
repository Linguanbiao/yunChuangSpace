<template>
  <div class="blog-list-container" ref="blogContainer">
    <Loading v-if="isLoading"></Loading>
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-show="item.thumb">
          <RouterLink :to="`/blog/${item.id}`">
            <!-- 使用自定义指令 v-lazy 的功能，添加图片懒加载功能  -->
            <img
              v-lazy="item.thumb"
              :alt="item.title"
              :title="item.title"
              class="imgItem"
            />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink :to="`/blog/${item.id}`">
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span> 日期:{{ formatDate(item.createDate) }} </span>
            <span> 浏览:{{ item.scanNumber }} </span>
            <span> 评论:{{ item.commentNumber }}</span>
            <!-- <RouterLink
              :to="`/blog/cate/${item.category.id}?page=${getRouteInfo.page}&limit=${getRouteInfo.limit}`"
              >{{ item.category.name }}</RouterLink
            > -->
          </div>
          <div class="desc">
            <p>{{ item.description }}</p>
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页放到这 -->
    <Pager
      v-if="data.total"
      :current="getRouteInfo.page"
      :total="data.total"
      :limit="getRouteInfo.page.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
      class="pager-container"
    ></Pager>
  </div>
</template>

<script>
import fetch from "@/mixins/fetchData.js";
import { getBlogs } from "@/api/blog.js";
import Loading from "@/components/Loading.vue";
import Layout from "@/components/Layout.vue";
import formatDate from "@/utils/formatDate.js";
import Pager from "@/components/Pager.vue";

export default {
  components: { Loading, Layout, Pager },
  mixins: [fetch({})],
  computed: {
    // 获取路由信息
    getRouteInfo() {
      const categoryId = +this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  watch: {
    /**
     * watch  可以监听数据是否发生了变化并进行操作
     * 在这里，我们需要监听 page 发生了变化，并发变化后的 page 对应的数据 data 获取到并渲染
     */
    async $route() {
      this.isLoading = true;
      // 将滚动条置顶, 滚动条高度为0
      this.$refs.blogContainer.scollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
  methods: {
    formatDate,
    fetchData() {
      return getBlogs(
        this.getRouteInfo.page,
        this.getRouteInfo.limit,
        this.getRouteInfo.categoryId
      );
    },
    handlePageChange(newPage) {
      //处理更新的页码， 根据新的页码进行更新路由，并进行无刷新跳转
      /**
       * 两种跳转情况
       * 第一种是（无分类）： /blog?page=${newPage}&limit=${this.getRouteInfo.limit}
       * 第二种是（有分类）： /blog/cate/${this.getRouteInfo.categoryId}?page=${newPage}&limit=${this.getRouteInfo.limit}
       */
      if (this.getRouteInfo.categoryId === -1) {
        //代码中的路由跳转，使用 vue-router 提供的实例 router 进行 push 跳转
        this.$router.push(
          `/blog?page=${newPage}&limit=${this.getRouteInfo.limit}`
        );
      } else {
        this.$router.push(
          `/blog/cate/${this.getRouteInfo.categoryId}?page=${newPage}&limit=${this.getRouteInfo.limit}`
        );
      }
    },
    handleScroll() {
      // 当前页面的滚动条发生变化的话，触发一个事件
      this.$bus.$emit("mainScroll", this.$refs.blogContainer);
    },
  },
  mounted() {
    // 元素挂载以后，添加一个滚动条监听事件
    this.$refs.blogContainer.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$refs.blogContainer.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  overflow-x: auto;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: flex;
      align-items: center;
      max-width: 200px;
      border-radius: 5px;
    }
  }
}
.main {
  flex: 1 1 auto;
  h2 {
    margin: 0;
  }
}
.aside {
  font-size: 12px;
  color: @gray;
  span {
    margin-right: 15px;
  }
}
.desc {
  margin: 15px 0;
  font-size: 14px;
}
.pager-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  white-space: nowrap; // 不换行
}
.imgItem {
  width: 240px;
  height: 120px;
}
</style>
