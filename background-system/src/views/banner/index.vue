<template>
  <div class="app-container" v-if="data">
    <!--  使用 element UI 组件渲染 -->
    <el-table :data="data" border style="width: 100%">
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="标题" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="小图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="height: 100px"
            :src="scope.row.midImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="height: 100px"
            :src="scope.row.bigImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column label="编辑" width="180" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editButtonHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 点击编辑触发的弹窗 -->
    <el-dialog title="请填写修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="dataForm">
        <el-form-item label="标题">
          <el-input v-model="dataForm.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="dataForm.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页小图预览">
              <UpLoad v-model="dataForm.midImg"></UpLoad>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="首页大图预览">
              <UpLoad v-model="dataForm.bigImg"></UpLoad>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanners, setBanners } from "@/api/banner.js";
import { server } from "@/utils/serverConfig.js";
import UpLoad from "@/components/UpLoad.vue";
export default {
  data() {
    return {
      data: "",
      dialogFormVisible: false,
      dataForm: {
        title: "",
        description: "",
        midImg: "",
        bigImg: "",
      },
    };
  },
  components: {
    UpLoad,
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBanners().then((res) => {
        // 这里获取的图片地址要拼接上 我们服务器的地址 ，因此对 data 的 img 数组处理下
        // for (let item of res.data) {
        //   // 往data对象里面添加两个属性
        //   item.midImg2 = server + item.midImg;
        //   item.bigImg2 = server + item.bigImg;
        // }
        this.data = res.data;
        console.log(this.data);
      });
    },
    editButtonHandle(scopeInfo) {
      // 首先把 数据显示出来
      this.dataForm = { ...scopeInfo };
      this.dialogFormVisible = true;
    },
    editBannerConfirm() {
      // 点击确定以后更新 首页标语 的内容， 提交一个表单给服务器更新数据
      // 根据 API 接口文档显示，每次更新数据时需要把所有的数据都一并更新过去
      let arr = [...this.data]; // 原始数据
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === this.dataForm.id) {
          // 根据 id 找到被修改的那条数据，然后把原数据替换成修改以后的数据
          arr[i] = this.dataForm;
        }
      }
      // 把更新完的数据数组 发送请求返还 给服务器更新
      setBanners(arr).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.dialogFormVisible = false;
        this.fetchData(); // 重新请求下更新后的数据
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
