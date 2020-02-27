<template>
  <div class="preview">
  <el-divider content-position="center">预览</el-divider>

    <el-tab-pane style="line-height:26px;display:flex;width:100%;padding:20px;">
      <!-- 封面: {{cover}} -->
      
      <div style="width:70%">
        <div style="font-size:16px;text-align:left;font-weight:700">标题：{{title}}</div>
        <div style="text-align:left;font-size:16px;font-weight:bold">学时：{{courseHour}}</div>
        <div style="text-align:left;font-size:16px;font-weight:bold">学分：{{credit?credit.toFixed(2):null}}</div>
        <div
          style="text-align:left;font-size:16px;font-weight:bold"
        >时间：{{ !date?null:new Date(date[0]).toLocaleDateString()+" - "+new Date(date[1]).toLocaleDateString()}}</div>
        <div style="text-align:left;font-size:16px;font-weight:bold">标签：{{tags}}</div>
        <div style="text-align:left;font-size:16px;font-weight:bold">
          类型：{{courseType=="public"?"公开课":courseType=="required"?"必修课":
          courseType=="electives"?"选修课":courseType=="generalElective"?"通选课":
          courseType=="other"?"其他":null
          }}
        </div>
        <div style="text-align:left;font-size:16px;font-weight:bold">介绍：{{introduce}}</div>
      </div>
      <div style="width:30%">
        <img width="150" height="150" :src="QiniuyunUrl+cover" />
      </div>
    </el-tab-pane>


  <el-divider content-position="center">目录</el-divider>
  <br>
    <div style="border:1px ;width:50%;margin:0 auto;">
      <el-tree :data="catalogData" :props="defaultProps" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-tree>
    </div>

    <br />

    <div style="text-align:center;font-size:16px;font-weight:700">该课程可以是一个模板？
   
    <el-switch
      v-model="switchValue"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-value="1"
      inactive-value="0"
    ></el-switch>
    </div>
    <!-- <br />生成考试系统目录： 是？ 否？ -->

    <br />
    <br />
    <div style="display:flex;justify-content:space-between">
      <el-button type="primary" @click="lastStep" plain>上一步</el-button>
      <el-button type="primary" @click="create" plain>确定创建</el-button>
    </div>
    <!-- </el-tabs> -->
  </div>
</template>



<script>
import UrlConfig from "../../../../config/UrlConfig";
import VueBus from "@/utils/VueBus.js";
import axios from "axios";
export default {
  name: "PreviewAndRelease",
  data() {
    return {
      QiniuyunUrl: UrlConfig.getQiniuyunUrl(),
      msg: "预览",
      switchValue: false,
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
  methods: {
    create() {
      console.log("创建成功。");
      // 一堂普通课程
      var courseObject = {
        courseShare: this.switchValue == "1" ? true : false, //共享
        cover: this.cover, //封面
        title: this.title, //标题
        introduce: this.introduce, //介绍
        courseHour: this.courseHour, //学时
        credit: this.credit, //学分
        courseDate: this.date, //学习时间
        tags: this.tags, //标签
        courseType: this.courseType, //课程类型
        catalogData: JSON.parse(localStorage.getItem("catalog")), //目录json
        createTime: new Date(), //创建时间
        author: JSON.parse(localStorage.getItem("userInfo")).info.name, //作者
        username: JSON.parse(localStorage.getItem("userInfo")).info.staId, //作者账号
        courseStatus: "待发布", //课程状态
        likeNum: 0, //点赞数
        replyNum: 0, //回复数
        examTime: null, //考试时间
        className: null, //班级名称
        students: [], //学生
        tips: null, //提示
        refCourse: this.switchValue == "1" ? -1 : 0 //共享
      };

      var that = this;
      var params = new URLSearchParams();
      params.append("courseShare", courseObject.courseShare);
      params.append("cover", courseObject.cover);
      params.append("refCourse", courseObject.refCourse);

      params.append("title", courseObject.title);
      params.append("introduce", courseObject.introduce);
      params.append("courseHour", courseObject.courseHour);
      params.append("credit", courseObject.credit);
      params.append("courseDate", courseObject.courseDate);
      params.append("tags", JSON.stringify(courseObject.tags));
      params.append("courseType", courseObject.courseType);
      params.append("catalogData", JSON.stringify(courseObject.catalogData));
      params.append("createTime", courseObject.createTime);
      params.append("author", courseObject.author);
      params.append("username", courseObject.username);
      params.append("courseStatus", courseObject.courseStatus);
      params.append("likeNum", courseObject.likeNum);
      params.append("replyNum", courseObject.replyNum);
      params.append("examTime", courseObject.examTime);
      params.append("className", courseObject.className);
      params.append("students", JSON.stringify(courseObject.students));
      params.append("tips", courseObject.tips);

      axios
        .post("/comm/addCourse", params)
        .then(function(response) {
          console.log(response);
          if (that.switchValue == "1") {
            alert("成功！请去共享课程添加学生吧！");
          } else {
            alert("成功！请去我的课程添加学生！");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    lastStep() {
      VueBus.$emit("jump", 1);
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
.preview {
  margin: 20px auto;
  padding: 20px;
  background: white;
  width: 95%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
