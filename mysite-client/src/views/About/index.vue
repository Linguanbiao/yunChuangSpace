<template>
  <div class="about-container">
    <Loading v-if="!data"></Loading>
    <iframe v-if="data" :src="data" frameborder="0" class="iframe-container">
    </iframe>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import { mapState } from "vuex";
export default {
  components: {
    Loading,
  },

  computed: {
    ...mapState("about", ["data"]),
  },
  created() {
    // 加载数据仓库里面的数据
    this.$store.dispatch("about/fetchData");
  },
};
</script>

<style lang="less" scoped>
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  .iframe-container {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
