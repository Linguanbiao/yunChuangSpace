<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="data.total + ''"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    ></MessageArea>
    <div class="Loding">
      <Loading v-if="isLoading"></Loading>
      <span v-if="!hasMore" class="noComment">没有更多的评论了</span>
    </div>
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetch from "@/mixins/fetchData.js";
import { postComment, getComment } from "@/api/blog.js";
import Loading from "@/components/Loading.vue";
export default {
  mixins: [fetch({})],
  components: {
    MessageArea,
    Loading,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    hasMore() {
      // 判断是否还有剩余的数据，当 data.rows.length 小于总数时，就表示还有数据的， 该计算属性用于指导还能否加载更多的评论数据
      if (this.data.rows) {
        return this.data.rows.length < this.data.total;
      }
      return false;
    },
  },
  created() {
    // 利用时间总线， 监听滚动条的改变，并触发事件 handleSroll
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  methods: {
    fetchData() {
      return getComment(this.$route.params.id, this.page, this.limit);
    },
    // 加载下一页，获得更多的数据

    async fetchMoreDate() {
      if (!this.hasMore) {
        // 没有更多的评论数据了
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      // 父组件可以处理了，提交一条评论
      const resp = await postComment({
        blogId: this.$route.params.id,
        nickname: formData.nickname,
        content: formData.content,
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      //父组件处理完了，执行回掉函数，并传递一个参数
      callback("评论成功");
    },
    handleScroll(dom) {
      if (this.isLoading) {
        // 如果当前还正在加载就不需要继续加载了，防止事件一直在发生
        return;
      }
      // 当滚动条滚动到底部时，触发 fetchMoreData()
      const range = 50; // 一个可接受的范围，在这个范围内都滚动条算到达了底部
      const gap = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (gap < range) {
        this.fetchMoreDate();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
@import "~@/style/mix.less";
.blog-comment-container {
  margin: 30px 10px;
}
.Loding {
  height: 130px;
  width: 100%;
  position: relative;
}
.noComment {
  color: @gray;
  font-size: 16px;
  .self-center();
}
</style>
