<template>
  <div class="message-area-container">
    <!-- v-on="$listeners" 会把子组件抛出来的事件原封不动的继续往上抛出 -->
    <DataForm v-on="$listeners"></DataForm>
    <h3>
      {{ title }}
      <span>({{ subTitle }})</span>
    </h3>
    <DataList :list="list"></DataList>
  </div>
</template>

<script>
import DataForm from "./DataForm.vue";
import DataList from "./DataList.vue";
import Loading from "@/components/Loading.vue";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DataForm,
    DataList,
    Loading,
  },
};
</script>

<style lang="less" scoped></style>
