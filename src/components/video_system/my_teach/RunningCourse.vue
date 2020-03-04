<template >
  <div>
    <div v-if="showDetails" class="panel" >
         <div  style="text-align:right" >
            <el-button type="mini"
            circle @click="showDetails = !showDetails"><i class="el-icon-close"/>
            </el-button>
         </div>
     
       <el-tabs value = 'first'>
    <el-tab-pane label="课程学生" name="first">

      <div>
        <el-table
          ref="multipleTable"
          :data="CourseProgress"
          tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          style="width: 60%;txet-align:center;padding:30px;margin:0 auto; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="username" label="账号" width="180"></el-table-column>
          <el-table-column prop="allPercent" label="进度">
            <div slot-scope="scope">{{getStudentNameByUsername(scope.row.username)}}</div>
          </el-table-column>
          <el-table-column prop="allPercent" label="进度">
            <div slot-scope="scope">{{scope.row.allPercent}}%</div>
          </el-table-column>
        </el-table>
        <div style="margin:10px auto;">
            一共：{{CourseProgress.length}}名学生，选中{{multipleSelection.length}}名学生。
        </div>
      </div>

    </el-tab-pane>


    <el-tab-pane label="私信通知" name="fourth">
<el-collapse  >
  <el-collapse-item>
     <template slot="title">
      <div style="text-indent:2em;font-size:16px;">已选列表：（共{{multipleSelection.length}}位）</div>
    </template>
  <div>  
        <div style="flex-wrap: wrap;display:flex;width:90%;margin:0 auto">
      <div  style="font-weight:500;;width:18%;text-align:center;" v-for="(item,index) in multipleSelection" :key="index">
           {{item.username}} {{getStudentNameByUsername(item.username)}}
       </div>
      </div>      
  </div>
  </el-collapse-item>
