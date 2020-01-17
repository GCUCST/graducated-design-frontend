<template>
  <div class="practice">
      {{msg}}
  </div>
</template>


<script>
export default {
  name: "practice",
  data() {
    return {
      msg: "考试系统-学生-章节练习",
    };
  }
};
</script>

<style scoped>
.practice{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  height: 600px;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
</style>
