<template>
  <div>
    <!-- 学生 -->
    <v-AddClass v-show="showAddClassPanel"></v-AddClass>

    <!--  学生 -->
    <!-- 整个内容区 -->
    <div class="content">
      <div v-for="(item,i) in courseObjects" :key="i">
        <div
          v-if="item.courseStatus=='待发布'"
          style="justify-content:space-between ;padding:2%;display:flex"
        >
          <el-card shadow="hover" style="width:24%;" class="box-card">
            <el-tabs stretch>
              <el-tab-pane label="封面">
                <!-- 一个课程 -->
                <div>
                  <div>
                    <img style="width:100%;height:150px;" :src="item.cover" />
                  </div>
                  <!-- 标题 -->
                  <div class="title">{{item.title}}</div>
                  <div class="bottom-content">
                    <div>{{item.author}}</div>
                    <div style="display:flex;">
                      <div>赞{{item.likeNum}}</div>&ensp;
                      <div>回复{{item.replyNum}}</div>
                    </div>
                  </div>
                </div>
                <!-- /一个课程 -->
              </el-tab-pane>
              <el-tab-pane label="目录">
                <el-tree :data="JSON.parse(item.catalogData)" :props="defaultProps"></el-tree>
              </el-tab-pane>
            </el-tabs>
          </el-card>

          <div style="width:70%;">
            <el-card class="box-card" shadow="never" style="width:100%">
              <div slot="header">
                <span>{{item.title}}</span>
                <el-button
                  @click="release(item.courseId,item.className)"
                  style="float: right; padding: 3px 0"
                  type="text"
                >发布</el-button>
                <el-button
                  @click="delCourse(item.courseId,item.className)"
                  style="float: right; padding:3px 20px"
                  type="text"
                >删除</el-button>
              </div>
              <div style="font-size:14px">
                介&emsp;&emsp;绍：{{item.introduce}}
                <br />
                创建&emsp;者：{{item.author}}
                <br />
                学&emsp;&emsp;时：{{item.courseHour}}
                <br />
                学&emsp;&emsp;分：{{item.credit}}
                <br />
                性&emsp;&emsp;质：{{item.courseType}}
                <br />
                创建时间：{{item.createTime}}
                <br />
                课程时间：{{item.courseDate}}
                <hr />
                <br />
                课程状态：{{item.courseStatus}}
                <br />其他提示：
                <span v-if="item.tips=='null'">
                  <el-button type="mini">添加</el-button>
                </span>

                <br />考试时间：
                <span v-if="item.examTime=='null'">
                  <el-button type="mini">添加</el-button>
                </span>
                <br />
                教&emsp;&emsp;师：{{item.author}}
                <br />教学班级：
                <span v-if="item.className!='null'">
                  {{item.className}}
                  <el-button @click="lookClass(item.students)">查看</el-button>
                  <el-button @click="delClass(item.courseId)">删除</el-button>
                </span>
                <span v-if="item.className=='null'">
                  <el-button @click="addClass(item.courseId)">添加</el-button>
                </span>
                <br />
                课程共享：{{item.courseShare?'是':'否'}}
                <br />
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

export default {
  name: "ShareClass",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      msg: "1",
      showAddClassPanel: false,
      courseObjects: null 
    };
  },
  mounted() {

    var that = this;
    VueBus.$on("closeAddClass", function(data) {
      that.showAddClassPanel = false;
     that.reflashTeachClass();
     localStorage.removeItem("courseId")
    });
    this.reflashTeachClass();
  },
  methods: {
    reflashTeachClass() {
      var that = this;
      axios
        .post("/comm/getCoursesByUsername")
        .then(function(response) {
          console.log(response);
          that.courseObjects = response.data.object;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    release(courseId,className) {

      if(className=='null')
      {
        alert("发布前需要添加班级！")
        return ;
      }

      //还需再加一个判断添加班级没有
        var that = this;
        var parmas = new URLSearchParams()
        parmas.append("courseStatus","进行中")
        parmas.append("courseId",courseId)

      axios 
        .post("/comm/updCourse",parmas)
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
      var parmas = new URLSearchParams();
      parmas.append("courseId", courseId);
      var that = this;
      axios
        .post("/comm/delClassByCourseId", parmas)
        .then(function(response) {
          console.log(response);
          that.reflashTeachClass();
        })
        .catch(function(error) {
          console.log(error);
        });
        
    },
    //doinging
    delCourse(courseId, className) {
      if (className!='null') {
        alert("请先清空班级:"+className);
        return;
      }
      var parmas = new URLSearchParams();
      parmas.append("courseId", courseId);
      var that = this;
      axios
        .post("/comm/delCourse", parmas)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    lookClass(array) {
      console.log(array)
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
  margin-top: 20px;
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
