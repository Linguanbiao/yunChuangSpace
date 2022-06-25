<template>
  <div>
    <ul class="rightList-container">
      <li v-for="(item, i) in list" :key="i" @click.stop="handleClick(item)">
        <span :class="{ active: item.isSelected }">{{ item.name }}</span>
        <span
          v-if="item.aside"
          class="aside"
          :class="{ active: item.isSelected }"
          >{{ item.aside }}</span
        >
        <!-- 这里的 list 会有子list ， 而子list 的结构和样式和当前一样，因此这里就使用 递归组件 -->
        <RightList :list="item.childrenList" v-on="$listeners"></RightList>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RightList", // 给当前组件取个名字，方便递归的时候自己调用自己
  props: {
    // 右边列表数据的格式 应该是 [{name : xxx  , isSelected : xx , childrenList : {name : xxx , isSelected: xx , children : {...}}}]
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      // 右边栏选项点击以后抛出一个事件，只有当当前是未选中状态，点击切换到选中状态才处理，抛出事件由父组件处理
      this.$emit("select", item);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
.rightList-container {
  list-style: none;
  padding: 0;
  .rightList-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    cursor: pointer;
    font-size: 14px;
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}
.aside {
  margin-left: 15px;
  font-size: 12px;
  color: @gray;
}
</style>
