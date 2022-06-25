<template>
  <form
    @submit.prevent="handleSubmit"
    class="data-form-container"
    ref="formContainer"
  >
    <div class="form-item">
      <div class="input-area">
        <input
          type="text"
          placeholder="用户昵称"
          v-model="formData.nickname"
          maxlength="10"
        />
        <span class="tip">{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error">{{ errorData.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea
          placeholder="请输入内容"
          v-model="formData.content"
          maxlength="300"
        ></textarea>
        <span class="tip">{{ formData.content.length }}/300</span>
      </div>
      <div class="error">{{ errorData.content }}</div>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button :disabled="isSubmitting">
          {{ isSubmitting ? "提交中" : "提交" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import showMessage from "@/utils/showMessage.js";
export default {
  data() {
    return {
      isSubmitting: false,
      formData: {
        nickname: "",
        content: "",
      },
      errorData: {
        nickname: "",
        content: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      this.errorData.nickname = this.formData.nickname ? "" : "请填写昵称！";
      this.errorData.content = this.formData.content ? "" : "请填写评论内容！";
      if (this.formData.nickname && this.formData.content) {
        this.isSubmitting = true;
        // 抛出一个事件，让父组件来处理，处理完成后要执行一个回调函数
        this.$emit("submit", this.formData, (resp) => {
          this.isSubmitting = false;
          this.formData.nickname = "";
          this.formData.content = "";
          showMessage({
            content: resp,
            type: "success",
            duration: 1000,
            container: this.$refs.formContainer,
          });
        });
      }
      return;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 8px;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:foucs {
    border-color: @primary;
  }
}
input {
  padding: 0 15px;
  height: 40px;
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  border-radius: 4px;
  background: @primary;
  &:hover {
    background: darken(@primary, 10%);
  }
  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>
