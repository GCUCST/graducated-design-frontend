<template>
  <div class="personal-center">
       <el-tabs tab-position="up">
    <el-tab-pane label="我的信息">
       账号：{{user.account}}<br>
       身份：{{user.role=='dean'?'教务员':user.role=='teacher'?'教师':user.role=='student'?'学生':'管理员'}}
    </el-tab-pane>
    <el-tab-pane label="我的头像">我的头像 </el-tab-pane>
    <el-tab-pane label="账户安全">账户安全</el-tab-pane>
  </el-tabs>
  </div>
</template>


<script>
export default {
  name: "PersonalCenter",
  data() {
    return {
      msg: "个人中心",
      user:JSON.parse(localStorage.getItem("userInfo"))
    };
  }
};
</script>

<style scoped>
.personal-center{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  height: 600px;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
</style>
