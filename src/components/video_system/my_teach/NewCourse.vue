<template>
  <div class="new-course" @contextmenu.prevent>
      <el-steps :active="step" finish-status="success" align-center>
        <el-step title="课程介绍"></el-step>
        <el-step title="设置章节"></el-step>
        <el-step title="添加班级"></el-step>
      </el-steps>

        <div style="width:80%;margin:0 auto">
          <v-ImgTitleIntro v-if="step==0" />
          <v-Catalog v-if="step==1" />
          <div style="display:flex;justify-content:space-between">
            <el-button type="primary" plain>重新填写</el-button>
            <el-button type="primary" plain>暂存修改</el-button>
            <el-button type="primary" @click="nextStep" plain>下一步</el-button>
          </div>

        </div>
      <br />
  </div>
</template>




<script>
import Catalog from "./new_course/CatalogSave";
import ImgTitleIntro from "./new_course/ImgTitleIntro.vue";

export default {
  name: "NewCourse",
  data() {
    return {
      step: 0
    };
  },
  components: {
    "v-Catalog": Catalog,
    "v-ImgTitleIntro": ImgTitleIntro
  },
  methods:{
    nextStep(){
      this.step=++this.step%3;
    }

  }
};
</script>

<style scoped>
.new-course {
  width: 100%;
}
</style>
