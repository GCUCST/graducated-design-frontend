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
      <input type="file" id="select" />
      <el-button @click="updateAvatar">点击修改头像</el-button>
    </div>
  </div>
</template>


<script>
import * as qiniu from "qiniu-js";
import axios from "axios";
export default {
  name: "myavatar",
  data() {
    return {
      msg: "个人中心",
      user: JSON.parse(localStorage.getItem("userInfo"))
    };
  },
  methods: {
    //从服务器获取本次上传的名称
    getUploadKey(type,suffix) {
      var params = new URLSearchParams();
      params.append("type",type);
      params.append("suffix", suffix);
      axios
        .post("/api/comm/getKey", params, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
          }
        })
        .then(function(response) {
          console.log(response.data.key);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    updateAvatar() {
      this.getUploadKey("avatar","jpg");
      return;  ///做到这里

      var key = null;
      var token =
        "fowMfgH7t7z8zoOJlBxwO0viT9cZCRejf6BUdGXJ:ORW3puA2wGy8vSklq2XAoppqRR4=:eyJjYWxsYmFja0JvZHlUeXBlIjoiYXBwbGljYXRpb24vanNvbiIsInNjb3BlIjoiY3N0LWltYWdlIiwiY2FsbGJhY2tVcmwiOiJodHRwOi8vY3N0Lm5hdGFwcDEuY2MvY29tbS9jYWxsYmFjayIsImRlYWRsaW5lIjoxNjQxNjA0NzE2LCJjYWxsYmFja0JvZHkiOiJ7XCJrZXlcIjokKGtleSksXCJtaW1lVHlwZVwiOiQobWltZVR5cGUpLFwiZm5hbWVcIjokKGZuYW1lKSxcImJ1Y2tldFwiOiQoYnVja2V0KSxcImltYWdlQXZlXCI6JChpbWFnZUF2ZSl9LFwiaW1hZ2VJbmZvXCI6JChpbWFnZUluZm8pfSJ9";

      var file = document.getElementById("select").files[0];
      // var config = {
      //   retryCount:3
      //   //region: qiniu.region.z2
      // };
      // var putExtra = {
      //   fname: "",
      //   params: {},
      //   mimeType: ["image/jpg"]
      // };
      var observer = {
        next(res) {
          console.log("next: ", res);
        },
        error(err) {
          console.log("cst_error: ", err);
        },
        complete(res) {
          console.log("complete: ", res);
        }
      };
      var observable = qiniu.upload(file, null, token, null, null);
      var subscription = observable.subscribe(observer); // 上传开始
    }
  }
};
</script>

<style scoped>
</style>
