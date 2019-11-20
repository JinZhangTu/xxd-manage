<template>
  <div id="xxd">
    <el-row class="mb-20">
      <span class="mr-20" style="font-size:14px;line-height:32px">管理间：</span>
      <el-select v-model="glj" size="small" placeholder="请选择" class="mr-20">
        <el-option v-for="item in gljs" :key="item" :value="item"></el-option>
      </el-select>
      <span class="mr-20" style="font-size:14px;line-height:32px">楼层：</span>
      <el-select class="mr-20" v-model="lc" size="small" placeholder="请选择">
        <el-option v-for="item in lcs" :key="item" :value="item"></el-option>
      </el-select>
      <span class="mr-20" style="font-size:14px;line-height:32px">每页显示：</span>
      <el-select class="mr-20" v-model="pageSize" size="small" placeholder="请选择">
        <el-option v-for="item in pageSizes" :key="item" :value="item"></el-option>
      </el-select>
      <div class="pull-right">
        <el-button type="primary" size="medium" class="btn-w90" @click="dialogFormVisible = true">新建</el-button>
      </div>
    </el-row>
    <el-table class="mb-20" :data="tableData" style="width: 100%">
      <el-table-column prop="pxj" label="排线架" width="300"></el-table-column>
      <el-table-column prop="pxjk" label="线号" width="300"></el-table-column>
      <el-table-column label="信息点" width="300" prop="xxd"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="信息点编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="管理间" :label-width="formLabelWidth">
          <el-input v-model="form.glj" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="楼层" :label-width="formLabelWidth">
          <el-input v-model="form.lc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排线架" :label-width="formLabelWidth">
          <el-input v-model="form.pxj" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="线号" :label-width="formLabelWidth">
          <el-input v-model="form.pxjk" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息点" :label-width="formLabelWidth">
          <el-input v-model="form.xxd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="form.type=='edit'" type="primary" @click="xxdEdit">保 存</el-button>
        <el-button v-if="form.type=='add'" type="primary" @click="xxdInsert">添 加</el-button>
      </div>
    </el-dialog>
    <el-pagination
      class="center"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :pager-count="7"
      :current-page="currentPage"
      layout="prev, pager, next"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Xxd",
  data() {
    return {
      pageSizes: [10, 15, 20, 25],
      gljs: [2, 5, 8, 10],
      pageSize: 10,
      glj: 2,
      lcs: [1, 2, 3],
      lc: 1,
      currentPage: 1,
      totalCount: 1,
      tableData: null,
      dialogFormVisible: false,
      form: {
        gjl: null,
        lc: null,
        pxj: null,
        pxjk: null,
        xxd: null,
        type: "add"
      },
      formLabelWidth: "120px"
    };
  },
  mounted() {
    this.search();
  },
  watch: {
    pageSize() {
      if (this.keyword == "") this.search();
    },
    glj() {
      if (this.glj == 2) {
        this.lcs = [1, 2, 3];
        this.lc = 1;
        this.currentPage = 1;
        this.search();
      }
      if (this.glj == 5) {
        this.lcs = [4, 5, 6];
        this.lc = 4;
        this.currentPage = 1;
        this.search();
      }
      if (this.glj == 8) {
        this.lcs = [7, 8, 9];
        this.lc = 7;
        this.currentPage = 1;
        this.search();
      }
      if (this.glj == 10) {
        this.lcs = [10, 11, 12, 13];
        this.lc = 10;
        this.search();
      }
    },
    lc() {
      this.search();
    },
    dialogFormVisible() {
      if (this.dialogFormVisible == false)
        this.form = {
          gjl: null,
          lc: null,
          pxj: null,
          pxjk: null,
          xxd: null,
          type: "add"
        };
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    handleEdit(index, row) {
      var vm = this;
      var params = {
        id: row.id
      };
      vm.axios
        .get("/api/xxdDetail", { params: params })
        .then(function(response) {
          var data = response.data;
          if (data.code == 200) {
            vm.form = data.content[0];
            vm.form.type = "edit";
            vm.dialogFormVisible = true;
          } else {
            vm.$message({
              message: data.message,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleDelete(index, row) {
      var vm = this;
      var params = {
        id: row.id
      };
      vm.axios
        .delete("/api/xxdDelete", { data: params })
        .then(function(response) {
          var data = response.data;
          if (data.code == 200) {
            vm.search();
            vm.$message({
              message: data.message,
              type: "success"
            });
          } else {
            vm.$message({
              message: data.message,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    search() {
      var vm = this;
      var params = {
        page: vm.currentPage,
        pageSize: vm.pageSize,
        glj: vm.glj,
        lc: vm.lc
      };
      vm.axios
        .get("/api/xxdList", { params: params })
        .then(function(response) {
          var data = response.data;
          if (data.code == 200) {
            vm.totalCount = data.totalCount;
            vm.tableData = data.content;
          } else {
            vm.$message({
              message: data.message,
              type: "success"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    xxdEdit() {
      var vm = this;
      var params = vm.form;
      if (
        vm.form.glj == "" ||
        vm.form.lc == "" ||
        vm.form.pxj == "" ||
        vm.form.pxjk == "" ||
        vm.form.xxd == ""
      ) {
        vm.$message({
          message: "请检查信息是否完全输入",
          type: "error"
        });
      } else {
        vm.axios
          .post("/api/xxdEdit", params)
          .then(function(response) {
            var data = response.data;
            if (data.code == 200) {
              vm.$message({
                message: data.message,
                type: "success"
              });
              vm.dialogFormVisible = false;
              vm.search();
            } else {
              vm.$message({
                message: data.message,
                type: "error"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    xxdInsert() {
      var vm = this;
      var params = vm.form;
      if (
        vm.form.glj == null ||
        vm.form.lc == null ||
        vm.form.pxj == null ||
        vm.form.pxjk == null ||
        vm.form.xxd == null
      ) {
        vm.$message({
          message: "请检查信息是否完全输入",
          type: "error"
        });
      } else {
        vm.axios
          .post("/api/xxdInsert", params)
          .then(function(response) {
            var data = response.data;
            if (data.code == 200) {
              vm.$message({
                message: data.message,
                type: "success"
              });
              vm.dialogFormVisible = false;
              vm.search();
            } else {
              vm.$message({
                message: data.message,
                type: "error"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>


<style>
#xxd {
  margin: 60px;
}
</style>