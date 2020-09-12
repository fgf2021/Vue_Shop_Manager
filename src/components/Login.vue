<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/img/timg.png" alt="图片加载失败" />
      </div>
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
          class="demo-ruleForm"
        >
          <el-form-item  prop="username">
            <el-input prefix-icon="el-icon-user-solid" placeholder="请输入用户名" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="sub">登录</el-button>
            <el-button type="primary" plain @click="resetForm('ruleForm')" class="re">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }   else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { validator: validatePass, trigger: 'blur' },
            { min: 3, max: 10,message:"用户名长度应为3~10个字符", trigger:"blur"}
          ],
          password: [
            { validator: validatePass2, trigger: 'blur' },
            { min: 6, max: 16,message:"密码长度应为6~16个字符", trigger:"blur"}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            const res = await this.$http.post("login",this.ruleForm);
            if(res.data.meta.status === 200){
              this.$message({
                type: 'success',
                message:'登陆成功！',
                center:true,
                showClose: true
              });
              window.sessionStorage.setItem("token",res.data.data.token);
              this.$router.push('/home');
            }else{
              return this.$message({
                type: 'error',
                message:'用户名或密码错误！',
                center:true,
                showClose: true
              });
            }
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;

  .login_box {
    height: 300px;
    width: 450px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -225px;
    margin-top: -150px;

    .avatar_box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px;
      background-color: #eee;
      position: absolute;
      left: 50%;
      margin-left: -76px;
      margin-top: -76px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .demo-ruleForm{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 25px;
        box-sizing: border-box;

        .sub{
            float: right;
        }
        .re{
            margin: 0;
        }
    }
  }
}
</style>