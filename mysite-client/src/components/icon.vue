<template>
  <!-- 字体图标是 i 元素 -->
  <i class="iconfont" :class="iconName"></i>
</template>

<script>
const iconMap = {
  arrowUp: "icon-arrow-up",
  arrowDown: "icon-arrow-down",
  info: "icon-xinxi",
  qq: "icon-qq",
  blog: "icon-blog",
  leaveMessage: "icon-liuyan",
  error: "icon-cuowuguanbiquxiao-yuankuang",
  code: "icon-code",
  warn: "icon-jinggao",
  success: "icon-zhengque",
  close: "icon-guanbi",
  email: "icon-email",
  github: "icon-github",
  homepage: "icon-zhuye",
  empty: "icon-empty",
  wechat: "icon-sign_wechat",
  about: "icon-set_about_hov",
};
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      return iconMap[this.type];
    },
  },
};
</script>

<style>
/* 引入字体图标的样式 */
@import url("//at.alicdn.com/t/font_3394286_ji5azjihgd9.css");
</style>
