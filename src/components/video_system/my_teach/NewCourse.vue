<template>
  <div class="new-course" @contextmenu.prevent>
    <template>
      <el-tabs tab-position="up">
        <el-tab-pane label="课程添加">
          <div style="display:flex">
            <div style="width:40%;margin:0 auto">
              封面：
              <v-imgTitleIntro />
            </div>
            <div style="width:50%;margin:1px auto">
              目录：
              <v-catalog />
            </div>
          </div>
          <br />
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>




<script>
import Catalog from "./new_course/CatalogSave";
import ImgTitleIntro from "./new_course/ImgTitleIntro.vue";

export default {
  name: "NewCourse",
  data() {
    return {
    };
  },
  components: {
    "v-catalog": Catalog,
    "v-imgTitleIntro": ImgTitleIntro
  }
};
</script>

<style scoped>
.new-course {
  border: 1px solid yellow;
  width: 100%;
}
</style>
