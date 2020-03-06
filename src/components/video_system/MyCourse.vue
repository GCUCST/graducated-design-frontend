<template>
  <div v-loading="loading" class="homebody" @click="visible=false" @contextmenu.prevent>
    <el-tabs tab-position="up">
      <el-tab-pane :label="msg">
        <!-- 右击详情 -->
        <div v-if="visible" :style="{top:Axis.y+'px',left:Axis.x+'px'}" class="detail">
          <div style="font-size:14px">
            名称：{{Axis.item.course.title}}
            <br />
            学时：{{Axis.item.course.courseHour}}
            <br />
            学分：{{Axis.item.course.credit}}
            <br />
            性质：
            {{Axis.item.course.courseType=="public"?"公开课":Axis.item.course.courseType=="required"?"必修课":
            Axis.item.course.courseType=="electives"?"选修课":Axis.item.course.courseType=="generalElective"?"通选课":
            Axis.item.course.courseType=="other"?"其他":null
            }}
            <br />
            任课老师：{{ getTeacherNameByStaId( Axis.item.course.username)}}
            <br />
            课程时间：
            {{!Axis.item.course.courseDate?null: new Date(JSON.parse(Axis.item.course.courseDate)[0]).toLocaleDateString()+" - "+ new Date(JSON.parse(Axis.item.course.courseDate)[1]).toLocaleDateString()}}
            <br />
            创建时间：
            {{ new Date(Axis.item.course.createTime).toLocaleString() }}
            <br />
            课程状态：{{Axis.item.course.courseStatus}}
            <br />
            其他提示：{{Axis.item.course.tips=='null'?'未设置':Axis.item.course.tips}}
            <br />
            介绍：{{Axis.item.course.introduce=='null'?'未设置':Axis.item.course.introduce}}
            <br />
          </div>
        </div>

        <!-- 整个内容区 -->
        <div class="content">
          <div v-if="noCourses" style=";margin:200px auto;margin-top:200px;text-align:center">暂无课程。</div>

          <div style="width:26%;margin:3%" v-for="(item) in courses" :key="item.course.courseId">
            <el-card
              style="width:100%"
              shadow="hover"
              class="box-card"
              v-if="item.course.courseStatus"
            >
              <!-- v-if="item.course.courseStatus=='进行中'"> -->

              <!-- 一个课程 -->
              <div @contextmenu.prevent @click.right="rightClick($event,item)">
                <div>
                  <img style="width:100%;height:200px;" :src="QiniuyunUrl+item.course.cover" />
                </div>
                <!-- 标题 -->
                <div
                  class="title"
                  @click="intoCourse(item.course.courseId, JSON.parse(item.teachClass.progress).videoId)"
                >{{item.course.title}}</div>

                <div class="bottom-content">
                  <div>{{ getTeacherNameByStaId(item.course.username)}}</div>
                  <div>{{item.teachClass.allPercent}}%</div>
                  <div style="display:flex;">
                    <div>
                      <img width="14px;" height="14px" src="../../assets/icons/like.png" />
                    </div>
                    <div style="font-weight:545">&nbsp;{{item.course.likeNum}}</div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <!--  -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>




<script>
import axios from "axios";
import UrlConfig from "../../config/UrlConfig";

export default {
  name: "Homebody",
  data() {
    return {
      msg: "我的课程",
      loading: true,
      noCourses: true,
      QiniuyunUrl: UrlConfig.getQiniuyunUrl(),
      courses: null,
      allTeachers: null,
      Axis: { x: 0, y: 0, item: null }, //坐标和对象
      visible: false //展示右击菜单
    };
  },
  mounted() {
    this.getMyCourses();
    this.getAllTeachers();
  },

  methods: {
    getTeacherNameByStaId(staId) {
      var name = null;
      if (this.allTeachers == null) {
        return;
      }
      this.allTeachers.forEach(element => {
        if (element.staId == staId) {
          name = element.name;
        }
      });
      return name;
    },
    getAllTeachers() {
      var that = this;
      axios
        .post("/comm/getAllTeachers")
        .then(function(response) {
          that.allTeachers = response.data.object;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getMyCourses() {
      var that = this;
      axios
        .post("/comm/getStudentCourse")
        .then(function(response) {
          that.courses = response.data.object;
          //更新进度
          that.courses.forEach(element => {
            var n = 0; //个数
            var p = 0; //总量
            //当学生第一次进入该课程。并不存在进度
            if (element.teachClass.progress == 0) return;
            JSON.parse(element.teachClass.progress).catalog.forEach(ec => {
              p += Number(ec.percent);
              n++;
            });
            element.teachClass.allPercent = (p / n).toFixed(2);
          });
          if (that.courses.length != 0) {
            that.noCourses = false;
          }

          that.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    intoCourse(courseId, videoId) {
      console.log("进入某节课" + courseId);

      this.$router.push({
        name: "VideoCourse",
        query: { courseId: courseId, videoId: videoId }
      });
    },

    rightClick(e, item) {
      this.Axis = { x: e.x, y: e.y, item: item };
      this.visible = true;
    }
  }
};
</script>

<style scoped>
.detail {
  width: 500px;
  font-size: 18px;
  font-weight: 540;
  line-height: 26px;
  z-index: 99999;
  background: white;
  position: fixed;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 10px;
  border-radius: 3px;
}

.homebody {
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-height: 600px;
}
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  cursor: pointer;
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
.title:hover {
  color: #409eff;
}
.box-card {
  width: 300px;
}
</style>
