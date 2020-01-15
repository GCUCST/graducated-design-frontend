<template>
  <div>
    <!-- 显隐侧边栏按钮 -->
    <div :class=" ifShowSideBar?'btn-isNotShow':'btn-isShow'" @click="ifShowSideBar=!ifShowSideBar">
      <i v-if="ifShowSideBar" class="el-icon-menu"></i>
      <i v-if="!ifShowSideBar" class="el-icon-s-grid"></i>
    </div>

    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <!-- 这个是侧边栏 -->
      <div v-if="ifShowSideBar">
        <el-menu
          style="height:800px;"
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
            <img
              v-show="isCollapse"
              src="http://47.94.166.187:70/cwh_pics/ad.jpg"
              style="height:25px;width:25px;"
            />
            <span slot="title">
              <img src="http://47.94.166.187:70/cwh_pics/ad.jpg" style="height:100px;width:100px;" />
            </span>
          </el-menu-item>

          <!-- 视频学习 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">视频系统</span>
            </template>
            <el-menu-item-group>
              <span slot="title">视频系统</span>
              <el-menu-item index="2-1" @click="routeJump('Homebody')">视频主页(所有，无需登录)</el-menu-item>
              <el-menu-item index="2-2" v-if="role==3" @click="routeJump('MyCourse')">我的课程（学生）</el-menu-item>
              <el-menu-item index="2-6" v-if="role==3">笔记本（学生）</el-menu-item>
              <el-menu-item index="2-3" v-if="role==2">视频上传（教师）</el-menu-item>
              <el-menu-item index="2-4" v-if="role==2">我的视频库（教师）</el-menu-item>
              <el-menu-item index="2-5" v-if="role==2">我教的课程（教师）</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 信息管理 -->
          <el-submenu index="3" v-if="role==1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">成员管理（教务员）</span>
            </template>
            <el-menu-item-group>
              <span slot="title">管理系统</span>
              <el-menu-item index="3-1" @click="routeJump('ManageStudent')">学生管理（教务员）</el-menu-item>
              <el-menu-item index="3-2">教师管理（教务员）</el-menu-item>
              <el-menu-item index="3-4">班级管理（教务员）</el-menu-item>
              <el-menu-item index="3-5">专业管理（教务员）</el-menu-item>
              <el-menu-item index="3-6">年级管理（教务员）</el-menu-item>
              <el-menu-item index="3-7">课程管理（教务员）</el-menu-item>
              <el-menu-item index="3-8">授课任务管理（教务员）</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 管理 -->
          <el-submenu index="4" v-if="role==2||role==3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">考试系统（学生和教师，需登录）</span>
            </template>
            <el-menu-item-group>
              <span slot="title">考试系统</span>
              <el-menu-item index="4-1" v-if="role==3">章节自由练习（学生）</el-menu-item>
              <el-menu-item index="4-2" v-if="role==3">章节测试（学生）</el-menu-item>
              <el-menu-item index="4-3" v-if="role==3">考试（学生）</el-menu-item>
              <el-menu-item index="4-4" v-if="role==3">错题集（学生）</el-menu-item>
              <el-menu-item index="4-5" v-if="role==2">我的课程（教师）</el-menu-item>
              <el-menu-item index="4-6" v-if="role==2">我的试题库（教师，添加试题）</el-menu-item>
              <el-menu-item index="4-7" v-if="role==2">改卷（教师）</el-menu-item>
              <el-menu-item index="4-8" v-if="role==2">学生章节练习进度（教师，查看进度情况）</el-menu-item>
              <el-menu-item index="4-9" v-if="role==2">导出学生考试卷（教师）</el-menu-item>
              <el-menu-item index="4-10" v-if="role==2">设置试卷（教师，设置考试时间、开放时间等）</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="8"  v-if="role==4" @click="routeJump('ManageDean')">
            <i class="el-icon-setting"></i>
            <span slot="title">管理教务员（超级管理员）</span>
          </el-menu-item>


          <el-menu-item index="5" v-if="role!=null"  @click="routeJump('Message')">
            <!-- 小红点提示消息未读 -->
            <el-badge :value="3" class="item">
              <i class="el-icon-setting"></i>
            </el-badge>
            <span slot="title">消息系统（所有，需登录）</span>
          </el-menu-item>

          <!-- 帮助反馈 -->
          <el-menu-item index="6" @click="routeJump('HelpFreeback')">
            <i class="el-icon-setting"></i>
            <span slot="title">帮助反馈</span>
          </el-menu-item>


          <el-menu-item index="9" v-if="role" @click="logout">
            <i class="el-icon-setting"></i>
            <span slot="title">退出登录（所有，需登录）</span>
          </el-menu-item>

        </el-menu>
      </div>
    </transition>
  </div>
</template>

<script>
import VueBus from "@/utils/VueBus.js";

export default {
  name: "Sidebar",
  data() {
    return {
      msg: "Sidebar", //没用
      isCollapse: true, //用于最大化侧边栏
      ifShowSideBar: true, //显示侧边栏
      // 1教务员 2教师 3学生 4管理员
      role: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).role
        : null
    };
  },
  methods: {
    //退出登录
    logout() {
      console.log(JSON.parse(localStorage.getItem("user")).role);
      this.$confirm("确定退出？", "消息提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          //主要退出函数
          localStorage.removeItem("user");
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
      console.log(e);

      if (e == "Login") this.$router.push({ name: "Login" });
      if (e == "ManageStudent") this.$router.push({ name: "ManageStudent" });
      if (e == "Homebody") this.$router.push({ name: "Homebody" });
      if (e == "MyCourse") this.$router.push({ name: "MyCourse" });
      if (e == "PersonalCenter") this.$router.push({ name: "PersonalCenter" });
      if (e == "HelpFreeback") this.$router.push({ name: "HelpFreeback" });
      if (e == "Message") this.$router.push({ name: "Message" });
      if (e == "ManageDean") this.$router.push({ name: "ManageDean" });

      


      

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
    }
  },
  mounted() {
    //收到更新侧边栏功能的指令
    var that = this;
    VueBus.$on("role", function(data) {
      console.log("SideBar收到role：" + data);
      that.role = data;
    });
  }
};
</script>
<style scoped>
.btn-isShow {
  text-align: center;
  height: 50px;
  color: white;
  line-height: 50px;
  width: 64px;
  cursor: pointer;
  /* background-color: #2A333C */
}
.btn-isNotShow {
  text-align: center;
  height: 50px;
  color: white;
  line-height: 50px;
  width: 64px;
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
</style>
