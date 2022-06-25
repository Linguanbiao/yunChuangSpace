<template>
  <ul class="menu-container">
    <li v-for="item in items" :key="item.link">
      <router-link :to="item.link" :exact="item.exact" active-class="seletced">
        <div class="Icon">
          <Icon :type="item.icontype"></Icon>
        </div>
        <span>{{ item.title }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/icon.vue";
import { mapState } from "vuex";
export default {
  data() {
    // 提供一个数组用于循环生成 li
    return {
      items: [
        {
          link: "/",
          title: "首页",
          icontype: "homepage",
          exact: true, // 使用 router-link 时激活选中状态必须是精准匹配，即当前路径和导航路径完全相同
        },
        {
          link: "/blog",
          title: "文章",
          icontype: "blog",
          exact: false, // 只要当前路径以 /blog 开头 , 即当前路径是以导航路径开头， 添加这个属性是为了模糊匹配使用的
        },
        {
          link: "/about",
          title: "关于我",
          icontype: "about",
          exact: true,
        },
        {
          link: "/project",
          title: "项目&效果",
          icontype: "code",
          exact: true,
        },
        {
          link: "/message",
          title: "留言板",
          icontype: "leaveMessage",
          exact: true,
        },
      ],
    };
  },
  components: {
    Icon: Icon,
  },
  methods: {},
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
.menu-container {
  list-style: none;
  color: @gray;
  margin: 24px 0;
  padding: 0;
  a {
    padding: 0 50px;
    display: flex;
    align-items: center;
    height: 45px;
    .Icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
    &.seletced {
      color: #fff;
      background: darken(@words, 2%);
    }
  }
}
</style>
>
