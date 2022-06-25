<template>
  <Layout>
    <template #default>
      <div class="home-page-container" ref="container" @wheel="handleWheel">
        <Loading v-if="isLoading"></Loading>
        <!--  这里动态设置 margin-top 只能用小驼峰样式 marginTop 就等于 margin-Top -->
        <ul
          class="carouse-container"
          :style="{ marginTop: margintop }"
          @transitionend="handleTransition"
        >
          <li v-for="item in data" :key="item.id">
            <carouselitem :carouse="item"></carouselitem>
          </li>
        </ul>
        <div class="icon icon-up" @click="turnUp" v-show="index !== 0">
          <Icon type="arrowUp" class="icon-size"></Icon>
        </div>
        <div class="icon icon-down" @click="turnDown" v-show="isArrowDownShow">
          <Icon type="arrowDown" class="icon-size"></Icon>
        </div>
        <ul class="indicator">
          <li
            v-for="(item, i) in data"
            :key="item.id"
            :class="{ active: i === index }"
            @click="handleIndicator(i)"
          ></li>
        </ul>
      </div>
    </template>
  </Layout>
</template>

<script>
import { getBanner } from "@/api/banner";
import Carouselitem from "./Carouselitem.vue";
import Icon from "@/components/icon.vue";
import Loading from "@/components/Loading.vue";
import fetchSet from "@/mixins/fetchData.js";
import Layout from "../../components/Layout.vue";
export default {
  //mixins 这里用到了混合配置，配置了一些共有的配置
  mixins: [fetchSet([])],
  data() {
    return {
      index: 0, //  当前是第几个页面
      containerHeight: 0, // 整个容器的高度
      swithing: false, // 页面是否正在翻页中
    };
  },
  components: {
    Carouselitem: Carouselitem,
    Icon: Icon,
    Loading: Loading,
    Layout,
  },

  computed: {
    margintop() {
      return -this.index * this.containerHeight + "px";
    },
    isArrowDownShow() {
      if (this.data.length !== 0 && this.index !== this.data.length - 1) {
        return true;
      }
      return false;
    },
  },
  methods: {
    //获取远程数据
    fetchData() {
      return getBanner();
    },
    turnUp() {
      this.index = this.index - 1;
    },
    turnDown() {
      this.index = this.index + 1;
    },
    handleWheel(e) {
      if (this.swithing || (e.deltaY <= 5 && e.deltaY >= -5)) {
        return;
      }
      if (e.deltaY > 5 && this.index < this.data.length - 1) {
        this.turnDown();
        this.swithing = true;
      } else if (e.deltaY < -5 && this.index > 0) {
        this.swithing = true;
        this.turnUp();
      }
    },
    handleTransition() {
      // 当翻页完成以后就将 正在翻转状态 设为 false
      this.swithing = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
    handleIndicator(i) {
      this.index = i;
    },
  },

  /** 下面这几个是 hook 函数，和组件的生命周期有关系 */

  // beforeMount() {
  //   this.isArrowDownShow = false;
  // },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    // 监听窗口的高度变化，因为我们设置的 marginTop 依赖于窗口的高度
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
@import "~@/style/mix.less";
.home-page-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden; //形成 BFC  就不会有外边距融合问题了
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
}

.carouse-container {
  width: 100%;
  height: 100%;
  color: #fff;
  transition: 500ms;
  li {
    width: 100%;
    height: 100%;
  }
}

.icon {
  .self-center();
  color: @gray;
  cursor: pointer;
  transform: translateX(-50%);
  @gap: 25px;
  &.icon-up {
    top: @gap;
    animation: jump-up 2s infinite;
  }
  &.icon-down {
    top: auto;
    bottom: @gap;
    animation: jump-down 2s infinite;
  }
  .icon-size {
    font-size: 36px;
  }
}

@jump: 5px;
@keyframes jump-up {
  0% {
    transform: translate(-50%, @jump);
  }
  50% {
    transform: translate(-50%, -@jump);
  }
  100% {
    transform: translate(-50%, @jump);
  }
}

@keyframes jump-down {
  0% {
    transform: translate(-50%, -@jump);
  }
  50% {
    transform: translate(-50%, @jump);
  }
  100% {
    transform: translate(-50%, -@jump);
  }
}

.indicator {
  .self-center();
  transform: translateY(-50%);
  left: auto;
  right: 20px;
  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: @words;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #fff;
    box-sizing: border-box;
  }
  .active {
    background: #fff;
  }
}
</style>
