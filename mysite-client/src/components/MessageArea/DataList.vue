<template>
  <ul id="dataCommentList" class="data-list-container">
    <li v-for="item in list" :key="item.id">
      <Avatar :url="item.avatar" :size="44"> </Avatar>
      <div class="data">
        <div class="nickname">{{ item.nickname }}</div>
        <div class="content">
          {{ item.content }}
        </div>
        <span class="time">{{ formatDate(item.createDate, true) }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import formatDate from "@/utils/formatDate.js";
import Loading from "@/components/Loading.vue";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Avatar,
    Loading,
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
.CommentListContainer {
  height: 100%;
  width: 100%;
  position: relative;
}
.data-list-container {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: flex;
  border-bottom: 1px solid lighten(@gray, 20%);
  padding: 5px 0;
}
.avatar-container {
  margin-right: 15px;
  width: 50px;
}
.data {
  width: 100%;
  position: relative;
  .nickname {
    color: darken(@success, 10%);
    margin-bottom: 10px;
    margin-left: 5px;
  }
  .content {
    font-size: 14px;
    margin-left: 5px;
  }
}
.time {
  white-space: nowrap;
  color: @gray;
  font-size: 12px;
  position: absolute;
  right: 10px;
  top: 0;
}
</style>
