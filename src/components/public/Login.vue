<template>
  <el-row style="background:white"  type="flex" justify="center">
    <el-col :span="24">
    

      <el-divider>
        <div class="title">登录</div>
      </el-divider>


      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号">
          <el-input type="text" v-model="account" ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="password"></el-input>
            
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="code" suffix-icon="el-icon-warning-outline"></el-input>
        </el-form-item>
        
<el-form-item >
<template>
   <el-radio v-model="role" label="1">教务员</el-radio>
  <el-radio v-model="role" label="2">教师</el-radio>
  <el-radio v-model="role" label="3">学生</el-radio>
</template>
 </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="login">
            <span v-show="!commit">登录</span>
            <i style="width:28px" v-show="commit" class="el-icon-loading"/>
          </el-button>
          <el-button @click="reset">清空</el-button>
            <span style="color:grey;font-size:13px;text-decoration:underline;">忘记密码</span>
        </el-form-item>
       
      </el-form>
    </el-col>
  </el-row>
</template>


<script>
// import VueBus from  "@/utils/VueBus.js"
export default {
  data() {
    return {
      account: "cst",
      password: "12345",
      code: "as54",
      role:"3",
      commit:false
    };
  },
  methods: {
    login() {
        // if(this.role==1){
        // }
        // else if(this.role==2)
        // {
        //     console.log("教师");
        // }
        // else{
        //     console.log("学生")
        // }
        // alert("登录成功，"+this.role)
        var obj = {"account":this.account,"role":this.role}
            var str = JSON.stringify(obj)
            localStorage.setItem("user",str)
        console.log("登录账号："+ localStorage.getItem("user"))
        
        if(this.role!=1)
        this.$router.push({ name: "Homebody" });
        else
        this.$router.push({ name: "ManageStudent" });




    },


    submit() {
      //alert("登录:" + this.account + this.password + this.code);
    //   this.commit= true
    //   if(this.account=='cst'&&this.password=='12345')
    //   {
        // setTimeout(() => {
        //    this.$notify({
        //   title: '登录成功',
        //   message: '',
        //   type: 'success'
        // });
        // }, 1000);

        //   setTimeout(() => {
        //   this.commit = false; 
        //   VueBus.$emit('login_status','ok')        
        //   this.$router.push("/" );
        //   // this.$router.go(0);
        // }, 2000);
        
    //   }
    //   else{
    //      this.$notify.error({
    //       title: '登录失败',
    //       message: '请输入账号密码'
    //     });
    //     this.commit = false;    
    //   }
     

    },
    reset() {
      this.account = "";
      this.password = "";
      this.code = "";
    }
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
</style>
