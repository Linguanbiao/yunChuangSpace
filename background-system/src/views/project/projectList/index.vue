<template>
  <div class="app-container">
    <el-table :data="data" border style="width: 100%">
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="项目名称" width="180" align="center">
        <template slot-scope="scope">
          <a
            :href="scope.row.url"
            target="_blank"
            class="projectName"
            slot="reference"
            >{{ scope.row.name }}</a
          >
        </template>
      </el-table-column>

      <el-table-column label="项目描述">
        <template slot-scope="scope">
          {{ scope.row.description.toString() }}
        </template>
      </el-table-column>

      <el-table-column label="项目预览图" align="center" width="240">
        <template slot-scope="scope">
          <el-image
            style="height: 100px"
            :src="scope.row.thumb"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="Github地址"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              circle
              size="mini"
              class="iconfont icon-github"
              @click="editGithubButtonHandle(scope.row)"
            ></el-button>
          </el-tooltip>

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
              @click="deleteProject(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!--  编辑项目详情 -->
    <el-dialog title="请编辑该项目信息" :visible.sync="dialogFormVisible">
      <el-form :model="dataForm">
        <el-form-item label="项目名称">
          <el-input v-model="dataForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述（每一项描述以英文逗号分隔）">
          <el-input
            v-model="dataForm.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="dataForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="github地址">
          <el-input v-model="dataForm.github" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预览图地址">
          <UpLoad v-model="dataForm.thumb"></UpLoad>
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
        <el-button type="primary" @click="editProjectConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProjects, modifyProject, deleteProject } from "@/api/project.js";
import { server } from "@/utils/serverConfig.js";
import UpLoad from "@/components/UpLoad.vue";
export default {
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      dataForm: {
        name: "",
        description: "",
        github: "",
        url: "",
        thumb: "",
        order: 1,
      },
    };
  },
  components: {
    UpLoad,
  },
  created() {
    this.fetchProjectsData(); // 一开始就需要获取到项目数据
  },
  methods: {
    fetchProjectsData() {
      getProjects().then((res) => {
        this.data = res.data;
      });
    },
    editGithubButtonHandle(projectInfo) {
      window.open(projectInfo.github);
    },
    editButtonHandle(projectInfo) {
      this.dataForm = {
        ...projectInfo,
        description: projectInfo.description.toString(),
      };
      this.dialogFormVisible = true;
    },
    editProjectConfirm() {
      let objForm = { ...this.dataForm };
      objForm.description = objForm.description.split(",");
      modifyProject(objForm)
        .then((res) => {
          this.$message.success("修改成功");
          this.dialogFormVisible = false;
          this.fetchProjectsData(); // 重新渲染一次
          this.dialogFormVisible = false;
        })
        .catch((err) => {
          this.$message.error("修改失败");
        });
    },
    deleteProject(projectInfo) {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "是否删除该项目？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定删除分支
          deleteProject(projectInfo.id).then(() => {
            this.fetchProjectsData(); // 重新渲染一起
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
  },
};
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/font_3394286_ji5azjihgd9.css";
.projectName:hover {
  color: rgb(163, 163, 163);
}
.icon-github {
  font-size: 14px;
  border: none;
  background-color: rgb(163, 163, 163);
}
</style>
