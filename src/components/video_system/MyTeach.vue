//教师
<template >
  <div  class="my-teach" @click="visible=false" @contextmenu.prevent>
    <el-tabs tab-position="up" v-model="activeName" >
      

      
       <el-tab-pane label="进行中课程" name='0'>   
          <v-RunningCourse  v-if="activeName=='0'"></v-RunningCourse>
      </el-tab-pane>


       <el-tab-pane label="我所有课程" name='1'>   
          <v-MyAllCourses v-if="activeName=='1'"></v-MyAllCourses>
      </el-tab-pane>

       <el-tab-pane label="课程模板" name='2'>
         <v-ShareCourse v-if="activeName=='2'"></v-ShareCourse>
      </el-tab-pane>

      <el-tab-pane label="新建课程" name='3'>
        <v-NewCourse v-if="activeName=='3'"> </v-NewCourse>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>




<script>
import NewCourse from "@/components/video_system/my_teach/NewCourse.vue";
import ShareCourse from "@/components/video_system/my_teach/ShareCourse.vue";
import RunningCourse from "@/components/video_system/my_teach/RunningCourse.vue";
import MyAllCourses from "@/components/video_system/my_teach/MyAllCourses.vue";


export default {
  name: "MyTeach",
  data() {
    return {
      msg: "进行中的课程",
      activeName:'0',  //出现页面也会刷新数据
      Axis: { x: 0, y: 0, index: null } //坐标和对象
    };
  },
  methods: {
    rightClick(e, index) {
      this.Axis = { x: e.x, y: e.y, index: index };
      this.visible = true;
    }
  },
  components: {
    "v-NewCourse": NewCourse,
    "v-ShareCourse": ShareCourse,
    "v-RunningCourse":RunningCourse,
    "v-MyAllCourses":MyAllCourses

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

.my-teach {
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  min-height: 600px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px
}
.content {
  /* display: flex; */
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
.box-card {
  width: 300px;
}
</style>
