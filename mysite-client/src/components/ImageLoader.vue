<template>
  <div class="image-loader-container">
    <img
      @load="handleLoad"
      class="origin"
      :src="src"
      :style="{ opacity: opacity, transition: `${duration}ms` }"
    />
    <img class="placeholder" :src="placeholder" v-if="!everythingDone" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasLoaded: false,
      everythingDone: false,
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 1500,
    },
  },
  computed: {
    opacity() {
      return this.hasLoaded ? 1.0 : 0.0;
    },
  },
  methods: {
    handleLoad() {
      this.hasLoaded = true;
      this.$emit("imgHasLoaded");
      setTimeout(() => {
        this.everythingDone = true;
      }, this.duration);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/mix.less";

.image-loader-container {
  width: 100%;
  height: 100%;
  img {
    .self-fill();
  }
  .placeholder {
    filter: blur(20px);
  }
}
</style>
