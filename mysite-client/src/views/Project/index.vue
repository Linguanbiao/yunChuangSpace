<template>
  <div class="project-container">
    <Loading v-if="!data"></Loading>
    <ul class="project-details">
      <li v-for="item in data" :key="item.id">
        <div class="container">
          <img :src="item.thumb" alt="" class="thumb" />
          <div class="info">
            <h2>{{ item.name }}</h2>
            <p>项目描述: {{ item.description.toString() }}</p>
            <!-- <p>Github 仓库: {{ item.github }}</p> -->
            <a :href="item.github" class="iconContainer">
              <Icon type="github" class="icon"></Icon>
              <span> 点我查看</span>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import Icon from "@/components/icon.vue";
import { mapState } from "vuex";

export default {
  components: {
    Loading,
    Icon,
  },
  computed: {
    ...mapState("project", ["data"]),
  },
  created() {
    this.$store.dispatch("project/fetchProject");
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
.project-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 5px;
  padding-top: 0px;
  box-sizing: border-box;
  position: relative;
  .project-details {
    width: 100%;
    height: 100%;
    overflow: auto;
    list-style: none;
    padding: 10px;
    li {
      width: 100%;
      margin: 20px auto;
      position: relative;
      border-bottom: 1px solid @gray;
      .container {
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        img {
          width: 300px;
          height: 180px;
          background-size: cover;
          margin-left: 5px;
          border-radius: 5px;
          box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5);
        }
        .info {
          margin-left: 30px;
          position: absolute;
          top: 5px;
          left: 310px;
        }
      }
      &:hover {
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.9);
        border-radius: 5px;
        background-color: rgba(165, 163, 163, 0.5);
      }
    }
  }
}
.iconContainer {
  height: 50px;
  width: 50px;
  line-height: 50px;
  font-size: 14px;
  color: @words;
  .icon {
    font-size: 20px;
  }
}
</style>
