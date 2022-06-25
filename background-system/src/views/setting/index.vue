<template>
  <div class="app-container">
    <div class="block">网站信息</div>
    <div class="block2">网站标题</div>
    <div style="margin-bottom: 15px; width: 50%">
      <el-input v-model="data.siteTitle" disabled></el-input>
    </div>
    <div class="block2">邮箱</div>
    <div style="margin-bottom: 15px; width: 50%">
      <el-input v-model="data.mail" disabled></el-input>
    </div>
    <div class="block2">备案号</div>
    <div style="margin-bottom: 15px; width: 50%">
      <el-input v-model="data.icp" disabled></el-input>
    </div>
    <el-divider></el-divider>
    <div class="block">网站头部信息</div>
    <div class="block2">
      <el-image
        style="width: 240px; height: 150px"
        :src="data.avatar"
        fit="container"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <div class="block">网址图标信息</div>
    <div class="block2">网址图标地址</div>
    <div style="margin-bottom: 15px; width: 50%">
      <el-input v-model="data.favicon" disabled></el-input>
    </div>
    <div class="block2">网址图标预览</div>
    <div class="block2">
      <el-image
        style="width: 50px; height: 50px"
        :src="data.favicon"
        fit="container"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <div class="block">Github信息</div>
    <div class="block2">Github名字</div>
    <div style="margin-bottom: 15px; width: 50%">
      <el-input v-model="data.githubName" disabled></el-input>
    </div>
    <div class="block2">Github地址</div>
    <div style="margin-bottom: 15px; width: 50%">
      <el-input v-model="data.github" disabled></el-input>
    </div>
    <el-divider></el-divider>
    <div class="block">QQ信息</div>
    <div class="block2">QQ号码</div>
    <div style="margin-bottom: 15px; width: 50%">
      <el-input v-model="data.qq" disabled></el-input>
    </div>
    <div class="block2">QQ二维码图片预览</div>
    <div class="block2">
      <el-image
        style="width: 100px; height: 100px"
        :src="data.qqQrCode"
        fit="container"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <div class="block">微信信息</div>
    <div class="block2">微信号码</div>
    <div style="margin-bottom: 15px; width: 50%">
      <el-input v-model="data.weixin" disabled></el-input>
    </div>
    <div class="block2">微信二维码图片预览</div>
    <div class="block2">
      <el-image
        style="width: 100px; height: 100px"
        :src="data.weixinQrCode"
        fit="container"
      ></el-image>
    </div>

    <el-button type="primary" @click="dialogFormVisible = true"
      >点击进入编辑模式</el-button
    >

    <!-- 编辑信息的会话框 -->
    <el-dialog
      title="请编辑网站全局信息"
      :visible.sync="dialogFormVisible"
      width="80%"
    >
      <el-form :model="formData">
        <el-form-item label="网站标题">
          <el-input v-model="formData.siteTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.mail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="formData.icp" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="网站预览图地址">
          <UpLoad v-model="formData.avatar"></UpLoad>
        </el-form-item>

        <el-form-item label="网站图标地址">
          <el-input v-model="formData.favicon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Github 名字">
          <el-input v-model="formData.githubName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Github 地址">
          <el-input v-model="formData.github" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="QQ 号码">
          <el-input v-model="formData.qq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ 二维码预览">
          <UpLoad v-model="formData.qqQrCode"></UpLoad>
        </el-form-item>

        <el-form-item label="微信号码">
          <el-input v-model="formData.weixin" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信二维码预览">
          <UpLoad v-model="formData.weixinQrCode"></UpLoad>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProjectConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getGlobalSettingApi,
  modifyGlobalSetting,
} from "@/api/globalSetting.js";
import { server } from "@/utils/serverConfig.js";
import UpLoad from "@/components/UpLoad.vue";
export default {
  data() {
    return {
      dialogFormVisible: false,
      data: {},
      formData: {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        mail: "",
        qq: "",
        qqQrCode: "",
        siteTitle: "",
        weixin: "",
        weixinQrCode: "",
      },
    };
  },
  components: {
    UpLoad,
  },
  created() {
    this.fetchGlobalSettingData();
  },
  methods: {
    fetchGlobalSettingData() {
      getGlobalSettingApi().then((res) => {
        this.data = res.data;
        // 更改数据信息
        // this.data.avatar2 = server + this.data.avatar;
        // this.data.qqQrCode2 = server + this.data.qqQrCode;
        // this.data.weixinQrCode2 = server + this.data.weixinQrCode;

        this.formData = { ...this.data };
      });
    },
    editProjectConfirm() {
      modifyGlobalSetting(this.formData)
        .then((res) => {
          this.$message.success("修改成功");
          this.dialogFormVisible = false;
          this.fetchGlobalSettingData();
        })
        .catch((err) => {
          this.$message.error("修改失败");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  margin: 15px 0;

  font-size: 20px;
}
.block2 {
  margin: 15px 0;
  font-weight: 100;
}
</style>
