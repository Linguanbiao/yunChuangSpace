<template>
  <div class="toTopContainer" v-if="isShow" @click="handleClick">Top</div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  created() {
    // 利用事件总线监听滚动条事件
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      // 滚动条触发了事件，会抛出一个 dom 元素
      if (dom.scrollTop > dom.clientHeight) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    handleClick() {
      /**
       * 点击以后在事件总线上抛出一个事件，修改高度
       * 参数 : 应该修改高度为 0
       */
      this.$bus.$emit("setMainScroll", 0);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
.toTopContainer {
  background: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 99;
  cursor: pointer;
  line-height: 50px;
  text-align: center;
  color: #fff;
  box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.5);
  &:hover {
    background: darken(@primary, 10%);
  }
}
</style>
