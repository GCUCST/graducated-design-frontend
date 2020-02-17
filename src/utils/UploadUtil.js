import Vue from 'vue'

import axios from "axios"
import UrlConfig from "../config/UrlConfig.js"
import * as qiniu from "qiniu-js";
import VueBus from "@/utils/VueBus.js";




var UploadUtil = {
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

    async upload(file,minType,suffix,username,targeType) {
      var tokenResult = await this.getQiniuyunUpToken();
      var keyResult = await this.getUploadKey(minType,suffix);
      var token = tokenResult.data.token;
      var key = keyResult.data.key;
      //判断是否成功获取key和token
      if (key == null || token == null){
        console.log("获取key和token失败...")
        return;
      } 
      //上传文件
      if (file == null) {
        alert("请选择文件");
        return;
      }
      //定义用户名
      var putExtra = {
         params:{
           //这里到时候要改成请求回来的数据username。否则可以通过修改localstorage来改别人的头像
           'x:username':username,
           "x:target":targeType
        }
      };
      var observer = {
        next(res) {
          console.log("上传... ");
          VueBus.$emit("uploadPrecent", res.total.percent); 
        },
        error(err) {
          console.log("上传错误！");
          VueBus.$emit("uploadError", err); 
        },
        complete(res) {
          console.log("上传完成!"); 
          VueBus.$emit("uploadFinish", res);      
          
        }
      };
      var observable = qiniu.upload(file, key, token, putExtra,null);
      var subscription = observable.subscribe(observer); // 上传开始
    }



}

export default UploadUtil;