// 学生

<template>
  <div class="homebody" @click="visible=false" @contextmenu.prevent>
    <el-tabs tab-position="up">
      <el-tab-pane :label="msg">
        <!--  -->

        <!-- 右击详情 -->
        <div v-if="visible" :style="{top:Axis.y+'px',left:Axis.x+'px'}" 
        class="detail">
          <div style="font-size:14px">
          名称：{{Axis.item.course.title}}<br>
          介绍：{{Axis.item.course.introduce}}<br>
          任课老师：{{Axis.item.course.author}}<br>
          学时：{{Axis.item.course.courseHour}}<br>
          学分：{{Axis.item.course.credit}}<br>
          性质：{{Axis.item.course.courseType}}<br>
          创建时间：{{Axis.item.course.createTime}}<br>
          课程时间：{{Axis.item.course.courseDate}}<br>
          课程状态：{{Axis.item.course.courseStatus}}<br>
          其他提示：{{Axis.item.course.tips}}<br>
          </div>
        </div>

        <!-- 整个内容区 -->
        <div class="content">
          <el-card
            shadow="hover"
            style="width:29%;margin:2%"
            v-for="(item) in courses"
            :key="item.course.courseId"
            class="box-card"
          >
            <!-- 一个课程 -->
            <div @contextmenu.prevent @click.right="rightClick($event,item)">
              <div>
                <img style="width:100%;height:200px;" 
                :src="item.course.cover" />
              </div>
              <!-- 标题 -->
              <div class="title" @click="intoCourse(item.course.courseId)" >{{item.course.title}}</div>

              <div class="bottom-content">
                <div>{{item.course.author}}</div>
                 <div>{{item.teachClass.progress}}%</div>
                <div style="display:flex;">
                  <div>赞{{item.course.likeNum}}</div>&ensp;
                  <div>回{{item.course.replyNum}}</div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <!--  -->
      </el-tab-pane>


    </el-tabs>
  </div>
</template>




<script>
import axios from 'axios'
export default {
  name: "Homebody",
  data() {
    return {
      msg: "我的课程（学生）",
      courses:null,
      Axis: { x: 0, y: 0, item: null }, //坐标和对象
      visible: false //展示右击菜单
    };
  },
mounted(){
  var that = this
      axios 
        .post("/comm/getStudentCourse")
        .then(function(response) {
          console.log(response);
          that.courses = response.data.object
        })
        .catch(function(error) {
          console.log(error);
        });
},

  methods: {

     intoCourse(courseId){
      console.log("进入某节课"+courseId)
      this.$router.push({ name: 'VideoCourse', query: { "courseId": courseId,"videoId":null}})
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
  /* height: 220px; */
  z-index: 99999;
  background: white;
  position:fixed;
    box-shadow: 0px 0px 2px 1px rgba(64, 158, 255, 0.5);
    background-color: white;
    padding: 10px;
    border-radius: 3px;

}

.homebody {
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  cursor:pointer
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
.title:hover{
  color:#409EFF;
}
.box-card {
  width: 300px;
}
</style>
