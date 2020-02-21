//教师
<template>
  <div class="my-teach" @click="visible=false" @contextmenu.prevent>
    <el-tabs tab-position="up">
      

      
       <el-tab-pane label="进行中课程">   
          <v-RunningCourse></v-RunningCourse>
      </el-tab-pane>


       <el-tab-pane label="我所有课程">   
          <v-MyAllCourses></v-MyAllCourses>
      </el-tab-pane>

       <el-tab-pane label="课程模板">
         <v-ShareCourse></v-ShareCourse>
      </el-tab-pane>

      <el-tab-pane label="新建课程">
        <v-NewCourse></v-NewCourse>
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
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
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
