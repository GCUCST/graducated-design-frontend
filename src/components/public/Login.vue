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
        <el-input placeholder="123" type="password" v-model="password"></el-input>
      </el-form-item>

      <el-form-item label="验证码">
        &nbsp;&nbsp; {{code}}
        <el-button @click="reflashCode" style="margin-left:20px" size="mini">刷新</el-button>
      </el-form-item>

      <el-form-item label="输入验证码">
        <el-input v-model="comfirmCode"></el-input>
      </el-form-item>

      <!-- <el-form-item>
          <el-radio v-model="role" label="1">教务员</el-radio>
          <el-radio v-model="role" label="2">教师</el-radio>
          <el-radio v-model="role" label="3">学生</el-radio>
      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" @click="getToken">
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
import axios from "axios";
import VueBus from "@/utils/VueBus.js";
import UrlConfig from "../../config/UrlConfig.js"
import LoginStatus from "../../utils/LoginStatus.js"
export default {
  data() {
    return {
      account: "201610098268",
      password: "",
      code: null,
      comfirmCode: null,
      commit: false
    };
  },

  methods: {
    //根据用户跳转页面
    JumpToIndex(ROLE)
    {
      switch (ROLE)
      {
        case "ROLE_student":  VueBus.$emit("role", "student"); break;
        case "ROLE_teacher":VueBus.$emit("role", "teacher"); break;
        case "ROLE_dean":VueBus.$emit("role", "dean"); break;
      }
        this.$router.push({ name: "Homebody" });
    },

    //获刷新且保存userinfo
    reflashAndSetUserInfo(ROLE) {
      LoginStatus.reflashAndSetUserInfo();
      this.JumpToIndex(ROLE)
    },

    //令牌校验
    checkToken(token) {
      var that = this;
      var params = new URLSearchParams();
      params.append("token", token);
      axios
        .post(UrlConfig.getApi().checkToken, params)
        .then(function(response) {
          console.log("校验成功");
          that.reflashAndSetUserInfo(response.data.authorities[0]);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取通行令牌
    getToken() {
      //1.验证码判断
      if (this.code != this.comfirmCode) {
        alert("验证码有误");
        this.comfirmCode = null;
        this.reflashCode();
        return;
      }
      //2.带上账号密码请求数据库，回调token
      var that = this;
      var params = new URLSearchParams();
      params.append("username", this.account);
      params.append("password", this.password);
      //获取token必带的三个参数
      params.append("client_id", "c1");
      params.append("client_secret", "secret");
      params.append("grant_type", "password");
      //向后端请求token
      axios
        .post(UrlConfig.getApi().getToken, params)
        .then(function(response) {
          //判断登录是否成功
          if (response.data.access_token) {
            console.log("登录成功");
            //保存令牌和刷新令牌
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            that.checkToken(response.data.access_token);
          } else {
            console.log("登录失败" + response.data.errors[1]);
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      return;

    },
    reset() {
      this.account = "";
      this.password = "";
      this.comfirmCode = "";
    },
    //刷新验证码
    reflashCode() {
      var str =
        "1234567980qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
      var code = "";
      var result = "";
      for (let i = 0; i < 4; i++) {
        code = Math.round(Math.random() * (str.length - 1));
        result += str[code];
      }
      this.code = result;
    }
  },

  mounted() {
    this.reflashCode();
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

.login {
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  height: 600px;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
</style>