</el-collapse>

      <div style="margin-top:50px;">
         <div style="width:100%;">   标题： <el-input v-model="title"  show-word-limit maxlength="30" style="width:300px;" /> </div>
         <div style="width:100%;">  内容： <el-input v-model="content" show-word-limit maxlength="200" type="textarea" style="width:300px;" /> </div>
        <br>
        <div><el-button @click="comfirmSend()">确认发送</el-button></div>
      </div>

    </el-tab-pane>
  </el-tabs>





    </div>




    <!-- 整个内容区 -->
    <div class="content" v-loading="loading">
      <div v-if="noCourses" style="margin-top:200px;text-align:center">暂无进行中的课程。</div>
      <div v-for="(item,i) in courseObjects" :key="i">
        <div
          v-if="item.courseStatus=='进行中'"
          style="justify-content:space-between;height:100%;padding:2%;display:flex"
        >
          <el-card shadow="hover" style="width:24%;height:100%" class="box-card">
            <el-tabs style="width:100%;height:100%" stretch>
              <el-tab-pane label="封面">
                <!-- 一个课程 -->
                <div style="height:100%">
                  <div>
                    <img style="width:100%;height:200px;" :src="QiniuyunUrl+item.cover" />
                  </div>
                  <!-- 标题 -->
                  <div class="title">{{item.title}}</div>
                </div>

                <footer class="bottom-content">
                  <div>赞{{item.likeNum}}</div>
                  <div>回{{item.replyNum}}</div>
                </footer>

                <!-- /一个课程 -->
              </el-tab-pane>
              <el-tab-pane label="目录">
                <el-tree
                  @node-click="handleNodeClick"
                  :data="JSON.parse(item.catalogData)"
                  :props="defaultProps"
                ></el-tree>
              </el-tab-pane>
            </el-tabs>
          </el-card>

          <div style="width:70%;">
            <el-card class="box-card" shadow="hover" style="width:100%">
              <div slot="header">
                <span>{{item.title}}</span>
                <el-button
                  @click="unRelease(item.courseId)"
                  style="float: right; padding: 3px 10px"
                  type="text"
                >挂起</el-button>
              </div>
              <div style="font-size:16px;font-weight:500;line-height:26px;">
                创建&emsp;者：{{item.author}}
                <br />学&emsp;&emsp;时：
                <span>{{item.courseHour}}</span>
                <br />学&emsp;&emsp;分：
                <span>{{item.credit.toFixed(2)}}</span>
                <br />性&emsp;&emsp;质：
                <span>
                  {{item.courseType=="public"?"公开课":item.courseType=="required"?"必修课":
                  item.courseType=="electives"?"选修课":item.courseType=="generalElective"?"通选课":
                  item.courseType=="other"?"其他":null
                  }}
                </span>
                <br />课程时间：
                <span>{{!item.courseDate?null:new Date(JSON.parse(item.courseDate)[0]).toLocaleDateString()+"——"+ new Date(JSON.parse(item.courseDate)[1]).toLocaleDateString()}}</span>
                <br />
                创建时间：
                {{new Date(item.createTime).toLocaleString() }}
                <br />介&emsp;&emsp;绍：
                <span>{{!item.introduce?null:item.introduce}}</span>
                <el-divider></el-divider>
                课程状态：{{item.courseStatus}}
                <br />其他提示：
                <span>{{item.tips=='null'?"未设置":item.tips}}</span>
                <br />考试时间：
                <span>{{item.examTime=='null'?"未设置":item.examTime}}</span>
                <br />
                任课教师：{{item.username}}
                <br />教学班级：
                <span v-if="item.className!='null'">
                  {{item.className}}
                  <el-button @click="lookClass(item.students,item.courseId)">查看</el-button>
                </span>
                <br />
                课程共享：{{item.courseShare?'是':'否'}}
                <br />
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import VueBus from "../../../utils/VueBus.js";
import AddClass from "../my_teach/AddClass.vue";
import axios from "axios";
import UrlConfig from "../../../config/UrlConfig.js";
export default {
  name: "ShareClass",
  data() {
    return {
      multipleSelection: [],
      showDetails: false,
      CourseProgress: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      allStudents: [],
      loading: true,
      QiniuyunUrl: UrlConfig.getQiniuyunUrl(),
      showAddClassPanel: false,
      courseObjects: null,
      noCourses: true,

      //私信模块
      title:null,
      content:null
    };
  },
  mounted() {
    this.reflashTeachClass();
    this.getAllStudents();
  },
  methods: {
    comfirmSend(){
      //1.判断   2.做消息发送
      if(this.title==''||this.title==null){
        alert("标题为空。")
        return ;
      }
      if(this.content==''||this.content==null){
        alert("不允许发送空值。")
          return ;
      }
      if(this.multipleSelection.length<1){
        alert("请于课程学生选中学生")
          return ;
      }
      var parmas = new URLSearchParams();
      parmas.append("title",this.title);
      parmas.append("content",this.content);
      parmas.append("messageType",'video_progress_tips');
      parmas.append("receivers",JSON.stringify(this.multipleSelection));
      var that = this;
      axios
        .post("/comm/sendMsgs",parmas)
        .then(function(response) {

            that.$message({
                showClose: true,
                duration:0,
          message: '发送成功！已将消息发送给'+response.data.object+"名学生。",
          type: 'success'
        });
        that.title=null,
        that.content=null;




        })
        .catch(function(error) {
          console.log(error);
        });



    },
    getStudentNameByUsername(username) {
      var name = null;
      this.allStudents.forEach(element => {
        if (element.stuId == username) {
          name = element.name;
          return;
        }
      });

      return name;
    },

    getAllStudents() {
      var that = this;
      axios
        .post("/comm/getAllStudents")
        .then(function(response) {
          that.allStudents = response.data.object.object;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    handleNodeClick(data) {
      if (data.url)
        window.open(UrlConfig.getQiniuyunUrl() + data.url, "_blank");
      else console.log(data.label);
    },
    reflashTeachClass() {
      var that = this;
      axios
        .post("/comm/getCoursesByUsername")
        .then(function(response) {
          console.log(response);
          that.courseObjects = response.data.object;
          that.loading = false;
          that.noCourses = true;
          that.courseObjects.forEach(element => {
            if (element.courseStatus == "进行中") {
              that.noCourses = false;
            }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    unRelease(courseId) {
      var that = this;
      var parmas = new URLSearchParams();
      parmas.append("courseStatus", "待发布");
      parmas.append("courseId", courseId);

      this.$confirm("确定暂停该课程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/comm/updCourseStatus", parmas)
            .then(function(response) {
              console.log(response);
              that.reflashTeachClass();
              that.$message({
                type: "success",
                message: "挂起成功!"
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    lookClass(array, id) {
      var parmas = new URLSearchParams();
      parmas.append("courseId", id);
      var that = this;
      axios
        .post("/comm/getTeachClassByCourseId", parmas)
        .then(function(response) {
          that.CourseProgress = response.data.object;
          that.showDetails = true;

          //更新进度
          that.CourseProgress.forEach(element => {
            if (element.progress == 0) {
              return;
            }
            var n = 0; //个数
            var p = 0; //总量
            //当学生第一次进入该课程。并不存在进度
            if (element.progress == 0) return;
            JSON.parse(element.progress).catalog.forEach(ec => {
              p += Number(ec.percent);
              n++;
            });
            element.allPercent = (p / n).toFixed(2);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    "v-AddClass": AddClass
  },
  beforeDestroy() {}
};
</script>

<style scoped>
.detail {
  width: 400px;
  z-index: 99999;
  background: white;
  border: 1px solid;
  position: fixed;
}

.bottom-content {
  font-size: 12px;
  display: flex;
  margin-top: 30px;
  height: 15px;
  justify-content: space-between;
}

.title {
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}
.box-card {
  width: 300px;
}
.panel{
      text-align: center;
    position: fixed;
    background: white;
    width: 75%;
    top: 11%;
    min-width: 900px;
    min-height: 550px;
    height: 70%;
    font-size: 18px;
    line-height: 30px;
    font-weight: 500;
    overflow: auto;
    z-index: 9999;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>














