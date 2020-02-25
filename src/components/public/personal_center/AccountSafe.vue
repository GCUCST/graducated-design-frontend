<template>
  <div style="margin-bottom:200px;margin-top:50px">
    <div>
      <br />
      <div style="width:400px;margin:0 auto;display:flex">
        <br />
        <br />
        <div style="width:200px;" >原始密码：</div>
        <el-input  placeholder="请输入原密码"  show-password v-model="originalPassword"></el-input>
      </div>
      <br />
      <div style="width:400px;margin:0 auto;display:flex">
        <br />
        <br />
        <div style="width:200px;">修改密码：</div>
        <el-input v-model="newPassword" placeholder="请输入新密码"  show-password></el-input>
      </div>
      <br />
      <div style="width:400px;margin:0 auto;display:flex">
        <br />
        <br />
        <div style="width:200px;">确认密码：</div>
        <el-input v-model="comfirmPassword"  placeholder="请重复输入新密码"  show-password ></el-input>
      </div>
      <br />
      <br />
    </div>
    <div style="text-align:center">
      <el-button @click="submit" style="width:100px;">提交</el-button>
    </div>
  </div>
</template>


<script>
import UrlConfig from "../../../config/UrlConfig.js";
import * as qiniu from "qiniu-js";
import axios from "axios";
import LoginStatus from "../../../utils/LoginStatus.js";
import UploadUtil from "../../../utils/UploadUtil.js";

export default {
  name: "accountsafe",
  data() {
    return {
      originalPassword: null,
      newPassword: null,
      comfirmPassword: null
    };
  },
  mounted() {},
  methods: {
    checkInput(){
        if(this.originalPassword==''||this.newPassword==''||this.comfirmPassword=='')
        {
          alert("请补全数据。")
          return -1;
          }
        if(this.comfirmPassword!=this.newPassword)
        {
          alert("新密码和确认密码不一致。")
          return 0;
        }
        return 1;

    },
    submit() {
      if(this.checkInput()!=1){
        return ;
      }

      var params = new URLSearchParams();
      params.append("originalPassword", this.originalPassword);
      params.append("newPassword", this.newPassword);
      params.append("comfirmPassword", this.comfirmPassword);
      var that = this;
      axios
        .post("/comm/changePassword", params)
        .then(function(response) {
          console.log(response);
         alert(response.data.message)

        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>
