<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table :data="rightsList" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="authName" label="权限名称"></el-table-column>
                <el-table-column prop="path" label="路径"></el-table-column>
                <el-table-column  label="权限等级">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level==='0'">一级</el-tag>
                        <el-tag type="success" v-else-if="scope.row.level==='1'">二级</el-tag>
                        <el-tag type="warning" v-else>三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>    
    </div>
</template>

<script>
export default {
    data(){
        return{
            rightsList:[]
        }
    },
    created(){
        this.getRightsList();
    },
    methods:{
        async getRightsList(){
            var res = await this.$http.get('rights/list');
            if(res.data.meta.status === 200){
                this.rightsList = res.data.data;
            }else{
                 this.$message({
                    type: "error",
                    message: "获取权限列表失败！",
                    center: true,
                    showClose: true,
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>