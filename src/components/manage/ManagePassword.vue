<template>
  <div class="manage-student" >
    <el-tabs tab-position="up">
      <el-tab-pane :label="msg">
         <br>
         <br>
         
         <div style="width:40%;text-align:left;margin:0 auto">
           请输入用户账号：
         <br>
         <br>
         </div>
        <div style="width:40%;text-align:center;margin:0 auto">
           <el-input v-model="account"></el-input>
         <br>
         <br>
          <el-button @click="resetPassword">确定重置密码</el-button>
        </div>

     
      </el-tab-pane>
    </el-tabs>
  </div>
</template>



<script>
import axios from "axios";

export default {
  name: "ManageStudent",
  data() {
    return {
      msg:"重置用户密码",
      account: null
    };
  },
  mounted() {
  },
  methods: {
   resetPassword()
   {
     if(this.account==""||this.account==null)
     {
       alert("账户不能为空！")
     }
    else{

      var parmas  = new URLSearchParams();
      parmas.append("account",this.account)
        var that = this;

   this.$confirm('确定重置用户?'+this.account, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

      axios
        .post("/comm/resetPassword",parmas)
        .then(function(response) {
          
          if(response.data.object==1){

            that.$message({
              type: 'success',
            message: '重置成功!重置的密码为账号。'
          });
          that.account = null;
          }
          else{
             that.$message({
            type: 'error',
            message: '重置失败。原因：找不到用户'
          }); 
          }

        })
        .catch(function(error) {
          console.log(error);
        });



        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });






    }

   }
  }
};
</script>


<style scoped>
.manage-student {
  margin: 20px auto;
  padding: 30px;
  min-height: 600px;
  background: white;
  width: 95%;
box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
border-radius: 5px;
}
</style>
