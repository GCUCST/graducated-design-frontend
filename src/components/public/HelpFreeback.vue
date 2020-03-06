<template>
  <div class="help-freeback">
       <el-tabs tab-position="up">
       <el-tab-pane label="帮助">
         <div style="margin-top:100px;;text-align:center">欢迎使用华广学习系统。</div>
       </el-tab-pane>
       <el-tab-pane label="反馈">
            <div style="margin-top:100px;;text-align:center">无</div>
       </el-tab-pane>
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
