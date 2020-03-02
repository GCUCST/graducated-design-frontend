<template>
  <div class="homebody" @click="visible=false" @contextmenu.prevent>
    <el-tabs tab-position="up">
      <el-tab-pane :label="msg">
        <div v-if="visible" :style="{top:Axis.y+'px',left:Axis.x+'px'}" class="detail">
          <div style="font-size:14px">
            名称：{{Axis.item.title}}
            <br />
            学时：{{Axis.item.courseHour}}
            <br />
            性质：
            {{Axis.item.courseType=="public"?"公开课":Axis.item.courseType=="required"?"必修课":
            Axis.item.courseType=="electives"?"选修课":Axis.item.courseType=="generalElective"?"通选课":
            Axis.item.courseType=="other"?"其他":null
            }}
            <br />
            任课老师：{{ Axis.item.author}}
            <br />
            课程时间：
            {{!Axis.item.courseDate?null: new Date(JSON.parse(Axis.item.courseDate)[0]).toLocaleDateString()+" - "+ new Date(JSON.parse(Axis.item.courseDate)[1]).toLocaleDateString()}}
            <br />
            创建时间：
            {{ new Date(Axis.item.createTime).toLocaleString() }}
            <br />
            其他提示：{{Axis.item.tips=='null'?'未设置':Axis.item.tips}}
            <br />
            介绍：{{Axis.item.introduce=='null'?'未设置':Axis.item.introduce}}
            <br />
          </div>
        </div>

        <div class="content">
          <div v-if="noCourses" style=";margin:200px auto;margin-top:200px;text-align:center">暂无课程。</div>

          <div style="width:25%;margin:3%" v-for="(item,index) in publicCourses" :key="index">
            <el-card style="width:100%" shadow="hover" class="box-card" v-if="item.courseStatus">
              <div @contextmenu.prevent @click.right="rightClick($event,item)">
                <div>
                  <img style="width:100%;height:200px;" :src="QiniuyunUrl+item.cover" />
                </div>
                <div @click="intoCourse(item.courseId)" class="title">{{item.title}}</div>
                <div class="bottom-content">
                  <div>{{ item.author}}</div>
                  <div style="display:flex;">
                    <div> <img width="12px;" height="12px" src="../../assets/icons/like.png"/>{{item.likeNum}}</div>&ensp;
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>




<script>
import axios from "axios";
import UrlConfig from "../../config/UrlConfig.js";
export default {
  name: "Homebody",
  data() {
    return {
      msg: "主界面",
      noCourses: false, //当前无课程
      publicCourses: [], //公共课程
      QiniuyunUrl: UrlConfig.getQiniuyunUrl(), //七牛云地址
      Axis: { x: 0, y: 0, item: null }, //坐标和对象
      visible: false //展示右击菜单
    };
  },
  methods: {
    intoCourse(courseId) {
      console.log("进入某节课" + courseId);
      this.$router.push({
        name: "PublicCourse",
        query: { courseId: courseId }
      });
    },
    rightClick(e, item) {
      this.Axis = { x: e.x, y: e.y, item: item };
      this.visible = true;
    },
    getAllPublicCourses() {
      var that = this;
      axios
        .post("/comm/getAllPublicCourses")
        .then(function(response) {
          that.publicCourses = response.data.object;
          that.noCourses = false;
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getAllPublicCourses();
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
