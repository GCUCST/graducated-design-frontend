<template>


   <div class="system">

<!-- 侧边栏 -->
    <div class="sidebar">
      <v-SideBar></v-SideBar>
   </div>

   <!-- 顶栏 -->
  <div class="header">
      顶栏
   </div>


<el-row :gutter="0">
  <el-col :offset="2" :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="5"><div class="grid-content bg-purple"></div></el-col>
</el-row>




  


   </div>
      
</template>

<script>
import SideBar from "@/components/common/SideBar.vue"

export default {
  name: "System",
  data() {
    return {
      msg: "System"
    };
  },
  components:{
    "v-SideBar":SideBar
  }
};
</script>
<style scoped>
.header{
  width: 100%;
  border: 1px solid;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.sidebar{
   width: 64px;
   position: absolute;
   top: 0;
   left: 0;
  border: 1px solid;
  height: 100%;
  z-index: 9999;
  /* text-align: center; */
}

.system{
  min-width: 950px;
}



  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
