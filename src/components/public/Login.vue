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
export default {
  data() {
    return {
      account: "201610098268",
      password: "",
      code: null,
      comfirmCode: null,
      // role: "3",
      commit: false
    };
  },

  methods: {
    //根据用户跳转页面
    jumpPageByUser(role)
    {
       //根据角色跳转
          if (role == "student" || role == "teacher") {
            this.$router.push({ name: "Homebody" });
          } else if (role == "dean") {
            this.$router.push({ name: "ManageStudent" });
          }
          //传值给侧边栏，做一个更新侧边栏菜单
          VueBus.$emit("role", role);

    },
    //保存到用户信息到localstorage 
    saveUserInfo(response)
    {
       var role = response.data.object.role;
          var userinfo = response.data.object;
          var account = response.data.object.stuId
            ? response.data.object.stuId
            : response.data.object.staId;
          var name = response.data.object.name;
          //输出角色信息
          switch (role) {
            case "student":
              console.log("登录学生：" + name + "\n账号：" + account);
              break;
            case "teacher":
              console.log("登录老师：" + name + "\n账号：" + account);
              break;
            case "dean":
              console.log("登录教务员：" + name + "\n账号：" + account);
              break;
            default:
              console.log("获取角色错误，情练习管理员。");
              break;
          }
          //保存角色信息
          var obj = { account: account, role: role, info: userinfo };
          localStorage.setItem("userInfo", JSON.stringify(obj));

          this.jumpPageByUser(role);
    },

    //获取用户信息
    getUserInfoByToken(token) {
      var that = this
      axios
        .post(
          "/api/comm/getuserInfo",
          {},
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        )
        .then(function(response) {
          that.saveUserInfo(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //令牌校验
    checkToken(token) {
      var that = this;
      var params = new URLSearchParams();
      params.append("token", token);
      axios
        .post("/api/oauth/check_token", params)
        .then(function(response) {
          console.log("校验成功");
          that.getUserInfoByToken(token);
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
        .post("/api/oauth/token", params)
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

      // var obj = { account: this.account, role: role };
      // var str = JSON.stringify(obj);
      // localStorage.setItem("user", str);
      // console.log("登录账号：" + localStorage.getItem("user"));
      // if (role == 2 || role == 3) {
      //   this.$router.push({ name: "Homebody" });
      // } else if (role == 1) {
      //   this.$router.push({ name: "ManageStudent" });
      // }
      // //传值给侧边栏，做一个更新侧边栏菜单
      // var that = this;
      // VueBus.$emit("role", that.role);
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
