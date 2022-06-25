<template>
  <div class="messageContainer" ref="msgContainer">
    <Message class="messageList"></Message>
  </div>
</template>

<script>
import Message from "./Message.vue";
export default {
  components: {
    Message,
  },
  methods: {
    handleScroll() {
      this.$bus.$emit("msgScroll", this.$refs.msgContainer);
    },
  },
  mounted() {
    // 元素挂载以后，添加一个页面监听事件
    this.$refs.msgContainer.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$refs.msgContainer.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
.messageContainer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 10px;
  .messageList {
    width: 900px;
    height: 100%;
    margin: 10px auto;
  }
}
</style>
