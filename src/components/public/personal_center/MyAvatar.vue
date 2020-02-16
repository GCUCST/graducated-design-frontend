<template>
  <div>
    <div>
      <div>
        <el-avatar :size="100" :src="user.info.avatar"></el-avatar>
      </div>
    </div>
    地址：{{user.info.avatar}}
    <br />

    <div id="box">
      <input type="file" id="select" /><br>
      <el-button @click="updateAvatar">上传头像</el-button>
        <el-button @click="reflashAvatar">刷新头像</el-button>
    </div>
  </div>
</template>


<script>
import UrlConfig from "../../../config/UrlConfig.js";
import * as qiniu from "qiniu-js";
import axios from "axios";
import LoginStatus from "../../../utils/LoginStatus.js"
import UploadUtil from "../../../utils/UploadUtil.js"

export default {
  name: "myavatar",
  data() {
    return {
      msg: "个人中心",
      user: JSON.parse(localStorage.getItem("userInfo"))
    };
  },
  methods: {
    reflashAvatar(){
      LoginStatus.getUserInfoByToken();
      setInterval(() => {
        this.user = JSON.parse(localStorage.getItem("userInfo"));
      }, 2000);
      console.log("刷新完成。")
    },
    async updateAvatar() {
      //上传文件
      var file = document.getElementById("select").files[0];
      if (file == null) {
        alert("请选择文件");
        return;
      }
      var username = JSON.parse(localStorage.getItem("userInfo")).account;
      var midType = "avatar";
      var suffix = ".jpg";
      var targetType = "updateAvatar";
      
      UploadUtil.upload(file,midType,suffix,username,targetType)
      
    }
  }
};
</script>

<style scoped>
</style>
