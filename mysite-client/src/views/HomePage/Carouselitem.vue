<template>
  <div
    class="Carouse-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="carouse-img" :style="imagePosition" ref="img">
      <ImageLoader
        :src="carouse.bigImg"
        :placeholder="carouse.midImg"
      ></ImageLoader>
    </div>
    <div class="title" ref="title">{{ carouse.title }}</div>
    <div class="description" ref="desc">{{ carouse.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader.vue";
export default {
  props: ["carouse"],
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, // 外层容器的尺寸
      innerSize: null, // 里层图片的尺寸
      mouseX: 0, //鼠标的横坐标
      mouseY: 0, // 鼠标的纵坐标
    };
  },
  components: {
    ImageLoader: ImageLoader,
  },
  computed: {
    imagePosition() {
      if (!this.containerSize || !this.innerSize) {
        return;
      }
      const extraWidth = this.innerSize.width - this.containerSize.width; // 图片多出来的宽
      const extraHeight = this.innerSize.height - this.containerSize.height; // 图片多出来的高度
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      return {
        left: left + "px",
        top: top + "px",
      };
    },
    center() {
      // 获取容器居中位置，让鼠标初始位置为图片中间点
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    // 获取要显示的文本的宽度
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;

    setTimeout(() => {
      this.showWords();
    }, 3000);
    // 为容器和图片的宽高赋值
    this.handleSize();
    // 监听容器和图片的宽高是否发生变化了， 是的话就调用 resize 函数
    window.addEventListener("resize", this.handleSize);

    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
  },
  destroyed() {
    // 销毁监听的 resize 事件
    removeEventListener("resize", this.handleSize);
  },
  methods: {
    showWords() {
      // 显示文字函数，实现动画效果

      this.$refs.title.style.width = 0;
      //上面两个步骤将文字的透明显示出来了，但是为了要动画，所以设置宽为 0
      this.$refs.title.offsetHeight; // 强制渲染一次  reflow
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.opacity = 0.8;
      this.$refs.title.style.width = this.titleWidth + "px";

      this.$refs.desc.style.width = 0;
      //上面两个步骤将文字的透明显示出来了，但是为了要动画，所以设置宽为 0
      this.$refs.desc.offsetHeight; // 强制渲染一次  reflow
      this.$refs.desc.style.transition = "2s 1s"; // 总共 2s 完成动画，延迟 1s 开始动画
      this.$refs.desc.style.opacity = 0.5;
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    handleSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.img.clientWidth,
        height: this.$refs.img.clientHeight,
      };
    },
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave() {
      this.mouseX = this.containerSize.width / 2;
      this.mouseY = this.containerSize.height / 2;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
.Carouse-item-container {
  height: 100%;
  width: 100%;
  color: #fff;
  overflow: hidden;
  position: relative;
}
.carouse-img {
  height: 110%;
  width: 110%;
  position: absolute;
  transition: 0.1s;
}
.title,
.description {
  position: absolute;
  letter-spacing: 3px; // 字体间距
  left: 30px;
  color: #fff;
  opacity: 0; // 起先设置为 0 ， 为了有动画效果
  overflow: hidden;
  white-space: nowrap; // 设置不能换行
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5); // 字体四周描边
}
.title {
  top: calc(80% - 40px);
  font-size: 2em;
}
.description {
  top: calc(80% + 20px);
  font-size: 1.2em;
  color: lighten(@gray, 20%);
}
</style>
