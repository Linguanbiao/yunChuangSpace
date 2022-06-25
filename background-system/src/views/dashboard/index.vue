<template>
  <div class="app">
    <el-image
      style="width: 100%; height: 100%"
      src="https://cdn.pixabay.com/photo/2022/06/13/19/43/man-7260571_960_720.jpg"
      fit="contain"
      :preview-src-list="thumbList"
    ></el-image>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.iframe-container {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
