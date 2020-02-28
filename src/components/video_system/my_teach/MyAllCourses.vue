<template>
  <div  >
    <!-- 学生添加版块 -->
    <v-AddClass v-show="showAddClassPanel"></v-AddClass>
    <!-- 整个内容区 -->
    <div class="content"   v-loading="loading" >
      <div v-if="noCourses" style="margin-top:200px;text-align:center">暂无课程。</div>

      <div v-for="(item,i) in courseObjects" :key="i">
        <div
       
          v-if="item.courseStatus=='待发布'"
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

          <div style="width:70%;" >
            <el-card  class="box-card" shadow="hover" style="width:100%">
              <div slot="header">
                <span>{{item.title}}</span>
                <el-button
                  v-if="editorId==false"
                  @click="release(item.courseId,item.className)"
                  style="float: right; padding: 3px 10px"
                  type="text"
                >发布</el-button>

                <el-button
                  @click="editCourse(item)"
                  v-if="editorId==false"
                  style="float: right; padding:3px 10px"
                  type="text"
                >编辑</el-button>

                <el-button
                  @click="finishEdit()"
                  v-if="editorId!=false"
                  style="float: right; padding:3px 10px"
                  type="text"
                >完成</el-button>

                <el-button
                  @click="cancelEdit()"
                  v-if="editorId!=false"
                  style="float: right; padding:3px 10px"
                  type="text"
                >取消</el-button>

                <el-button
                  v-if="editorId==false"
                  @click="delCourse(item.courseId,item.className)"
                  style="float: right; padding:3px 10px"
                  type="text"
                >删除</el-button>
              </div>
              <div style="font-size:16px;font-weight:500;line-height:26px;">
                创建&emsp;者：{{item.author}}
                <br />学&emsp;&emsp;时：
                <!-- {{item.courseHour}} -->

                <span v-if="!(editorId==item.courseId)">{{item.courseHour}}</span>
                <span v-if="(editorId==item.courseId)">
                  <!-- <el-input v-model="courseHour" style="width:150px" size="mini" /> -->
                  <el-input-number v-model="courseHour" :min="0" :max="1000"></el-input-number>
                </span>

                <br />学&emsp;&emsp;分：
                <!-- {{item.credit.toFixed(2)}} -->
                <span v-if="!(editorId==item.courseId)">{{item.credit.toFixed(2)}}</span>
                <span v-if="(editorId==item.courseId)">
                  <!-- <el-input v-model="credit" style="width:150px" size="mini" /> -->
                  <el-input-number v-model="credit" :min="0" :max="10"></el-input-number>
                </span>
                <br />性&emsp;&emsp;质：
                <span v-if="!(editorId==item.courseId)">
                  {{item.courseType=="public"?"公开课":item.courseType=="required"?"必修课":
                  item.courseType=="electives"?"选修课":item.courseType=="generalElective"?"通选课":
                  item.courseType=="other"?"其他":null
                  }}
                </span>
                <span v-if="(editorId==item.courseId)">
                  <el-select v-model="courseType" placeholder="请选择">
                    <el-option
                      v-for="item in  options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>

                <br />课程时间：
                <span
                  v-if="!(editorId==item.courseId)"
                >{{!item.courseDate?null: new Date(JSON.parse(item.courseDate)[0]).toLocaleDateString()+"——"+ new Date(JSON.parse(item.courseDate)[1]).toLocaleDateString()}}</span>
                <span v-if="(editorId==item.courseId)">
                  <el-date-picker
                    style="width:60%;"
                    v-model="courseDate"
                    unlink-panels
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </span>

                <br />
                创建时间：{{ new Date(item.createTime).toLocaleString() }}
                <br />介&emsp;&emsp;绍：
                <span
                  v-if="!(editorId==item.courseId)"
                >{{!item.introduce?null:item.introduce}}</span>
                <span v-if="(editorId==item.courseId)">
                  <el-input style="width:60%" v-model="introduce" />
                  <br />
                </span>

                <el-divider></el-divider>
                课程状态：{{item.courseStatus}}
                <br />其他提示：
                <span v-if="!(editorId==item.courseId)">{{item.tips=='null'?"未设置":item.tips}}</span>
                <span v-if="(editorId==item.courseId)">
                  <el-input v-model="tips" style="width:60%" />
                </span>

                <br />考试时间：
                <span
                  v-if="!(editorId==item.courseId)"
                >{{item.examTime=='null'?"未设置":item.examTime}}</span>
                <span v-if="(editorId==item.courseId)">
                  <el-input v-model="examTime" style="width:60%" />
                </span>
                <!-- <span v-if="item.examTime=='null'">
                  <el-button type="mini">添加</el-button>
                </span>-->

                <br />
                任课教师：{{item.username}}
                <br />教学班级：
                <span v-if="item.className!='null'">
                  {{item.className}}
                  <el-button v-if="editorId==false" @click="lookClass(item.students)">查看</el-button>
                  <el-button disabled v-if="editorId!=false" @click="lookClass(item.students)">查看</el-button>
                  <el-button v-if="editorId==false" @click="delClass(item.courseId)">删除</el-button>
                  <el-button disabled v-if="editorId!=false" @click="delClass(item.courseId)">删除</el-button>
                </span>
                <span v-if="item.className=='null'">
                  <el-button type="mini" v-if="editorId==false" @click="addClass(item.courseId)">添加</el-button>
                  <el-button
                    type="mini"
                    disabled
                    v-if="editorId!=false"
                    @click="addClass(item.courseId)"
                  >添加</el-button>
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
    <!-- /整个内容区  -->

    <!--  -->
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
      noCourses:true,
       loading:true,
      //用于更新。
      curCourseId: null,
      title: null,
      introduce: null,
      courseHour: null,
      credit: null,
      courseDate: null,
      courseType: null,
      examTime: null,
      tips: null, //
      options: [
        //课程类型选项
        { label: "公开课", value: "public" },
        { label: "必修课", value: "required" },
        { label: "选修课", value: "electives" },
        { label: "通选课", value: "generalElective" },
        { label: "其他", value: "other" }
      ],
      //

      defaultProps: {
        children: "children",
        label: "label"
      },
      editorId: false, //编辑模式
      QiniuyunUrl: UrlConfig.getQiniuyunUrl(),
      showAddClassPanel: false,
      courseObjects: null
    };
  },
  mounted() {
    var that = this;
    VueBus.$on("closeAddClass", function(data) {
      that.showAddClassPanel = false;
      that.reflashTeachClass();
      localStorage.removeItem("courseId");
    });
    this.reflashTeachClass();
  },
  methods: {
    cancelEdit() {
      this.editorId = false;
    },
    finishEdit() {
      //验证数据  上传  更新    清空本地的
      // console.log(this.curCourseId);
      // console.log(this.title);
      // console.log(this.introduce);
      // console.log(this.courseHour);
      // console.log(this.credit);
      // console.log(this.courseDate);
      // console.log(this.courseType);
      // console.log(this.examTime);
      // console.log(this.tips);
      if (this.curCourseId == "" || this.curCourseId == null) {
        alert("curCourseId" + "数据不完整");
        return;
      }
      if (this.title == "" || this.title == null) {
        alert("title" + "数据不完整");
        return;
      }
      if (this.introduce == "" || this.introduce == null) {
        alert("introduce" + "数据不完整");
        return;
      }
      if (this.courseHour == "" || this.courseHour == null) {
        alert("courseHour" + "数据不完整");
        return;
      }
      if (this.credit == "" || this.credit == null) {
        alert("credit" + "数据不完整");
        return;
      }
      if (this.courseDate == "" || this.courseDate == null) {
        alert("courseDate" + "数据不完整");
        return;
      }
      if (this.courseType == "" || this.courseType == null) {
        alert("courseType" + "数据不完整");
        return;
      }
      if (this.examTime == "" || this.examTime == null) {
        alert("examTime" + "数据不完整");
        return;
      }
      if (this.tips == "" || this.tips == null) {
        alert("tips" + "数据不完整");
        return;
      }
      //还需再加一个判断添加班级没有
      // console.log(this.curCourseId);
      // console.log(this.title);
      // console.log(this.introduce);
      // console.log(this.courseHour);
      // console.log(this.credit);
      // console.log(this.courseDate);
      // console.log(this.courseType);
      // console.log(this.examTime);
      // console.log(this.tips);
      var that = this;
      var parmas = new URLSearchParams();
      parmas.append("courseId", this.curCourseId);
      parmas.append("title", this.title);
      parmas.append("introduce", this.introduce);
      parmas.append("courseHour", this.courseHour);
      parmas.append("credit", this.credit);
      parmas.append("courseDate", JSON.stringify(this.courseDate));
      parmas.append("courseType", this.courseType);
      parmas.append("examTime", this.examTime);
      parmas.append("tips", this.tips);

      axios
        .post("/comm/updCourse", parmas)
        .then(function(response) {
          console.log(response.data.object == 1);
          if (response.data.object == 1) {
            that.$message({
              message: "更新成功",
              type: "success"
            });
            that.editorId = false;
            that.reflashTeachClass();
          } else {
            alert("更新异常。");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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

         that.courseObjects.forEach(element => {
           if(element.courseStatus=='待发布'){
             that.noCourses=false
             }
           });
          that.loading = false;

        })
        .catch(function(error) {
          console.log(error);
        });
    },
    release(courseId, className) {
      if (className == "null") {
        alert("发布前需要添加班级！");
        return;
      }

      //还需再加一个判断添加班级没有
      var that = this;
      var parmas = new URLSearchParams();
      parmas.append("courseStatus", "进行中");
      parmas.append("courseId", courseId);

      axios
        .post("/comm/updCourseStatus", parmas)
        .then(function(response) {
          console.log(response);
          that.reflashTeachClass();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    addClass(courseId) {
      localStorage.setItem("courseId", courseId);
      this.showAddClassPanel = true;
    },

    delClass(courseId) {
      var that = this;

        this.$confirm('确认删除该班级？')
          .then(_ => {

            var parmas = new URLSearchParams();
            parmas.append("courseId", courseId);
            axios
              .post("/comm/delClassByCourseId", parmas)
              .then(function(response) {
                console.log(response);
                that.reflashTeachClass();
              })
              .catch(function(error) {
                console.log(error);
              });
            that.reflashTeachClass();
          })
          .catch(_ => {});
    },
    editCourse(course) {
      this.editorId = course.courseId;
      (this.curCourseId = course.courseId),
        (this.title = course.title),
        (this.introduce = course.introduce),
        (this.courseHour = course.courseHour),
        (this.credit = course.credit),
        (this.courseDate = JSON.parse(course.courseDate)),
        (this.courseType = course.courseType),
        (this.examTime =
          course.examTime == "null" ? "未设置" : course.examTime),
        (this.tips = course.tips == "null" ? "未设置" : course.tips);
      // console.log(JSON.parse(JSON.stringify(this.courseDate)));
      console.log(course);
    },
    //doinging
    delCourse(courseId, className) {
      var that = this;

      this.$confirm("删除该课程？")
        .then(_ => {
          if (className != "null") {
            alert("请先清空班级:" + className);
            return;
          }
          var parmas = new URLSearchParams();
          parmas.append("courseId", courseId);
          axios
            .post("/comm/delCourse", parmas)
            .then(function(response) {
              console.log(response);
              that.reflashTeachClass();
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(_ => {});
    },

    lookClass(array) {
      console.log(array);
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
  /* height: 220px; */
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
</style>
