<template>
  <div class="empty-container">
    <Icon type="empty" class="icon-container"></Icon>
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Icon from "./icon.vue";
export default {
  components: {
    Icon: Icon,
  },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style lang="less" scoped>
@import '../style/mix.less';
@import '../style/var.less';

.empty-container{
    // empty 组件需要在外层容器中横向垂直居中 利用position 属性 这个一个可能共用的样式，写成混合样式
    .self-center();
    font-size: 20px;
    color:@lightWords ;
    text-align: center;
}
.icon-container{
    font-size: 70px;
}
</style>>
</style>
