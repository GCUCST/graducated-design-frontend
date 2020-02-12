<template>
  <div class="personal-center">
       <el-tabs tab-position="up">
    <el-tab-pane label="我的信息">
      <v-MyInfo></v-MyInfo>
    </el-tab-pane>
    <el-tab-pane label="我的头像">我的头像 </el-tab-pane>
    <el-tab-pane label="账户安全">账户安全</el-tab-pane>
  </el-tabs>
  </div>
</template>


<script>
import MyInfo from "@/components/public/personal_center/MyInfo.vue"
export default {
  name: "PersonalCenter",
  data() {
    return {
      msg: "个人中心"
   
    };
  },
  components:{
    "v-MyInfo":MyInfo
  }
};
</script>

<style scoped>
.personal-center{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
</style>
