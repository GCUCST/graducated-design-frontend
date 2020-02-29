<template>
  <div class="video-course">
    

    <div name="当用户是学生">
      <v-VideoStudent></v-VideoStudent>
    </div>

    <div>
      <v-Comments></v-Comments>
    </div>

  </div>
</template>



<script>
import axios from "axios";
import Comments from "./Comments";
import VideoStudent from "./VideoStudent";
import UrlConfig from "../../config/UrlConfig.js";
export default {
  name: "VideoCourse",
  components: {
    "v-Comments": Comments,
    "v-VideoStudent":VideoStudent
  },
  data() {
    return {
    
    };
  },
  methods: {
  
  },

  mounted() {
    this.courseId = this.$route.query.courseId;
    this.videoId = this.$route.query.videoId;
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
