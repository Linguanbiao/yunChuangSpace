<template>
  <div class="layout-container">
    <div class="left">
      <!-- solt 是占位符号 -->
      <slot name="left"></slot>
    </div>
    <div class="main">
      <slot name="default"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.layout-container {
  height: 100%;
  width: 100%;
  display: flex;
  .main {
    flex: 1 1 auto; // 1 1 auto     表示： 会随着空间放大而放大    会随着空间缩小而缩小
    overflow: hidden;
  }
  .left,
  .rigth {
    flex: 0 0 auto; // 0 0 auto   表示： 不会放大 不会缩小 长度等于灵活项目的长度
    overflow: hidden;
  }
}
</style>
