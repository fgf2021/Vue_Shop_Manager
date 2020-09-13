<template>
  <el-container>
    <el-header>
      <div class="logo">
        <img src="../assets/img/logo.png" alt="图片加载失败" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" round @click="exit">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle" @click="toggleCollapse">
              <i class="el-icon-d-arrow-left" :style="isCollapse ? 'display:none' : 'display:inline'" title="点击收起"></i>
              <i class="el-icon-d-arrow-right" :style="isCollapse ? 'display:inline' : 'display:none'" title="点击展开"></i>
          </div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          style="border-right:none"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
                <template slot="title">
                    <i class="el-icon-s-operation"></i>
                    <span>用户列表</span>
                </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
                <template slot="title">
                    <i class="el-icon-s-operation"></i>
                    <span>角色列表</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/rights">
                <template slot="title">
                    <i class="el-icon-s-operation"></i>
                    <span>权限列表</span>
                </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/goods">
                <template slot="title">
                    <i class="el-icon-s-operation"></i>
                    <span>商品列表</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/params">
                <template slot="title">
                    <i class="el-icon-s-operation"></i>
                    <span>分类参数</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/categories">
                <template slot="title">
                    <i class="el-icon-s-operation"></i>
                    <span>商品分类</span>
                </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/orders">
                <template slot="title">
                    <i class="el-icon-s-operation"></i>
                    <span>订单列表</span>
                </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="/reports">
                <template slot="title">
                    <i class="el-icon-s-operation"></i>
                    <span>数据列表</span>
                </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data(){
        return{
            isCollapse:false
        }
    },
  methods: {
    exit() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toggleCollapse() {
        this.isCollapse = !this.isCollapse;
    }
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  padding: 0;
  .logo {
    width: 400px;
    height: 60px;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    line-height: 60px;
    float: left;
    img {
      width: 66px;
      height: 100%;
      vertical-align: top;
    }
    span {
      margin-left: 14px;
      letter-spacing: 2px;
    }
  }
  .el-button {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
  }
}
.el-aside {
  background-color: #333744;
    transition: all 0.5s;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s;
     -o-transition:all 0.5s;
  .toggle{
      background-color: #4a5064;
      color: white;
      font-size: 24px;
      text-align: center;
      cursor: pointer;
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>