<template>
  <div class="app-container">
    <el-table :data="data" border style="width: 100%">
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (curPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="文章标题" width="180" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="200px"
            trigger="hover"
          >
            <el-image
              style="width: 200px; height: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="thumbList"
            ></el-image>

            <a
              href="#"
              target="_blank"
              slot="reference"
              @click.prevent="openBlogHandle(scope.row)"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="文章描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <el-table-column label="浏览量" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.scanNumber }}
        </template>
      </el-table-column>

      <el-table-column label="评论量" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.commentNumber }}
        </template>
      </el-table-column>

      <el-table-column label="所属分类" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.category === null ? "未分类" : scope.row.category.name }}
        </template>
      </el-table-column>

      <el-table-column label="创建日期" width="240" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
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
              @click="editButtonHandle(scope.row)"
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
              @click="deleteBlog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 20px"
      background
      layout="prev,pager,next,total,->,jumper,sizes"
      :total="totalCount"
      :page-size="eachPage"
      :current-page="curPage"
      :page-sizes="[8, 10, 15]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getBlogApi, deleteBlogApi } from "@/api/blog.js";
import { formatDate } from "@/utils/formatDate.js";
import { server, fontServerURL } from "@/utils/serverConfig.js";

export default {
  data() {
    return {
      data: null,
      thumbList: [],
      eachPage: 8, //  每页显示多少条数据
      curPage: 1, //   当前的页数
      totalPage: 0, // 总共有多少页
      totalCount: 0, // 总条数
    };
  },

  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBlogApi(this.curPage, this.eachPage).then((res) => {
        this.data = res.data.rows;
        // 修改下数据格式
        for (var item of this.data) {
          item.createDate = formatDate(item.createDate);
          // item.thumb = server + item.thumb;
          this.thumbList.push(item.thumb);
        }
        // 更新博客总数和页数
        this.totalCount = res.data.total;
        this.totalPage = Math.ceil(this.totalCount / this.eachPage);

        if (this.curPage > this.totalPage) {
          // 该 if 是为了防止出现 一直删除导致总页数是会减少的
          this.curPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    openBlogHandle(blogInfo) {
      //跳转到具体的文章
      window.open(`${fontServerURL}/blog/${blogInfo.id}`);
    },
    deleteBlog(blogInfo) {
      // 删除博客
      // 提供一个确认弹框
      this.$confirm("此操作将永久删除该文章, 是否继续?", "是否删除该博客？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定删除分支
          deleteBlogApi(blogInfo.id).then(() => {
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
    editButtonHandle(blogInfo) {
      // 编辑文章
      this.$router.push(`/editBlog/${blogInfo.id}`);
    },
    handleSizeChange(eachPageNum) {
      this.eachPage = parseInt(eachPageNum);
      this.curPage = 1;
      this.fetchData();
    },
    handleCurrentChange(curPageNum) {
      this.curPage = parseInt(curPageNum);
      this.fetchData();
    },
    handlePrevClick() {
      //这里不需要重新请求，在handleCurrentChange() 会同一请求更新数据的
      this.curPage - 1;
    },
    handleNextClick() {
      this.curPage + 1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
