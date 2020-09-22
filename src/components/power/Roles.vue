<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="rdialogVisible = true">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="roleList" border stripe>
        <el-table-column type="expand">
            <template slot-scope="scope">
                <el-row :class="['bdbottom',i1===0 ? 'bdtop':'','vcenter']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
                    <el-col :span="5">
                        <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="19">
                        <el-row :class="[i2===0 ? '':'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
                            <el-col :span="6">
                                <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="18">
                                <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="removeRightById(scope.row,item3.id)">{{item3.authName}}</el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="redit(scope)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="rdele(scope)">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="right(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="添加角色"
      :visible.sync="rdialogVisible"
      width="30%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form :model="rruleForm" :rules="rrules" ref="rruleForm" label-width="90px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="rruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="rruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rreset('rruleForm')">重 置</el-button>
        <el-button @click="rdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rsub('rruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑角色"
      :visible.sync="editrdialogVisible"
      width="30%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form :model="editrruleForm" :rules="editrrules" ref="editrruleForm" label-width="90px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editrruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editrruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editrdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editrsub('editrruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="分配权限"
      :visible.sync="rightdialogVisible"
      width="30%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @close="closeed"
    >
      <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleId:'',
      roleList: [],
      rightsList:[],
      rdialogVisible: false,
      editrdialogVisible:false,
      rightdialogVisible:false,
      treeProps:{
          label:'authName',
          children:'children'
      },
      rruleForm:{
          roleName:'',
          roleDesc:''
      },
      rrules:{
          roleName:[
            {
                required: true,
                message: "请输入角色名",
                trigger: "blur",
            },
            {
                min: 2,
                max: 8,
                message: "角色名长度应为2~8个字符",
                trigger: "blur",
            },
          ]
      },
      editrruleForm:{
          roleId:'',
          roleName:'',
          roleDesc:''
      },
      editrrules:{
          roleName:[
            {
                required: true,
                message: "请输入角色名",
                trigger: "blur",
            },
            {
                min: 2,
                max: 8,
                message: "角色名长度应为2~8个字符",
                trigger: "blur",
            },
          ]
      },
      defKeys:[]
      
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      var res = await this.$http.get("roles");
      if (res.data.meta.status === 200) {
         
        this.roleList = res.data.data;
      } else {
        this.$message({
          type: "error",
          message: "获取角色列表失败！",
          center: true,
          showClose: true,
        });
      }
    },
    rreset(ruleFormr){
        this.$refs[ruleFormr].resetFields();
    },
    rsub(ruleFormr){
        this.$refs[ruleFormr].validate(async (valid)=>{
            if(valid){
                var res = await this.$http.post('roles',this.rruleForm);
                if(res.data.meta.status===201){
                     this.$message({
                        type: "success",
                        message: "添加成功！",
                        center: true,
                        showClose: true,
                    });
                    this.$refs[ruleFormr].resetFields();
                    this.getRoleList();
                }else{
                    this.$message({
                    type: "error",
                    message: "添加失败！",
                    center: true,
                    showClose: true,
                    });
                }
            }else{
                return false
            }
        })
    },
    redit(scope){
        this.editrdialogVisible = true;
        this.editrruleForm.roleId = scope.row.id;
        this.editrruleForm.roleName = scope.row.roleName;
        this.editrruleForm.roleDesc = scope.row.roleDesc;
    },
    editrsub(ruleFormr){
        this.$refs[ruleFormr].validate(async (valid)=>{
            if(valid){
                var res = await this.$http.put('roles/'+this.editrruleForm.roleId,{
                    roleName:this.editrruleForm.roleName,
                    roleDesc:this.editrruleForm.roleDesc
                });
                if(res.data.meta.status===200){
                     this.$message({
                        type: "success",
                        message: "编辑成功！",
                        center: true,
                        showClose: true,
                    });
                    this.editrdialogVisible = false;
                    this.getRoleList();
                }else{
                    this.$message({
                    type: "error",
                    message: "编辑失败！",
                    center: true,
                    showClose: true,
                    });
                }
            }else{
                return false
            }
        })
    },
    rdele(scope){
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete('roles/'+scope.row.id);
          if(res.data.meta.status === 200){
            this.$message({
            type: 'success',
            message: '删除成功!',
            center: true,
            showClose: true
          });
          this.getRoleList();
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
    },
    removeRightById(role,rightId){
         this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
          if(res.data.meta.status === 200){
            this.$message({
            type: 'success',
            message: '删除成功!',
            center: true,
            showClose: true
          });
          role.children = res.data.data;
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
    },
    async right(role){
        this.roleId = role.id;
        this.getLeafKeys(role,this.defKeys)
        this.rightdialogVisible = true;
        var res = await this.$http.get('rights/tree');
        if(res.data.meta.status === 200){
            this.rightsList = res.data.data;
        }else{
            this.$message({
            type: 'error',
            message: '设置权限失败!',
            center: true,
            showClose: true
          });
        }
    },
    getLeafKeys(node,arr){
        if(!node.children){
            return arr.push(node.id)
        }
        node.children.forEach(item=>
        this.getLeafKeys(item,arr))
    },
    closeed(){

        this.defKeys=[]
    },
    async allotRights(){
       const keys =[ ...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()];
       const idStr = keys.join();

        var res = await this.$http.post(`roles/${this.roleId}/rights`,{
            rids:idStr
        });
        if(res.data.meta.status===200){
            this.$message({
            type: "success",
            message: "设置权限成功！",
            center: true,
            showClose: true,
        });
        this.getRoleList();
        this.rightdialogVisible = false
        }else{
            this.$message({
            type: 'error',
            message: '设置权限失败!',
            center: true,
            showClose: true
          });
        }
    }
  },
};
</script>

<style lang="less" scoped>
    .el-tag{
        margin: 7px;
    }

    .bdtop{
        border-top: 1px solid #eee;
    }
    .bdbottom{
        border-bottom:1px solid #eee;
    }
    .vcenter{
        display:flex;
        align-items: center;
    }
</style>