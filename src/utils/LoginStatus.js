import Vue from 'vue'

import axios from "axios"
import UrlConfig from "../config/UrlConfig.js"

var LoginStatus = {
    //退出登录
    logout(){
        localStorage.removeItem("userInfo");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    },
    //刷新用户信息
    reflashUserInfo(){
        this.getUserInfoByToken();
    },
    //更新本地的userinfo
    saveUserInfo(response){
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
    },
    //获取userinfo
    getUserInfoByToken() {  
        var that = this
        axios
          .post(
            UrlConfig.getApi().getUserInfo         
          )
          .then(function(response) {
            that.saveUserInfo(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }

}

export default LoginStatus;