<template>
  <div>
    <div>
      <div style="margin:0 auto;width:300px;text-align:center;margin-bottom:200px">
        <input
          @change="change()"
          type="file"
          id="select"
          style="opacity: 0;
    border: 1px solid;
    height: 80px;
    width: 90px;
    position: relative;
    top: 120px;"
        />

        <br />
        <el-avatar :size="120" :src="img"></el-avatar>
        <br />
        <br />
        <span>{{file==null?null:file.name}}</span>
        <div id="box">
          <el-button @click="updateAvatar" v-if="file!=null">上传头像</el-button>
          <el-button @click="reflashAvatar">刷新头像</el-button>
        </div>
      </div>
    </div>
    <!-- 地址：{{srcBase+user.info.avatar}} -->
  </div>
</template>


<script>
import UrlConfig from "../../../config/UrlConfig.js";
import * as qiniu from "qiniu-js";
import axios from "axios";
import LoginStatus from "../../../utils/LoginStatus.js";
import UploadUtil from "../../../utils/UploadUtil.js";
import VueBus from "@/utils/VueBus"

export default {
  name: "myavatar",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("userInfo")),
      img: null,
      file: null
    };
  },
  mounted() {
    this.img = UrlConfig.getQiniuyunUrl() + this.user.info.avatar;

    var that = this;
    VueBus.$on("uploadFinishMyAvatar", function(data) {
      console.log("MyAvatar收到成功", data);
      alert("上传成功！");
      that.file = null;
    });
  },
  beforeDestroy(){
      VueBus.$off("uploadFinishMyAvatar");
  },
  methods: {
    reflashAvatar() {
      LoginStatus.getUserInfoByToken();
      setInterval(() => {
        this.user = JSON.parse(localStorage.getItem("userInfo"));
        this.img = UrlConfig.getQiniuyunUrl() + this.user.info.avatar;
      }, 2000);
      console.log("刷新完成。");
    },
    change() {
      var file = document.getElementById("select").files[0];
      this.file = file;
      if (!file.type.startsWith("image")) {
        alert("请选择图片！");
        this.file = null;
      }
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
      var suffix = "";
      var targetType = "updateAvatar";

      UploadUtil.upload(
        file,
        midType,
        suffix,
        username,
        targetType,
        "MyAvatar"
      );
      // setTimeout(()=>
      // {
      //   alert("上传成功！")
      //   this.file = null
      // },3000)
    }
  }
};
</script>

<style scoped>
</style>
