<template>
  <div class="login">
      <el-divider>
        <div class="title">登录</div>
      </el-divider>

      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号">
          <el-input type="text" v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="code" suffix-icon="el-icon-warning-outline"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="role" label="4">管理员</el-radio>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">
            <span v-show="!commit">登录</span>
            <i style="width:28px" v-show="commit" class="el-icon-loading" />
          </el-button>
          <el-button @click="reset">清空</el-button>
          <span style="color:grey;font-size:13px;text-decoration:underline;">忘记密码</span>
        </el-form-item>
      </el-form>
  </div>
</template>


<script>
import VueBus from "@/utils/VueBus.js";
export default {
  data() {
    return {
      account: "admin",
      password: "12345",
      code: "as54",
      role: "4",
      commit: false
    };
  },
  methods: {
    login() {
      //请求后端数据库库，做一个判断
      var obj = { account: this.account, role: this.role };

      var str = JSON.stringify(obj);
      localStorage.setItem("user", str);
      console.log("登录账号：" + localStorage.getItem("user"));
        this.$router.push({ name: "Homebody" });
      //传值给侧边栏，做一个更新侧边栏菜单
      var that = this;
      VueBus.$emit("role", that.role);
    },
    reset() {
      this.account = "";
      this.password = "";
      this.code = "";
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 34px;
}
.demo-ruleForm {
  width: 40%;
  margin: 120px auto;
}

.login{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  height: 600px;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
</style>
