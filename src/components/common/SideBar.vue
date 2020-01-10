<template>
  <div>
    <!-- 显隐侧边栏按钮 -->
    <div  :class=" ifShowSideBar?'btn-isNotShow':'btn-isShow'" @click="ifShowSideBar=!ifShowSideBar">
        <i v-if="ifShowSideBar" class="el-icon-menu"></i>
        <i  v-if="!ifShowSideBar" class="el-icon-s-grid"></i>
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

        <!-- 个人中心 -->
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">个人中心（所有）</span>
        </el-menu-item>

        <!-- 视频学习 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">视频系统（教师和学生）</span>
          </template>
          <el-menu-item-group>
            <span slot="title"></span>
            <el-menu-item index="1-1">视频主页（学生和教师）</el-menu-item>
            <el-menu-item index="1-1">我的课程（学生）</el-menu-item>
            <el-menu-item index="1-1">视频上传（教师）</el-menu-item>
            <el-menu-item index="1-2">我的视频库（教师）</el-menu-item>
            <el-menu-item index="1-2">我教的课程（教师）</el-menu-item>
            <el-menu-item index="1-2">笔记本（学生，保留）</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 信息管理 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">成员管理（教务员）</span>
          </template>
          <el-menu-item-group>
            <!-- <span slot="title"></span> -->
            <el-menu-item index="1-1">学生管理（教务员）</el-menu-item>
            <el-menu-item index="1-2">教师管理（教务员）</el-menu-item>
            <el-menu-item index="1-3">班级管理（教务员）</el-menu-item>
            <el-menu-item index="1-4">专业管理（教务员）</el-menu-item>
            <el-menu-item index="1-5">年级管理（教务员）</el-menu-item>
            <el-menu-item index="1-6">课程管理（教务员）</el-menu-item>
            <el-menu-item index="1-7">授课任务管理（教务员）</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 管理 -->
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">考试系统（学生和教师）</span>
          </template>
          <el-menu-item-group>
            <!-- <span slot="title"></span> -->
            <el-menu-item index="1-1">章节自由练习（学生）</el-menu-item>
            <el-menu-item index="1-2">章节测试（学生）</el-menu-item>
            <el-menu-item index="1-3">考试（学生）</el-menu-item>
            <el-menu-item index="1-4">错题集（学生）</el-menu-item>
            <el-menu-item index="1-5">我的课程（教师）</el-menu-item>
            <el-menu-item index="1-6">我的试题库（教师，添加试题）</el-menu-item>
            <el-menu-item index="1-7">改卷（教师）</el-menu-item>
            <el-menu-item index="1-8">学生章节练习进度（教师，查看进度情况）</el-menu-item>
            <el-menu-item index="1-9">导出学生考试卷（教师）</el-menu-item>
            <el-menu-item index="1-10">设置试卷（教师，设置考试时间、开放时间等）</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">消息系统（所有）</span>
        </el-menu-item>

        <!-- 反馈 -->
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">投诉反馈（所有）</span>
        </el-menu-item>

        <!-- 反馈 -->
        <el-menu-item index="55">
          <i class="el-icon-setting"></i>
          <span slot="title">帮助关于（所有）</span>
        </el-menu-item>

        <el-menu-item index="11">
          <i class="el-icon-setting"></i>
          <span slot="title">退出登录（所有）</span>
        </el-menu-item>

        <el-menu-item index="199">
          <i class="el-icon-setting"></i>
          <span slot="title">管理教务员（超级管理员）</span>
        </el-menu-item>
      </el-menu>
    </div>
  </transition>





  </div>
</template>

<script>
import VueBus from  "@/utils/VueBus.js"

export default {
  name: "Sidebar",
  data() {
    return {
      msg: "Sidebar", //没用
      isCollapse: true, //用于最大化侧边栏
      ifShowSideBar: true   //显示侧边栏
    };
  },
  methods: {
    //传值侧边栏状态
    SideBarStatusChange(){
        this.isCollapse=!this.isCollapse
        VueBus.$emit('isCollapse',this.isCollapse)  
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.btn-isShow {
  text-align: center;
  height: 50px;
  color: white;
  line-height: 50px;
  width:64px;
  cursor: pointer;
  /* background-color: #2A333C */
}
.btn-isNotShow {
  text-align: center;
  height: 50px;
  color: white;
  line-height: 50px;
  width:64px;
  cursor: pointer;
  background-color: #2A333C
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
