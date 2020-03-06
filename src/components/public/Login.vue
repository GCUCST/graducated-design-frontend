<template>
  <div class="login">
    <div
      v-if="findPassPanel"
      style="width: 80%;
    text-align: left;
    height: 80%;
    position: absolute;
    z-index: 999;
    background:white;"
    >
      <div style="text-align:right">
        <el-button @click="findPassPanel = !findPassPanel" icon="el-icon-close" circle></el-button>
      </div>
      <el-divider content-position="center">
        <div class="title">邮箱重置密码</div>
      </el-divider>
      <div style="width:400px;margin:150px auto;">
        <div style="width:600px;">
          账号：
          <el-input v-model="account" style="width:300px;"></el-input>
        </div>
        <br />
        <div style="width:600px;">
          验证：
          <el-input v-model="emailCode" style="width:300px;"></el-input>
          <el-button @click="getMailCode()" v-show="coutdown==0">获取验证码</el-button>
          <el-button v-show="coutdown!=0">{{coutdown}}秒</el-button>
        </div>
        <br />
        <div style="text-align:center">
          <el-button @click="resetMyPasswordByEmailCode()">提交重置</el-button>
        </div>
      </div>
    </div>

    <el-divider>
      <div class="title">登录</div>
    </el-divider>

    <el-form style="font-weight:560" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号">
        <el-input placeholder="请输入账号" type="text" v-model="account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" type="password" v-model="password"></el-input>
      </el-form-item>

      <el-form-item label="验证码">
        &nbsp;&nbsp; {{code}}
        <el-button @click="reflashCode" type="text" style="margin-left:20px">
          <i class="el-icon-refresh-left" />
        </el-button>
      </el-form-item>

      <el-form-item style="font-weight:560" label="验证码">
        <el-input placeholder="请输入验证码" v-model="comfirmCode"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="font-weight:560" @click="getToken">
          <span v-show="!commited">登录</span>
          <i style="width:28px" v-show="commited" class="el-icon-loading" />
        </el-button>
        <el-button @click="reset" style="font-weight:560">清空</el-button>
        <span
          @click="findPassPanel = !findPassPanel"
          style="color:grey;font-size:13px;text-decoration:underline;cursor:pointer"
        >忘记密码</span>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import axios from "axios";
import VueBus from "@/utils/VueBus.js";
import UrlConfig from "../../config/UrlConfig.js";
import LoginStatus from "../../utils/LoginStatus.js";
export default {
  data() {
    return {
      coutdown: 0,
      emailCode: null,
      findPassPanel: false,
      account: "1001",
      password: "123",
      code: null,
      comfirmCode: null,
      commited: false
    };
  },

  methods: {
    resetMyPasswordByEmailCode() {
      if (this.account == null || this.account == "") {
        alert("请输入账户");
        return;
      }
      if (this.emailCode == null || this.emailCode == "") {
        alert("请输入邮箱验证码");
        return;
      }
      var that = this;
      var params = new URLSearchParams();
      params.append("username", this.account);
      params.append("emailCode", this.emailCode);
      axios
        .post("/comm/checkEmailCode", params)
        .then(function(response) {
          console.log(response.data.status)
           that.$message({
              message:  response.data.status?response.data.message 
              +"，重置密码的为该账号！":"验证码有误。" ,
              type: response.data.status?"success":'error'
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cunDowmMinu() {
      this.coutdown = 60;
      var that = this;
      var timer = setInterval(() => {
        that.coutdown -= 1;
        if (Number(that.coutdown) <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
    getMailCode() {
      if (this.account == null || this.account == "") {
        alert("请输入账户");
        return;
      }
      this.cunDowmMinu();
      var that = this;
      var params = new URLSearchParams();
      params.append("username", this.account);
      axios
        .post("/comm/sendEmail", params)
        .then(function(response) {
          if (response.data.object) {
            that.$message({
              message: "已经向" + response.data.message + "发送。",
              type: "success"
            });
          } else {
            that.$message.error(
              "用户邮箱错误：***" +
                response.data.message.substring(3) +
                ",请联系教务员修改密码。"
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //根据用户跳转页面
    JumpToIndex(ROLE) {
      switch (ROLE) {
        case "ROLE_student":
          VueBus.$emit("role", "student");
          break;
        case "ROLE_teacher":
          VueBus.$emit("role", "teacher");
          break;
        case "ROLE_dean":
          VueBus.$emit("role", "dean");
          break;
      }
      this.$router.push({ name: "Homebody" });
    },

    //获刷新且保存userinfo，然后根据角色做一个跳转页面
    reflashAndSetUserInfo(ROLE) {
      LoginStatus.reflashAndSetUserInfo();

      setTimeout(() => {
        this.JumpToIndex(ROLE);
      }, 2000);
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
          that.$message({
            message: "登录成功,正在跳转",
            type: "success"
          });
          that.reflashAndSetUserInfo(response.data.authorities[0]);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取通行令牌
    getToken() {
      //账号密码为空判断
      if (this.account == "" || this.password == "") {
        this.$message.error("请输入账号和密码!");
        return;
      }

      //1.验证码判断
      if (this.code != this.comfirmCode) {
        this.$message.error("验证码有误");
        this.comfirmCode = null;
        this.reflashCode();
        return;
      }
      //2.带上账号密码请求数据库，回调token
      //点击了提交，进入读取状态
      this.$message("正在校验。。");
      this.commited = true;
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
          if (response == "请求异常") {
            that.comfirmCode = null;
            that.commited = false;
            that.password = null;
            that.reflashCode();
            that.$message.error("登录失败！账户或者密码错误。");
          } else if (response.data.access_token) {
            console.log("登录成功");
            //保存令牌和刷新令牌
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            that.checkToken(response.data.access_token);
          }
        })
        .catch(function(error) {
          that.commited = false;
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
  font-weight: 500;
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
box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
border-radius: 5px;
}
</style>
