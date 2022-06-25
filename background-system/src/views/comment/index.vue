<template>
  <div class="app-container">
    <el-table :data="data" border style="width: 100%">
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (curPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="头像" width="180" align="center">
        <template slot-scope="scope">
          <el-image
            style="height: 100px"
            :src="scope.row.avatar"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column label="昵称" width="100">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>

      <el-table-column label="评论文章" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.blog.title }}
        </template>
      </el-table-column>

      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <el-table-column label="评论日期" width="240" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
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
              @click="deleteComment(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      style="margin-top: 20px"
      background
      layout="prev,pager,next,total,->,jumper,sizes"
      :total="totalCount"
      :page-size="eachPage"
      :current-page="curPage"
      :page-sizes="[2, 4, 8]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getCommentsApi, deleteCommentApi } from "@/api/comment.js";
import { formatDate } from "@/utils/formatDate.js";
import { server } from "@/utils/serverConfig.js";

export default {
  data() {
    return {
      data: null,
      eachPage: 2, //  每页显示多少条数据
      curPage: 1, //   当前的页数
      totalPage: 0, // 总共有多少页
      totalCount: 0,
    };
  },
  created() {
    this.fetchCommentData();
  },
  methods: {
    fetchCommentData() {
      getCommentsApi(this.curPage, this.eachPage).then((res) => {
        this.data = res.data.rows; //赋值
        // 修改下数据的格式
        for (let item of this.data) {
          item.createDate = formatDate(item.createDate);
        }
        // 更新博客总数和文章总数
        this.totalCount = res.data.total;
        this.totalPage = Math.ceil(this.totalCount / this.eachPage);

        if (this.curPage > this.totalPage) {
          //  该 if 是为了防止出现一只删除导致总页数减少
          this.curPage = this.totalPage;
          this.fetchCommentData();
        }
      });
    },
    deleteComment(commentInfo) {
      // 删除评论
      this.$confirm("此操作将永久删除该评论, 是否继续?", "是否删除该评论？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定删除分支
          deleteCommentApi(commentInfo.id).then(() => {
            this.fetchCommentData(); // 重新渲染一次
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
    handleSizeChange(eachPageNum) {
      this.eachPage = parseInt(eachPageNum);
      this.curPage = 1;
      this.fetchCommentData();
    },
    handleCurrentChange(curPageNum) {
      //  这是跳转后的回调函数，自带一个参数是当前页的页数
      this.curPage = parseInt(curPageNum);
      this.fetchCommentData();
    },
    handlePrevClick() {
      this.curPage - 1;
    },
    handleNextClick() {
      this.curPage + 1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
