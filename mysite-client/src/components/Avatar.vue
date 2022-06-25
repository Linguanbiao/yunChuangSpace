<template>
  <!-- 这是一个头像的组件，头像有大有小，而是照片是动态获取的，因此需要对组件传 地址，头像的尺寸 -->
  <img
    class="avatar-img"
    :src="url"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  />
</template>
<script>
export default {
  props: {
    // props : {} 组件的要传入的参数数组
    url: {
      type: String, // 传入的地址参数必须是字符串类型
      required: true, // 必须传 url 这个参数
    },
    size: {
      type: Number, // 传入的组件的宽为 数字类型
      default : 50    // 默认值
    },
  },
};
</script>

<style scoped>
/*  加 scoped 会形成一个带有作用域的 css 样式，只会选择这个组件内的元素，避免元素类名冲突 */
.avatar-img {
  border-radius: 50%;
  /* object-fit  这个 CSS 属性表示指定的可替换元素的内容应该如何适应到其使用的宽度和高度确定的框中  */
  object-fit: cover;
}
</style>
