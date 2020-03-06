<template>
  <div class="video-course">
    <div name="当用户是学生" v-if="role=='student'">
      <v-VideoStudent></v-VideoStudent>
    </div>

     <div name="当用户是教师"  v-if="role=='teacher'">
      <v-VideoTeacher></v-VideoTeacher>
    </div>

    <div>
      <el-tabs value="one">
        <el-tab-pane label="评论系统" name="one">
          <v-Comments></v-Comments>
        </el-tab-pane>
        <el-tab-pane label="练习系统" name="two">
          <v-Practice></v-Practice>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import Comments from "./Comments";
import Practice from "./Practice";
import VideoStudent from "./VideoStudent";
import VideoTeacher from "./VideoTeacher";
import UrlConfig from "../../config/UrlConfig.js";
export default {
  name: "VideoCourse",
  components: {
    "v-Comments": Comments,
    "v-VideoStudent": VideoStudent,
    "v-Practice":Practice,
    "v-VideoTeacher":VideoTeacher
  },
  data() {
    return {
      role:JSON.parse(localStorage.getItem("userInfo")).info.role
    };
  },
  methods: {
    
  },

  mounted() {
    // this.courseId = this.$route.query.courseId;
    // this.videoId = this.$route.query.videoId;
  }
};
</script>

<style scoped>
.video-course {
  min-height: 600px;
  margin: 0px auto;
  padding: 20px;
  background: white;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
