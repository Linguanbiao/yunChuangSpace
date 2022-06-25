<template>
  <ul class="contact-container">
    <li>
      <a :href="data.github">
        <div class="icon">
          <Icon type="github" class="qq_icon"></Icon>
        </div>
        <span>Linguanbiao</span>
      </a>
    </li>

    <li>
      <a href="mailto:linguanbiao@e.gzhu.edu.cn">
        <div class="icon">
          <Icon type="email" class="qq_icon"></Icon>
        </div>
        <span>linwinwin@gmail.com</span>
      </a>
    </li>

    <li>
      <a
        href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=497378774&fuin=2624802326&website=www.oicqzone.com"
      >
        <div class="icon">
          <Icon type="qq" class="qq_icon"></Icon>
        </div>
        <span>497378774</span>
      </a>
      <div class="pop">
        <img :src="data.qqQrCode" />
      </div>
    </li>

    <li>
      <a href="">
        <div class="icon">
          <Icon type="wechat" class="qq_icon"></Icon>
        </div>
        <span>Linwinwin</span>
      </a>
      <div class="pop">
        <img :src="data.weixinQrCode" />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/icon.vue";
import { mapState } from "vuex";
export default {
  components: {
    Icon: Icon,
  },
  computed: {
    ...mapState("setting", ["data"]),
  },
};
</script>
<style lang="less" scoped>
@import "~@/style/var.less";
.contact-container {
  list-style: none;
  padding: 20px;
  margin: 0;
  color: @gray;
  li {
    height: 30px;
    position: relative;
    line-height: 30px;
    margin: 14px 0;
    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
  }
  a {
    display: flex;
    align-items: center;
    &:hover {
      color: #fff;
    }
  }
  .icon {
    width: 36px;
    height: 30px;
    .qq_icon {
      font-size: 26px;
    }
  }

  .pop {
    position: absolute;
    left: 0;
    bottom: 35px;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    transition: 0.3s;
    img {
      height: 150px;
      height: 150px;
    }
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background: #fff;
      bottom: -4px;
    }
  }
}
</style>
