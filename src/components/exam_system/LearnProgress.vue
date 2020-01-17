<template>
  <div class="progress">
      {{msg}}
  </div>
</template>


<script>
export default {
  name: "progress",
  data() {
    return {
      msg: "考试系统-学生测试进度",
    };
  }
};
</script>

<style scoped>
.progress{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  height: 600px;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
</style>
