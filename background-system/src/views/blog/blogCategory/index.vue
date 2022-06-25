<template>
  <div class="app-container" v-if="data">
    <el-input
      placeholder="请输入要添加的分类，右边选择该分类的等级"
      v-model="input"
      class="input-with-select blogCategoryInput"
    >
      <el-select slot="prepend" placeholder="请选择文章等级" v-model="select">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
      <!-- <el-button type="primary" plain style="margin-left: 10px">添加</el-button> -->
    </el-input>
    <el-button
      type="primary"
      style="margin-left: 10px"
      @click="handleAddBlogCategory"
      >添加</el-button
    >

    <!-- 文章的分类列表 -->
    <el-table :data="data" border style="width: 100%">
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <!-- 博客类别 -->
      <el-table-column label="博客类别" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <!-- 文章数量 -->
      <el-table-column label="文章数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.articleCount }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
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
              @click="editBlogCategory(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              circle
              @click="handleDeleteBlogCategory(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 点击编辑触发的弹出框 -->
    <el-dialog
      title="请编辑该分类信息"
      :visible.sync="dialogFormVisible"
      width="400px"
    >
      <el-form :model="dataForm">
        <el-form-item label="分类名称">
          <el-input v-model="dataForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="dataForm.order" placeholder="请选择排序等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCategory,
  addBlogCategory,
  deleteBlogCategory,
  modifyBlogCategory,
} from "@/api/blog.js";
export default {
  data() {
    return {
      input: "",
      select: "1",
      data: null,
      dialogFormVisible: false,
      dataForm: {
        name: "",
        order: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getCategory().then((res) => {
        this.data = res.data;
      });
    },
    handleAddBlogCategory() {
      addBlogCategory({ name: this.input, order: this.select }).then((res) => {
        this.$message.success("添加成功");
        this.fetchData(); // 重新渲染一次
      });
    },
    editBlogCategory(categoryInfo) {
      //点击编辑按钮 先把该条数据显示出来
      this.dataForm = { ...categoryInfo };
      this.dialogFormVisible = true;
    },
    handleDeleteBlogCategory({ id }) {
      //  根据 id 删除分类
      this.$confirm("此操作将永久删除该分类, 是否继续?", "是否删除该分类？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定删除分支
          deleteBlogCategory(id).then(() => {
            this.fetchData(); // 重新渲染一起
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editBannerConfirm() {
      // 修改博客的分类 ， 根据接口请求
      modifyBlogCategory(this.dataForm).then((res) => {
        this.fetchData(); // 重新渲染一次
        this.dialogFormVisible = false;
        this.$message.success("修改成功");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.blogCategoryInput {
  width: 400px;
  margin-bottom: 20px;
}
</style>
