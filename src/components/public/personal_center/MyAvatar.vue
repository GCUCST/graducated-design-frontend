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
      this.user = JSON.parse(localStorage.getItem("userInfo"))
      console.log("刷新完成。")
    },
    //从服务器获取本次上传的名称
    getUploadKey(type, suffix) {
      var params = new URLSearchParams();
      params.append("type", type);
      params.append("suffix", suffix);
      return new Promise((resolve, reject) => {
        axios.post(UrlConfig.getApi().getKey, params).then(function(response) {
          resolve(response);
        });
      });
    },
    //获取七牛云通行证
    getQiniuyunUpToken() {
      var params = new URLSearchParams();
      //指定回调的地址
      params.append("callbackUrl", UrlConfig.getUrl().callbackUrl);
      return new Promise((resolve, reject) => {
        axios
          .post(UrlConfig.getApi().getQiniuyunUploadToken, params)
          .then(function(response) {
            resolve(response);
          });
      });
    },

    async updateAvatar() {
      var tokenResult = await this.getQiniuyunUpToken();
      var keyResult = await this.getUploadKey("avatar", "jpg");
      var token = tokenResult.data.token;
      var key = keyResult.data.key;
      //判断是否成功获取key和token
      if (key == null || token == null) return;
      //上传文件
      var file = document.getElementById("select").files[0];

      if (file == null) {
        alert("请选择文件");
        return;
      }
      //做到这里  214
      //定义用户名
      var putExtra = {
         params:{
           'x:username':JSON.parse(localStorage.getItem("userInfo")).account,
           "x:target":'updateAvatar'
        }
         
      };
      var observer = {
        next(res) {
          console.log("do..: ", res);
        },
        error(err) {
          console.log("上传错误: ", err);
        },
        complete(res) {
          console.log("上传完成: ", res);
          //更新储存的用户信息
          LoginStatus.reflashUserInfo()
          alert("更新完成，请点击刷新头像。")
          
        }
      };
      var observable = qiniu.upload(file, key, token, putExtra,null);
      var subscription = observable.subscribe(observer); // 上传开始
    }
  }
};
</script>

<style scoped>
</style>
