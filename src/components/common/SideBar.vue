<template>
  <div style="height:100%">
    <!-- 显隐侧边栏按钮 -->
    <div :class="ifShowSideBar?'btn-isNotShow':'btn-isShow'" @click="ifShowSideBar=!ifShowSideBar">
      <i v-if="ifShowSideBar" class="el-icon-menu"></i>
      <i v-if="!ifShowSideBar" class="el-icon-s-grid"></i>
    </div>

    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <!-- 这个是侧边栏 -->
      <div v-if="ifShowSideBar" style="height:100%;min-width:64px">
        <el-menu
          style="height:100%;"
          unique-opened
          text-color="white"
          background-color="#2A333C"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <!-- 展开/收缩按钮 -->
          <el-menu-item class="extend">
            <i v-show="isCollapse" class="el-icon-d-arrow-right" @click="SideBarStatusChange"></i>
            <i v-show="!isCollapse" class="el-icon-d-arrow-left" @click="SideBarStatusChange"></i>
            <!-- <span slot="title"></span> -->
          </el-menu-item>

          <!-- 用户登录 -->
          <el-menu-item v-if="role==null" index="1" @click="routeJump('Login')">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户登录</span>
          </el-menu-item>

          <!-- 个人中心,登录后就显示这个，表现为头像 -->
          <el-menu-item
            @click="routeJump('PersonalCenter')"
            style="text-align:center;"
            :style="{'height':isCollapse ? '':'100px'}"
            v-if="role!=null"
            index="1.1"
          >
            <img v-show="isCollapse" :src="src" style="height:25px;width:25px;" />
            <span slot="title">
              <img :src="src" style="height:100px;width:100px;" />
            </span>
          </el-menu-item>

          <el-menu-item index="2-1" @click="routeJump('Homebody')">
            <i class="el-icon-s-home"></i>
            <span slot="title">学习主页</span>
          </el-menu-item>

          <!-- 视频学习 -->
          <el-submenu index="2" v-if="role=='student'||role=='teacher'">
            <template slot="title">
              <i class="el-icon-film"></i>
              <span slot="title">视频系统</span>
            </template>
            <el-menu-item-group>
              <!-- <span slot="title">视频系统</span> -->
              <!-- <el-menu-item index="2-1" @click="routeJump('Homebody')">视频主页(所有，无需登录)</el-menu-item> -->
              <el-menu-item index="2-2" v-if="role=='student'" @click="routeJump('MyCourse')">
                <i class="el-icon-reading" />我的课程
              </el-menu-item>
              <el-menu-item index="2-6" v-if="role=='student'">
                <i class="el-icon-notebook-2"></i>我的笔记
              </el-menu-item>
              <el-menu-item index="2-4" v-if="role=='teacher'" @click="routeJump('VideoLibrary')">
                <i class="el-icon-folder"></i>
                我的视频库
              </el-menu-item>
              <el-menu-item index="2-5" v-if="role=='teacher'" @click="routeJump('MyTeach')">
                <i class="el-icon-reading"></i> 我教的课程
              </el-menu-item>
              <el-menu-item index="2-6" v-if="role=='teacher'" @click="routeJump('MyTask')">
                <i class="el-icon-reading"></i> 我的任务
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 信息管理 -->
          <el-submenu index="3" v-if="role=='dean'">
            <template slot="title">
              <i class="el-icon-thumb"></i>
              <span slot="title">成员管理</span>
            </template>
            <el-menu-item-group>
              <!-- <span slot="title">管理系统</span> -->
              <el-menu-item index="3-1" @click="routeJump('ManageStudent')">
                <i class="el-icon-user-solid" />学生管理
              </el-menu-item>
              <el-menu-item index="3-2" @click="routeJump('ManageTeacher')">
                <i class="el-icon-s-custom" />教师管理
              </el-menu-item>
               <el-menu-item index="3-9" @click="routeJump('ManagePassword')">
                <i class="el-icon-s-custom" />密码重置
              </el-menu-item>
              <el-menu-item index="3-4" @click="routeJump('ManageAdminClass')">
                <i class="el-icon-coin" />班级管理
              </el-menu-item>
              <el-menu-item index="3-5" @click="routeJump('ManageMajor')">
                <i class="el-icon-position" />专业管理
              </el-menu-item>
              <el-menu-item index="3-6" @click="routeJump('ManageGrade')">
                <i class="el-icon-user" />年级管理
              </el-menu-item>
              <!-- <el-menu-item index="3-7"   >课程管理（教务员）</el-menu-item> -->
              <el-menu-item index="3-8" @click="routeJump('ManageTeachTask')">
                <i class="el-icon-paperclip" />授课任务管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 考试系统 -->
          <el-submenu index="4" v-if="role=='student'||role=='teacher'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">考试系统（学生和教师，需登录）</span>
            </template>
            <el-menu-item-group>
              <span slot="title">考试系统</span>
              <el-menu-item
                index="4-1"
                v-if="role=='student'"
                @click="routeJump('ChapterPractice')"
              >章节自由练习</el-menu-item>
              <el-menu-item
                index="4-2"
                v-if="role=='student'"
                @click="routeJump('ChapterTest')"
              >章节测试</el-menu-item>
              <el-menu-item index="4-3" v-if="role=='student'" @click="routeJump('Exam')">我的考试</el-menu-item>
              <el-menu-item
                index="4-4"
                v-if="role=='student'"
                @click="routeJump('ErrorSet')"
              >历史考试</el-menu-item>
              <el-menu-item
                index="4-5"
                v-if="role=='teacher'"
                @click="routeJump('Courses')"
              >我的课程（教师）</el-menu-item>
              <el-menu-item
                index="4-6"
                v-if="role=='teacher'"
                @click="routeJump('QuestionBank')"
              >我的试题库</el-menu-item>
              <el-menu-item
                index="4-7"
                v-if="role=='teacher'"
                @click="routeJump('LearnProgress')"
              >学生章节练习进度（教师，查看进度情况）</el-menu-item>
              <el-menu-item
                index="4-8"
                v-if="role=='teacher'"
                @click="routeJump('TestSetting')"
              >考试设置</el-menu-item>
              <el-menu-item index="4-9" v-if="role=='teacher'" @click="routeJump('Marking')">我的试卷库</el-menu-item>
              <el-menu-item
                index="4-10"
                v-if="role=='teacher'"
                @click="routeJump('ExportPaper')"
              >导出学生考试卷（教师）</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="8" v-if="role=='admin'" @click="routeJump('ManageDean')">
            <i class="el-icon-setting"></i>
            <span slot="title">管理教务员（超级管理员）</span>
          </el-menu-item>

          <el-menu-item index="5" v-if="role!=null" @click="routeJump('Message')">
            <!-- 小红点提示消息未读 -->
            <el-badge :value="unReadMsgNum" v-show="unReadMsgNum!=0"  >
              <i class="el-icon-message"></i>
            </el-badge>
              <i class="el-icon-message" v-show="unReadMsgNum==0"></i>
            <span slot="title">消息系统</span>
          </el-menu-item>

          <!-- 帮助反馈 -->
          <el-menu-item index="6" @click="routeJump('HelpFreeback')">
            <i class="el-icon-s-help"></i>
            <span slot="title">帮助反馈</span>
          </el-menu-item>

          <el-menu-item index="9" v-if="role" @click="logout">
            <i class="el-icon-close"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
      </div>
    </transition>
  </div>
