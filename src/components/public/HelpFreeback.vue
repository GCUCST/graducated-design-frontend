<template>
  <div class="help-freeback">
       <el-tabs tab-position="up">
       <el-tab-pane label="帮助">帮助</el-tab-pane>
       <el-tab-pane label="反馈">反馈</el-tab-pane>
  </el-tabs>
  </div>
</template>


<script>
export default {
  name: "HelpFreeback",
  data() {
    return {
      msg: "帮助反馈",
    };
  }
};
</script>

<style scoped>
.help-freeback{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  height: 600px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
