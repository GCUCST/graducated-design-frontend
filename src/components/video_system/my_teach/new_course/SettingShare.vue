<template>
  <div class="setting-share ">
      <el-tabs tab-position="up">
        <el-tab-pane :label="msg">{{msg}}</el-tab-pane>
      </el-tabs>
  </div>
</template>



<script>
export default {
  name: "SettingShare",
  data() {
    return {
      msg: "设置共享"
    };
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