</template>

<script>
import VueBus from "@/utils/VueBus.js";
import axios from "axios";
import LoginStatus from "@/utils/LoginStatus.js";
import UrlConfig from "../../config/UrlConfig.js";
export default {
  name: "Sidebar",
  data() {
    return {
      unReadMsgNum:0,
      msg: "Sidebar", //没用
      isCollapse: true, //用于最大化侧边栏
      ifShowSideBar: true, //显示侧边栏
      // 1教务员 2教师 3学生 4管理员
      role: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).role
        : null,
      src: localStorage.getItem("userInfo")
        ? UrlConfig.getQiniuyunUrl() +
          JSON.parse(localStorage.getItem("userInfo")).info.avatar
        : null //图片地址
    };
  },
  methods: {
    //退出登录
    logout() {
      this.$confirm("确定退出？", "消息提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          //主要退出函数
          LoginStatus.logout();
          this.role = null;
          this.$router.push("/");
          this.$message({
            type: "info",
            message: "已退出"
          });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "已取消" : "已取消"
          });
        });
    },
    //路由跳转
    routeJump(e) {
      // console.log(e);
      if (e == "Login") this.$router.push({ name: "Login" });
      if (e == "ManageStudent") this.$router.push({ name: "ManageStudent" });
      if (e == "Homebody") this.$router.push({ name: "Homebody" });
      if (e == "MyCourse") this.$router.push({ name: "MyCourse" });
      if (e == "PersonalCenter") this.$router.push({ name: "PersonalCenter" });
      if (e == "HelpFreeback") this.$router.push({ name: "HelpFreeback" });
      if (e == "Message") this.$router.push({ name: "Message" });
      if (e == "ManageDean") this.$router.push({ name: "ManageDean" });
      if (e == "VideoLibrary") this.$router.push({ name: "VideoLibrary" });
      if (e == "MyTeach") this.$router.push({ name: "MyTeach" });
      if (e == "Courses") this.$router.push({ name: "Courses" });
      if (e == "QuestionBank") this.$router.push({ name: "QuestionBank" });
      if (e == "LearnProgress") this.$router.push({ name: "LearnProgress" });
      if (e == "TestSetting") this.$router.push({ name: "TestSetting" });
      if (e == "Marking") this.$router.push({ name: "Marking" });
      if (e == "ExportPaper") this.$router.push({ name: "ExportPaper" });
      if (e == "ChapterPractice")
        this.$router.push({ name: "ChapterPractice" });
      if (e == "ChapterTest") this.$router.push({ name: "ChapterTest" });
      if (e == "Exam") this.$router.push({ name: "Exam" });
      if (e == "ErrorSet") this.$router.push({ name: "ErrorSet" });
      if (e == "ManageGrade") this.$router.push({ name: "ManageGrade" });
      if (e == "ManageMajor") this.$router.push({ name: "ManageMajor" });
      if (e == "ManageAdminClass")
        this.$router.push({ name: "ManageAdminClass" });
      if (e == "ManageTeacher") this.$router.push({ name: "ManageTeacher" });
      if (e == "ManageTeachTask")
        this.$router.push({ name: "ManageTeachTask" });
         if (e == "MyTask")
        this.$router.push({ name: "MyTask" });
             if (e == "ManagePassword")
        this.$router.push({ name: "ManagePassword" });



    },
    //传值侧边栏状态
    SideBarStatusChange() {
      this.isCollapse = !this.isCollapse;
      VueBus.$emit("isCollapse", this.isCollapse);
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getAllMyUnReadMsgNum(){
     var that = this;
      axios
        .post("/comm/getMyUnReadMsgNum")
        .then(function(response) {
            console.log(response)
            that.unReadMsgNum = response.data.object
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
     if(localStorage.getItem("userInfo"))
      this.getAllMyUnReadMsgNum()
     
    //收到更新侧边栏功能的指令
    var that = this;
    VueBus.$on("role", function(data) {
      console.log("侧边栏收到：" + data);
      that.role = data;
      that.src = localStorage.getItem("userInfo")
        ? UrlConfig.getQiniuyunUrl() +
          JSON.parse(localStorage.getItem("userInfo")).info.avatar
        : null;
         if(localStorage.getItem("userInfo"))
         that.getAllMyUnReadMsgNum()
    });


  }
};
</script>
<style scoped>
.btn-isShow {
  text-align: center;
  height: 50px;
  color: white;
  width: 64px;
  line-height: 50px;
  cursor: pointer;
}
.btn-isNotShow {
  text-align: center;
  height: 50px;
  width: 64px;
  color: white;
  line-height: 50px;
  cursor: pointer;
  background-color: #2a333c;
}

.extend {
  text-align: right;
  height: 25px;
  line-height: 25px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}
.item{
  margin-top: 10px;
  margin-right: 40px;
}
.item2{
  display: none;
}
</style>
