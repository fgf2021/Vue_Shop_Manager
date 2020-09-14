<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="40">
        <el-col :span="8">
          <el-input placeholder="请输入搜索关键字" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="dele(scope)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 4, 6, 7]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reset('ruleForm')">重 置</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改用户信息"
      :visible.sync="editdialogVisible"
      width="30%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form :model="editruleForm" :rules="editrules" ref="editruleForm" label-width="90px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editruleForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="editruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsub('editruleForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 7,
      },
      userList: [],
      total: 0,
      dialogVisible: false,

      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "用户名长度应为3~10个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 16,
            message: "密码长度应为6~16个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^((13|14|15|16|17|18)[0-9]{1}\d{8})|((166|199|198)[0-9]{1}\d{7})$/,
            message: "请输入正确的电话号码",
            trigger: ["blur", "change"],
          },
        ],
      },
      editdialogVisible: false,
      editruleForm: {
        id: "",
        username: "",
        email: "",
        mobile: "",
      },
      editrules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^((13|14|15|16|17|18)[0-9]{1}\d{8})|((166|199|198)[0-9]{1}\d{7})$/,
            message: "请输入正确的电话号码",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const res = await this.$http.get("users", { params: this.queryInfo });
      if (res.data.meta.status === 200) {
        this.userList = res.data.data.users;
        this.total = res.data.data.total;
      } else {
        this.$message({
          type: "error",
          message: "获取用户数据失败！",
          center: true,
          showClose: true,
        });
      }
    },

    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },

    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },

    async userStateChanged(userinfo) {
      const res = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.data.meta.status === 200) {
        this.$message({
          type: "success",
          message: "更新用户状态成功！",
          center: true,
          showClose: true,
        });
      } else {
        this.$message({
          type: "error",
          message: "更新用户状态失败！",
          center: true,
          showClose: true,
        });
        userinfo.mg_state = !userinfo.mg_state;
      }
    },

    reset(formname) {
      this.$refs[formname].resetFields();
    },

    sub(formname) {
      this.$refs[formname].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post("users", this.ruleForm);
          if (res.data.meta.status === 201) {
            this.$message({
              type: "success",
              message: "添加成功！",
              center: true,
              showClose: true,
            });
            this.$refs[formname].resetFields();
            this.getUserList();
          } else {
            return this.$message({
              type: "error",
              message: "添加失败！",
              center: true,
              showClose: true,
            });
          }
        } else {
          return false;
        }
      });
    },
    edit(scope) {
      this.editdialogVisible = true;
      this.editruleForm.id = scope.row.id;
      this.editruleForm.username = scope.row.username;
      this.editruleForm.email = scope.row.email;
      this.editruleForm.mobile = scope.row.mobile;
    },
    editsub(editruleForm) {
      this.$refs[editruleForm].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.put("users/" + this.editruleForm.id, {
            email: this.editruleForm.email,
            mobile: this.editruleForm.mobile,
          });
          if (res.data.meta.status === 200) {
            this.$message({
              type: "success",
              message: "修改成功！",
              center: true,
              showClose: true,
            });
            this.editdialogVisible = false;
            this.getUserList();
          } else {
            return this.$message({
              type: "error",
              message: "修改失败！",
              center: true,
              showClose: true,
            });
          }
        } else {
          return false;
        }
      });
    },

        dele(scope) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete('users/'+scope.row.id);
          if(res.data.meta.status === 200){
            this.$message({
            type: 'success',
            message: '删除成功!',
            center: true,
            showClose: true
          });
          this.getUserList();
          }else{
            this.$message({
            type: 'error',
            message: '删除失败!',
            center: true,
            showClose: true
          });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            center: true,
            showClose: true
          });          
        });
      }
  },
};
</script>

<style lang="less" scoped>
</style>