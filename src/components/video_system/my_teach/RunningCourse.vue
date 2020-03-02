<template >
  <div >
    <!-- 学生添加版块 -->
    <v-AddClass v-show="showAddClassPanel"></v-AddClass>
    <!-- 整个内容区 -->
    <div class="content"  v-loading="loading">
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
                  <el-button @click="lookClass(item.students)">查看</el-button>
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
      defaultProps: {
        children: "children",
        label: "label"
      },
      loading:true,
      QiniuyunUrl: UrlConfig.getQiniuyunUrl(),
      showAddClassPanel: false,
      courseObjects: null,
      noCourses:true
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
          that.noCourses = true
           that.courseObjects.forEach(element => {
             if(element.courseStatus=='进行中'){
               that.noCourses=false
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

 this.$confirm('确定暂停该课程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            axios
        .post("/comm/updCourseStatus", parmas)
        .then(function(response) {
          console.log(response);
          that.reflashTeachClass();
             that.$message({
            type: 'success',
            message: '挂起成功!'
          });
        })
        .catch(function(error) {
          console.log(error);
        });

       
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });


    


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














