<template>
  <div class="header">
    <!-- 占位置的 -->
    <div class="header-logo"></div>

    <div class="header-name" @click="toAdminLogin">{{msg}}</div>

    <div class="header-search">
        <div class="search">
            <el-input style="width:60%;"  placeholder="请输入内容" v-model="search"></el-input>
            <i @click="filter()" style="cursor:pointer;color:white" class="el-icon-search"></i>
        </div>
    </div>
  </div>
</template>

<script>
import VueBus from "@/utils/VueBus.js";

export default {
  name: "Header",
  data() {
    return {
      msg: "华广学习系统",
      times:0,  //次数超过10就进入管理员登录页面
      search:""
    };
  },
  methods: {
      toAdminLogin()
      {
          this.times = this.times+1;
          console.log("第"+this.times+"次")
          if(this.times>=10)
          {
              this.times = 0;
              this.$router.push({name:"AdminLogin"})
          }
      },
      filter(){
        var that = this
         VueBus.$emit("filterVideo",that.search );
      }
  }
};
</script>
<style scoped>
.header {
  height: 50px;
  width: 100%;
  background: #2a333c;
  display: flex;
}
.header-logo {
  width: 34%;
}
.header-name {
  background: #2a333c;
  width: 33%;
  color: white;
  font-size: 25px;
}
.header-search {
  background: #2a333c;
  width: 33%;
  margin: 0 auto;
}
.search{
    text-align: right;
    width: 60%;
    margin: 0 auto;
}
</style>
