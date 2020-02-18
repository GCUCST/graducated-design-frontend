///不用

<template>
  <div class="setting-share">
    <el-tabs tab-position="up">
      <el-tab-pane :label="msg">
        该课程可以被其他任课老师添加？
        <el-switch
          v-model="switchValue"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="true"
          inactive-value="false"
        ></el-switch>
      {{switchValue}}
<br>
<br>
<br>
 <div style="display:flex;justify-content:space-between">
       <el-button type="primary" @click="lastStep" plain>上一步</el-button>
       <el-button type="primary" @click="nextStep" plain>下一步</el-button>
  </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>



<script>
import VueBus from "@/utils/VueBus.js";

export default {
  name: "SettingShare",
  data() {
    return {
      msg: "设置共享",
      switchValue: false
    };
  },
  methods:{
    nextStep(){
      console.log("lastStep...")
      VueBus.$emit("jump",3)
    },
    lastStep(){
      console.log("lastStep...")
      VueBus.$emit("jump",1)
    }
  }
};
</script>

<style scoped>
.setting-share {
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  height: 600px;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
</style>
