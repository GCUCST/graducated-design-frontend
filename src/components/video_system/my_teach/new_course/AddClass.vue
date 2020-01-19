<template>
  <div class="add-class">
    <br />

    <div>
      任课老师：
      <el-select v-model="teachers" placeholder="请选择">
        <el-option
          v-for="item in teachersOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <br />
    <div>
      课程状态：
      <el-select v-model="courseStatus" placeholder="请选择">
        <el-option
          v-for="item in courseStatusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <br />

    <div class="block">
      <span class="demonstration">考试时间：</span>
      <el-date-picker v-model="ExamDate" type="date" placeholder="选择日期"></el-date-picker>
    </div>
    <br />

    <div>
      添加学生：
      <el-input style="width:30%" v-model="students" placeholder="请输入内容"></el-input>
    </div>

    <br />

    <div>
      共享课程：
      <el-switch v-model="share" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      （本课程可由其他任课老师添加，修改，但不共享该页面）
    </div>

    <br />

    <div>
      生成对应考试系统目录：
      <el-switch v-model="createExamCatalog" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </div>
    <br />

<el-button type="primary" @click="save">保存</el-button>
<el-button type="primary" @click="release">发布</el-button>
<br>
  </div>
</template>



<script>
export default {
  name: "AddClass",
  data() {
    return {
teachersOptions:[{value:"陈一一",label:"陈一一"}],
courseStatusOptions:[{value:"进行中",label:"进行中"}],
      teachers:"",
      courseStatus:"",
      ExamDate:"",
      students:"",
      share:false,
      createExamCatalog:false
    };
  },
  methods:{

 release(){
   alert("发布成功")
 },

    save(){
       var addClass = {
        teachers:this.teachers,
      courseStatus:this.courseStatus,
      ExamDate:this.ExamDate,
      students:this.students,
      share:this.share,
      createExamCatalog:this.createExamCatalog
       }

       console.log(addClass)
       localStorage.setItem("addClass",JSON.stringify(addClass))



    }
  }
};
</script>

<style scoped>
.add-class {
  text-align: center;
  padding-top: 12px;
  border-radius: 4px;
  background: white;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
</style>
