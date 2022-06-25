<template>
  <div class="message">
    <Loading v-if="!data.rows"></Loading>
    <template v-if="data.rows">
      <MessageArea
        title="留言板"
        :subTitle="data.total + ''"
        :list="data.rows"
        :isLoading="false"
        @submit="handleSubmit"
      ></MessageArea>
      <div class="Loding">
        <Loading v-if="isLoading"></Loading>
        <span v-if="!hasMore" class="noComment">没有更多的留言了</span>
      </div>
    </template>
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetch from "@/mixins/fetchData.js";
import { getMessage, postMessage } from "@/api/message.js";
import Loading from "@/components/Loading.vue";
export default {
  mixins: [fetch({})],
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  components: {
    MessageArea,
    Loading,
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
  methods: {
    async fetchData() {
      //数据是每次都远程获取的，不是放在数据仓库的 , 每次加载 limit 条
      return await getMessage(this.page, this.limit);

      // return await getMessage(this.page, this.limit);
    },

    async fetchMoreDate() {
      if (!this.hasMore) {
        // 没有更多的留言数据了
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
      // 父组件可以处理了，提交一条留言
      const resp = await postMessage({
        nickname: formData.nickname,
        content: formData.content,
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      //父组件处理完了，执行回掉函数，并传递一个参数
      callback("留言成功!");
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
  created() {
    this.$bus.$on("msgScroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$off("msgScroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
@import "~@/style/mix.less";
.message {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 30px 10px;
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
}
</style>
