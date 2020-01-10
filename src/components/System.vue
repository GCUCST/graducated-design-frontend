<template>
  <div class="system">

    <!-- 侧边栏 -->
    <div :class="contentOffset==2?'sidebar':'sidebar-max'">
      <v-SideBar></v-SideBar>
    </div>

    <!-- 顶栏 -->
    <div class="header">顶栏</div>

    <!-- 内容区 -->
    <transition>
      <div class="content">
        <el-row>
          <el-col :offset="contentOffset" :span="23-contentOffset">
            <div class="grid-content bg-purple">
              <!-- <span @click="contentOffset=4">dianji</span> -->
            </div>
          </el-col>
        </el-row>
      </div>
    </transition>


  </div>
</template>

<script>
import SideBar from "@/components/common/SideBar.vue";

import VueBus from "@/utils/VueBus.js";

export default {
  name: "System",
  data() {
    return {
      msg: "System",
      contentOffset: 2
    };
  },
  components: {
    "v-SideBar": SideBar
  },
  mounted() {
    var that = this;
    VueBus.$on("isCollapse", function(data) {
      console.log("System收到..");
      if (data) that.contentOffset = 2;
      else that.contentOffset = 6;
      console.log(that.contentOffset);
    });
  }
};
</script>
<style scoped>
.header {
  width: 99%;
  border: 1px solid;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.sidebar {
  width: 64px;
  position: fixed;
  top: 0;
  left: 0;
  /* background-color: #2A333C; */
  /* border: 1px solid blue; */
  height: 100%;
  z-index: 9999;
  /* text-align: center; */
}
.sidebar-max {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  /* background-color: #2A333C; */
  /* border: 1px solid blue; */
  height: 100%;
  z-index: 9999;
  /* text-align: center; */
}

.system {
  min-width: 900px;
}

.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 800px;
}

/* 滑动动态效果 */
div {
  transition: all 150ms ease-in-out 200ms;
  /* -o-transition: all 10ms ease-out 10ms;兼容parsto内核 */
  /* -moz-transition: all 10ms ease-in-out 10ms;兼容gecko内核 */
  /* -webkit-transition:  all 10ms ease-in-out 10ms;兼容webkit内核 */
}
</style>
