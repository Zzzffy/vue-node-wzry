<template>
  <div class="login_container">
    <el-card class="login_card" header="请先登录">
      <el-form :model="loginForm" ref="loginFormRef">
        <el-form-item label="用户名">
          <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input prefix-icon="el-icon-view" v-model="loginForm.password" type="password" show-password></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="checkForm">登录</el-button>
          <el-button type="info" @click="resetForm('loginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: '123456'
        }
      }
    },
    methods: {
      resetForm(formName) {
        console.log(formName);
        this.$refs[formName].resetFields();
      },
      async checkForm() {
        // 解构赋值：返回结果.data = res
        const {data: res} = await this.$http.post('/login', this.loginForm) 
        console.log(res);         
        this.$message.success('登录成功')
        // 将登录成功后的token保存到客户端的sessionStorage中
        window.sessionStorage.setItem("token", res.token)
        this.$router.push('/')     
      }
    }
  };
</script>

<style scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_card {
    width: 450px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }

  .avatar_box img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>