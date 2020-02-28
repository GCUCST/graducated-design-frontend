<template>
  <div>
    <div >
      <div v-for="(item,i) in shareCourseObjects" :key="i">
        <div
           v-loading="loading"
          v-if="item.courseShare==true"
          style="justify-content:space-between ;padding:2%;display:flex"
        >
          <el-card shadow="hover" style="width:24%;height:100%" class="box-card">
            <el-tabs stretch>
              <el-tab-pane label="封面">
                <!-- 一个课程 -->
                <div>
                  <div>
                    <img style="width:100%;height:150px;" :src="QiniuyunUrl+item.cover" />
                  </div>
                  <!-- 标题 -->
                  <div class="title">{{item.title}}</div>
                
                </div>
                <!-- /一个课程 -->
              </el-tab-pane>
              <el-tab-pane label="目录">
                <el-tree :data="JSON.parse(item.catalogData)" :props="defaultProps"></el-tree>
              </el-tab-pane>
            </el-tabs>
          </el-card>

          <div style="width:70%;">
            <el-card class="box-card" shadow="never" style="height:100%;width:100%">
              <div slot="header" style="height:100%;">
                <span>{{item.title}}</span>
                <!--  做一个判断，如果是作者自己就显示这个按钮 -->
                <el-button    @click="delCourse(item.courseId)" style="float: right; padding: 3px 3px" type="text">删除课程</el-button>
                <el-button
                  @click="addCourse(item.courseId)"
                  style="float: right; padding: 3px 3px"
                  type="text"
                >添加课程</el-button>
              </div>
              <div style="font-size:14px;height:100%">
                创建&emsp;者：{{item.author}}
                <br />
                学&emsp;&emsp;时：{{item.courseHour}}
                <br />
                学&emsp;&emsp;分：{{item.credit.toFixed(2)}}
                <br />
                性&emsp;&emsp;质：
                  <span>
                  {{item.courseType=="public"?"公开课":item.courseType=="required"?"必修课":
                  item.courseType=="electives"?"选修课":item.courseType=="generalElective"?"通选课":
                  item.courseType=="other"?"其他":null
                  }}
                </span>
                <br />
                创建时间：  {{new Date(item.createTime).toLocaleString() }}
                <br />
                课程时间：  <span>{{!item.courseDate?null:new Date(JSON.parse(item.courseDate)[0]).toLocaleDateString()+"——"+ new Date(JSON.parse(item.courseDate)[1]).toLocaleDateString()}}</span>
                <br />
                介&emsp;&emsp;绍：{{item.introduce}}
                 <el-divider ></el-divider>

                <div>
                  <span>该课程使用者:</span>
                  <el-button @click="getUserByCourseId(item.courseId)">查看</el-button><br><br>
                    <div  v-if="users.courseId==item.courseId">
                        <el-carousel height="50px" style="text-align:center">
                             <el-carousel-item  v-for="(item,index) in users.staff" :key="index">
                                  {{item.staId+" : "+item.name}}  
                               </el-carousel-item>
                         </el-carousel>
                     </div>
                </div>

                <br />
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <!-- /整个内容区  -->
  </div>
</template>




<script>
import VueBus from "../../../utils/VueBus.js";
import axios from "axios";
import UrlConfig from "../../../config/UrlConfig.js";


export default {
  name: "ShareClass",
  data() {
    return {
      users:{courseId:null,staff:[]},
      loading:true,
      shareCourseObjects: null,
      QiniuyunUrl: UrlConfig.getQiniuyunUrl(),
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    //还需再加一个判断添加班级没有
       this.reflashCourses()
  },
  methods: {

getUserByCourseId(courseId){

if(this.users.courseId==courseId){
  this.users.courseId = false;
  return ;
}
var parmas = new URLSearchParams();
parmas.append("courseId",courseId);
    var that = this;
    axios
      .post("/comm/getUsersByShareCourseId",parmas)
      .then(function(response) {
         console.log(response.data.object[0].name)
         that.users.courseId = courseId;
         that.users.staff  = response.data.object
      })
      .catch(function(error) {
        console.log(error);
      });


},

    reflashCourses(){
         var that = this;
    axios
      .post("/comm/getAllShareCourses")
      .then(function(response) {
        console.log(response);
        that.shareCourseObjects = response.data.object;
        that.loading = false;
      })
      .catch(function(error) {
        console.log(error);
      });
    },

    delCourse(courseId){
       var parmas = new URLSearchParams();
      parmas.append("courseId", courseId);
      var that = this;
      axios
        .post("/comm/delCourse", parmas)
        .then(function(response) {
          console.log(response);
           that.reflashCourses()
      
        })
        .catch(function(error) {
          console.log(error);
        });

    },
    addCourse(courseId) {
      console.log(courseId)
      var that = this;
      var parmas = new URLSearchParams();
      parmas.append("courseId", courseId);
      //获取这门课？
      axios
        .post("/comm/addShareCourseToMyCourses", parmas)
        .then(function(response) {
          console.log(response);
          if(response.data.status){
            alert("添加成功！请去库里查看！")
          }
          else{
            alert("该课程已经存在！请勿重复添加！")
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.detail {
  width: 400px;
  /* height: 220px; */
  z-index: 99999;
  background: white;
  border: 1px solid;
  position: fixed;
}

.title {
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}
.box-card {
  width: 300px;
  font-size: 18px;
  line-height: 26px
}
</style>


              // <div >
              //   <span>该课程使用者</span>
              //   <el-carousel height="120px">
              //     <el-carousel-item style="padding-left:20%;" v-for="item in 3" :key="item">
              //       <br />教师：陈一一
              // <br />课程状态：进行（截至06-05，80%进度考试）
              // <br />考试时间：2020-50-15 15：00
              // <br />教学班级：16软工1，2班
              // <br />
              //     </el-carousel-item>
              //   </el-carousel>
              // </div>

            // <div slot="header">
            //   <el-button style="float: right; padding: 3px 0" type="text">编辑课程</el-button>
            //   <el-button style="float: right; padding: 3px 3px" type="text">删除课程</el-button>
            //   <el-button style="float: right; padding: 3px 3px" type="text">添加课程</el-button>
            // </div>