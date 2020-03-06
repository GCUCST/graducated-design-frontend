<template>
  <div class="new-course" @contextmenu.prevent>
    <div style="margin:10px auto;width:80%" >
    <el-steps  :active="step" finish-status="success"   align-center>
      <el-step  icon="el-icon-edit" title="课程介绍"></el-step>
      <el-step   icon="el-icon-notebook-2"  title="设置章节"></el-step>
      <el-step   icon="el-icon-upload"  title="课程预览"></el-step>
    </el-steps>
    </div>
    <div style="width:80%;margin:0 auto">
      <v-ImgTitleIntro v-if="step==0" />
      <v-Catalog v-if="step==1" />
      <v-PreviewAndRelease v-if="step==2" />
    </div>
    <br />
  </div>
</template>




<script>
import Catalog from "./new_course/CatalogSave";
import ImgTitleIntro from "./new_course/ImgTitleIntro.vue";

import PreviewAndRelease from "./new_course/PreviewAndRelease.vue";
import VueBus from "@/utils/VueBus.js";

export default {
  name: "NewCourse",
  data() {
    return {
      step: 0
    };
  },
  components: {
    "v-Catalog": Catalog,
    "v-ImgTitleIntro": ImgTitleIntro,
    "v-PreviewAndRelease": PreviewAndRelease
  },
  mounted() {
    var that = this;
    VueBus.$on("jump", function(data) {
      that.step = data;
    });
  },
  methods: {
    nextStep() {
      this.step++;
      this.step = this.step % 3;
    }
  }
};
</script>

<style scoped>
.new-course {
  width: 100%;
  font-size: 18px;
  
  
}
</style>
