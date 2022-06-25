<template>
  <div class="blog-toc-container">
    <Loading v-if="isLoading"></Loading>
    <h2 v-if="Object.keys(data).length !== 0">文章目录</h2>
    <RightList
      v-if="Object.keys(data).length !== 0"
      :list="tocWithSelected"
      @select="handleSelect"
    ></RightList>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import RightList from "@/views/Blog/RightList.vue";
import fetch from "@/mixins/fetchData.js";
import { debounce } from "@/utils/debounce.js";
import { getBlog } from "@/api/blog.js";

export default {
  mixins: [fetch({})],
  components: {
    Loading,
    RightList,
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  computed: {
    //获取文章的 ID
    getBlogId() {
      const blogId = this.$route.params.id;
      return blogId;
    },
    // 根据 data.toc 属性以及 activeAnchor得到带有 isSelected 属性的 toc 数组
    tocWithSelected() {
      const getToc = (toc = []) => {
        return toc.map((item) => ({
          ...item,
          isSelected: item.anchor === this.activeAnchor,
          childrenList: getToc(item.childrenList), // 递归子元素
        }));
      };
      return getToc(this.data.toc);
    },
    doms() {
      //获取页面每个带有 anchor id 的 dom 元素方便后面控制滚动选中状态
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.childrenList && t.childrenList.length) {
            addToDoms(t.childrenList);
          }
        }
      };
      addToDoms(this.data.toc);
      return doms;
    },
  },
  methods: {
    async fetchData() {
      return await getBlog(this.getBlogId);
    },
    handleSelect(item) {
      //这个函数处理的是根据目录点击的状态，博客显示到相应的位置
      location.hash = item.anchor;
    },
    setSelected() {
      //这个函数是设置 activeAnchor 为正确的值，为了计算属性中标记为被选中样式
      this.activeAnchor = "";
      //设置规定的范围大小
      const range = 150;
      for (const dom of this.doms) {
        // 依次遍历 doms 数组里面的每个dom 元素，设置是否为选中状态
        if (!dom) {
          continue;
        }
        //获取dom元素距离视口的高度
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          //在规定的范围内，设置为选中状态
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          //在规定的范围下方 ， 一定是不激活的
          return;
        } else {
          //在规定的范围上方, 可以先假设是激活的，后面的 dom 元素的状态会覆盖的
          this.activeAnchor = dom.id;
        }
      }
    },
  },
  mounted() {
    // 在实例创建后，就会事件在事件总线上添加一个监听事件 , $bus 为eventBus.js中绑定在Vue原型中的一个事件总线
    /**
     *当 mainScroll 事件被总线抛出，在这里监听到，就运行一次 setSelected() 函数
     *为 setSelected 添加一个防抖函数
     */
    this.debounceSetSelected = debounce(this.setSelected, 50);
    this.$bus.$on("mainScroll", this.debounceSetSelected);
  },
  destroyed() {
    // 销毁监听事件
    this.$bus.$off("mainScroll", this.debounceSetSelected);
  },
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  width: 250px;
  height: 100%;
  position: relative;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 10px;
  overflow: auto;
}
</style>
