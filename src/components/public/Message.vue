<template>
  <div class="message">
       <el-tabs tab-position="up">
       <el-tab-pane label="消息系统">消息系统</el-tab-pane>
  </el-tabs>
  </div>
</template>


<script>
export default {
  name: "Message",
  data() {
    return {
      msg: "消息系统",
    };
  }
};
</script>

<style scoped>
.message{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  height: 600px;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
</style>
