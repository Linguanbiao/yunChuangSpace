<template>
  <div class="layout">
    <Layout>
      <template #left>
        <div class="left">
          <SiteAside></SiteAside>
        </div>
      </template>
      <template #default>
        <div class="main-container">
          <!-- RouterView 或者 router-view 都是占位符，和 slot 效果类似-->
          <RouterView></RouterView>
        </div>
      </template>
      <template #right>
        <!-- <div class="right">右边区域</div> -->
      </template>
    </Layout>
    <!-- <ToTop></ToTop> -->
  </div>
</template>

<script>
import SiteAside from "@/components/SiteAside/SiteAside.vue";
import Layout from "@/components/Layout.vue";
import ToTop from "@/components/ToTop.vue";

export default {
  data() {
    return {};
  },
  components: {
    SiteAside: SiteAside,
    Layout: Layout,
    ToTop,
  },
  methods: {},
};
</script>

<style lang="less" scoped>
@import "~@/style/global.css";
@import "~@/style/var.less";
@import "~@/style/mix.less";
.layout {
  .self-fill(fixed);
  .left {
    width: 250px;
    height: 100%;
  }
  .main-container {
    width: 100%;
    height: 100%;
  }
  .right {
    width: 150px;
    height: 100%;
    background: lightblue;
  }
}
</style>
