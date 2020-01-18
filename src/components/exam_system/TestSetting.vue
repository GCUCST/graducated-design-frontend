<template>
  <div class="testsetting">
      <h3>试卷设置</h3>
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="试卷名称">
    <el-input v-model="form.name" placeholder="请输入试卷名称"></el-input>
  </el-form-item>
  <el-form-item label="试卷总分">
    <el-input v-model="form.score" placeholder="请输入试卷总分"></el-input>
  </el-form-item>
  <el-form-item label="可用次数">
    <el-input v-model="form.num" placeholder="试卷可用次数"></el-input>
  </el-form-item>
  <el-form-item label="考试时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>

  <el-form-item label="试卷题型">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="选择题" name="type"></el-checkbox>
      <el-checkbox label="填空题" name="type"></el-checkbox>
      <el-checkbox label="简单题" name="type"></el-checkbox>
      <el-checkbox label="编程题" name="type"></el-checkbox>
      <el-checkbox label="程序填空" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">创建试卷</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

  </div>
</template>


<script>
export default {
  name: "testsetting",
  data() {
    return {
      msg: "考试系统-试卷设置",
      form: {
        name: '',
        score: '',
        num:'',
        date1: '',
        date2: '',
        type: [],
      }
    };
  },
  methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
};
</script>

<style scoped>
.testsetting{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  height: 600px;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
</style>
