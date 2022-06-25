<template>
  <div class="page-container" v-if="totalPage > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }"
      >|&lt;&lt;</a
    >
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="handleClick(n)"
      v-for="(n, i) in number"
      :key="i"
      :class="{ active: n === current }"
      >{{ n }}</a
    >
    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === totalPage }"
      >&gt;&gt;</a
    >
    <a
      @click="handleClick(totalPage)"
      :class="{ disabled: current === totalPage }"
      >&gt;&gt;｜</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      //当前页码
      type: Number,
      default: 1,
    },
    total: {
      // 总的数据量
      type: Number,
      default: 0,
    },
    limit: {
      // 页容量，每页显示多少条数据
      type: Number,
      default: 10,
    },
    visibleNumber: {
      // 可见页码数
      type: Number,
      default: 10,
    },
  },
  computed: {
    totalPage() {
      // 总共页码数
      return Math.ceil(this.total / this.limit);
    },
    visibleMinPage() {
      // 返回可见的起始页码数（也就是可见的最小页码数）
      let visibleMin = this.current - Math.floor(this.visibleNumber / 2);
      if (visibleMin <= 0) {
        visibleMin = 1;
      }
      return visibleMin;
    },
    visibleMaxPage() {
      // 返回可见的结尾页码数（也就是可见的最大页码数）
      let visibleMax = this.visibleMinPage + this.visibleNumber - 1;
      if (visibleMax >= this.totalPage) {
        visibleMax = this.totalPage;
      }
      return visibleMax;
    },
    number() {
      // 返回需要生成的可见页码数
      let num = [];
      for (let i = this.visibleMinPage; i <= this.visibleMaxPage; i++) {
        num.push(i);
      }
      return num;
    },
  },
  methods: {
    handleClick(newPage) {
      // 处理页码点击事件，抛出事件，事件参数为 newPage
      // $emit()  方法为抛出事件
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/var.less";

a {
  color: @primary;
  margin: 0 6px;
  cursor: pointer;
  &.disabled {
    color: @lightWords;
    cursor: not-allowed;
  }
  &.active {
    color: @words;
    cursor: text;
    font-weight: bold;
  }
}
</style>
