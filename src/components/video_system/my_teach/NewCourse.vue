<template>
  <div class="new-course" @contextmenu.prevent>
    备注：3决定该课程性质，共享就直接发布到共享课程，然后再去添加。非共享就6道工序
      <el-steps :active="step" finish-status="success" align-center>
        <el-step title="课程介绍"></el-step>
        <el-step title="设置章节"></el-step>
        <el-step title="设置共享"></el-step>
        <el-step title="添加班级"></el-step>
        <el-step title="课程预览"></el-step>
        <el-step title="课程发布"></el-step>
      </el-steps>

        <div style="width:80%;margin:0 auto">
          <v-ImgTitleIntro v-if="step==0" />
          <v-Catalog v-if="step==1" />
          <v-AddClass v-if="step==2" />
          <div style="display:flex;justify-content:space-between">
            <el-button type="primary" plain>重新填写</el-button>
            <el-button type="primary" plain>保存</el-button>
            <el-button type="primary" plain>发布！</el-button>
            <el-button type="primary" @click="nextStep" plain>下一步</el-button>
          </div>

        </div>
      <br />
  </div>
</template>




<script>
import Catalog from "./new_course/CatalogSave";
import ImgTitleIntro from "./new_course/ImgTitleIntro.vue";
import AddClass from "./new_course/AddClass.vue";


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
    "v-AddClass":AddClass
  },
  methods:{
    nextStep(){
      this.step++;
      this.step=this.step%3;
    }

  }
};
</script>

<style scoped>
.new-course {
  width: 100%;
}
</style>
