<template>
  <div class="system">
    <!-- 侧边栏 -->
    <div :class="contentOffset==2?'sidebar':'sidebar-max'">
      <v-SideBar></v-SideBar>
    </div>

    <!-- 顶栏 -->
    <div class="header">
      <v-Header></v-Header>
    </div>

    <!-- 内容区和页脚区 -->
    <div>
      <!-- 内容区 -->
      <transition>
        <div>
          <el-row justify="center">
            <el-col :offset="contentOffset" :span="22-contentOffset">
              <div class="content">
                  <router-view name="Homebody"></router-view>
                  <router-view name="MyCourse"></router-view>
                  <router-view name="Login"></router-view>
                  <router-view name="ManageStudent"></router-view>
                  <router-view name="PersonalCenter"></router-view>
                  <router-view name="HelpFreeback"></router-view>
                  <router-view name="Message"></router-view>
                   <router-view  name="AdminLogin"></router-view>
                   <router-view  name="ManageDean"></router-view>
                   <router-view  name="VideoLibrary"></router-view>
                   <router-view  name="VideoCourse"></router-view>
                   <router-view  name="MyTeach"></router-view>
                  <router-view  name="Courses"></router-view>
                  <router-view  name="QuestionBank"></router-view>
                  <router-view  name="LearnProgress"></router-view>
                  <router-view  name="TestSetting"></router-view>
                  <router-view  name="AddExam"></router-view>
                  <router-view  name="Marking"></router-view>
                  <router-view  name="ExportPaper"></router-view>
                  <router-view  name="ChapterPractice"></router-view>
                  <router-view  name="ChapterTest"></router-view>
                  <router-view  name="Exam"></router-view>
                  <router-view  name="ErrorSet"></router-view>
                  <router-view  name="ManageGrade"></router-view>
                  <router-view  name="ManageMajor"></router-view>
                  <router-view  name="ManageAdminClass"></router-view>
                  <router-view  name="ManageTeacher"></router-view>
                  <router-view  name="ManageTeachTask"></router-view>
                  <router-view  name="MyTask"></router-view>
                  <router-view  name="ManagePassword"></router-view>
                  <router-view  name="PublicCourse"></router-view>

                  <router-view  name="StartExam"></router-view>

                  

                  

                  

                  


                  

                  

                  





              </div>
            </el-col>
          </el-row>
        </div>
      </transition>

      <!-- 页脚区 -->
      <transition>
        <div >
          <el-row>
            <el-col :offset="contentOffset" :span="22-contentOffset">
        <v-Footer></v-Footer>
            </el-col>
          </el-row>
        </div>
      </transition>

    </div>

  </div>
</template>

<script>
import VueBus from "@/utils/VueBus.js";

import SideBar from "@/components/common/SideBar.vue";
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";

import Login from "@/components/public/Login.vue";



export default {
  name: "System",
  data() {
    return {
      msg: "System",
      contentOffset: 2
    };
  },
  components: {
    "v-SideBar": SideBar,
    "v-Header": Header,
    "v-Footer": Footer,

  },
  mounted() {
    var that = this;
    VueBus.$on("isCollapse", function(data) {
      console.log("System收到,offset:"+data);
      if (data) that.contentOffset = 2;
      else that.contentOffset = 6;
      console.log(that.contentOffset);
    });
  }
};
</script>
<style scoped>
.content{
  margin-top:20px;
}
.header {
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
  min-width: 1200px;
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
