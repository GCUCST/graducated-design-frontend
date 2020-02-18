<template>
  <div class="setting-share">
    <el-tabs tab-position="up">
      <el-tab-pane :label="msg">
        封面: {{cover}}
        <br />
        标题: {{title}}
        <br />
        介绍: {{introduce}}
        <br />
        学时 :{{courseHour}}
        <br />
        学分: {{credit}}
        <br />
        时间 :{{date}}
        <br />
        标签: {{tags}}
        <br />
        课程类型：{{courseType}}
        <hr>
        <br />目录：
        <br />
      </el-tab-pane>
      <el-tree :data="catalogData" :props="defaultProps" ></el-tree>
        <hr>
         该课程可以被其他任课老师添加？
        <el-switch
          v-model="switchValue"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value=1
          inactive-value=0
        ></el-switch>
<br>
        生成考试系统目录：   是？    否？<br>
        填写考试时间：   ？       ？     ？<br>
        课程状态：默认未发布<br>
      
<br>
<br>
<br>
 <div style="display:flex;justify-content:space-between">
       <el-button type="primary" @click="lastStep" plain>上一步</el-button>
       <el-button type="primary" @click="create" plain>确定创建</el-button>
  </div>

    </el-tabs>
  </div>
</template>



<script>
import VueBus from "@/utils/VueBus.js";

export default {
  name: "PreviewAndRelease",
  data() {
    return {
      msg: "预览",
      switchValue:false,
      cover: null,
      title: null,
      introduce: null,
      courseHour: null,
      credit: null,
      date: null,
      tags: [],
      courseType: null,
      catalogData: JSON.parse(localStorage.getItem("catalog")),
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods:{
    create(){
      console.log("创建成功。")
      if(this.switchValue=="1"){
        alert("成功！请去共享课程添加学生吧！")
      }
      else{
        alert("成功！请去我的课程添加学生！")
      }
      var courseObjects = [{
      courseId:new Date().getTime(),
      share:this.switchValue,
      cover: this.cover,
      title: this.title,
      introduce: this.introduce,
      courseHour: this.courseHour,
      credit: this.credit,
      date: this.date,
      tags: this.tags,
      courseType: this.courseType,
      catalogData: JSON.parse(localStorage.getItem("catalog")),

      createTime:new Date(),
      author:JSON.parse(localStorage.getItem("userInfo")).info.name,
      status:"待发布",
      like:0,
      reply:0,
      examTime:"null",
      class:"null",
      student:"null",
      tips:"null"
      }]

      localStorage.setItem("courseObjects",JSON.stringify(courseObjects))


    },
    lastStep(){
      console.log("lastStep...")
      VueBus.$emit("jump",1)
    }
  },
  mounted() {
    var intordutcion = localStorage.getItem("intordutcion");
    if (intordutcion) {
      intordutcion = JSON.parse(intordutcion);
      this.cover = intordutcion.cover;
      this.title = intordutcion.title;
      this.introduce = intordutcion.introduce;
      this.courseHour = intordutcion.courseHour;
      this.credit = intordutcion.credit;
      this.date = intordutcion.date;
      this.tags = intordutcion.tags;
      this.courseType = intordutcion.courseType;
    }
  }
};
</script>

<style scoped>
.setting-share {
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
</style>
