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
      // var courseObjects = [{
      // courseId:new Date().getTime(),
      // share:this.switchValue,
      // cover: this.cover,
      // title: this.title,
      // introduce: this.introduce,
      // courseHour: this.courseHour,
      // credit: this.credit,
      // date: this.date,
      // tags: this.tags,
      // courseType: this.courseType,
      // catalogData: JSON.parse(localStorage.getItem("catalog")),

      // createTime:new Date(),
      // author:JSON.parse(localStorage.getItem("userInfo")).info.name,
      // status:"待发布",
      // like:0,
      // reply:0,
      // examTime:"null",
      // class:"null",
      // student:"null",
      // tips:"null"
      // }]

      //判断是否选择贡享
     //否
     if(this.switchValue=="0")
     {  
      // 一堂普通课程
      var courseObject = {
      courseId:new Date().getTime(),  //课程id
      share:false,      //非共享 
      cover: this.cover,  //封面
      title: this.title,  //标题
      introduce: this.introduce, //介绍
      courseHour: this.courseHour, //学时
      credit: this.credit, //学分
      date: this.date,  //学习时间
      tags: this.tags,  //标签
      courseType: this.courseType,  //课程类型
      catalogData: JSON.parse(localStorage.getItem("catalog")),//目录json
      createTime:new Date(),  //创建时间
      author:JSON.parse(localStorage.getItem("userInfo")).info.name, //作者
      username:JSON.parse(localStorage.getItem("userInfo")).info.staId, //作者账号
      status:"待发布",//课程状态
      like:0,  //点赞数
      reply:0, //回复数
      examTime:null, //考试时间
      class:null,  //班级名称
      students:[],  //学生
      tips:null   //提示
      }
      //创建一个新的   更新课程s  
      var courseObjects = localStorage.getItem("courseObjects")
      if(courseObjects==null){
        courseObjects = []
      }else{
       courseObjects =  JSON.parse(courseObjects)
      }
      courseObjects.push(courseObject)
      localStorage.setItem("courseObjects",JSON.stringify(courseObjects))
}
else{

   // 一堂共享课程
      var shareCourseObject = {
      courseId:new Date().getTime(),  //课程id  主键
      share:true,      //共享 
      cover: this.cover,  //封面地址呢
      title: this.title,   //标题
      introduce: this.introduce, //介绍
      courseHour: this.courseHour, //学时
      credit: this.credit,  //学分
      date: this.date,  //学习时间
      tags: this.tags,  //标签
      courseType: this.courseType, //课程类型
      catalogData: JSON.parse(localStorage.getItem("catalog")), //目录json
      createTime:new Date(),  //创建时间
      author:JSON.parse(localStorage.getItem("userInfo")).info.name,  //作者
      username:JSON.parse(localStorage.getItem("userInfo")).info.staId, //账号
      status:"待发布",  //课程状态
      like:0,   //喜欢个数
      reply:0,  //回复数
      examTime:null,  //考试时间
      class:null,   //班级
      students:[],  //学生
      tips:null    //提示
      }
      //创建一个新的   更新课程s  
      var shareCourseObjects = localStorage.getItem("shareCourseObjects")
      if(courseObjects==null){
        shareCourseObjects = []
      }else{
       shareCourseObjects =  JSON.parse(shareCourseObjects)
      }
      shareCourseObjects.push(shareCourseObject)
      localStorage.setItem("shareCourseObjects",JSON.stringify(shareCourseObjects))




}






    },
    lastStep(){
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
