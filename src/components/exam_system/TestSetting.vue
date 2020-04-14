<template>
  <div class="testsetting">
    考试设置-考试管理
    <el-divider></el-divider>

    
    
    <!-- 考试的增删改查操作 -->
    <el-row>
      <el-button type="primary" plain @click="addExam"><i class="el-icon-circle-plus"></i>添加考试</el-button>
      <el-button type="primary" plain @click="editExam"><i class="el-icon-edit"></i>修改考试</el-button>
      <el-button type="primary" plain @click="deleteExam"><i class="el-icon-remove"></i>删除考试</el-button>
    </el-row>

    <!-- 使用 行内表单  设置考试的搜索条件 -->
    <div style="padding-top: 20px;">
      <el-form :inline="true" :model="examsearch" class="demo-form-inline">
        <el-form-item label="考试名称">
          <el-input v-model="examsearch.ename" placeholder="考试名称"></el-input>
        </el-form-item>
        <el-form-item label="试卷类型">
          <el-select v-model="examsearch.type" placeholder="试卷类型">
            <el-option label="章节练习" value="0"></el-option>
            <el-option label="章节测试"" value="1"></el-option>
            <el-option label="考试" value="2"></el-option>
          </el-select>
        </el-form-item>
        </el-form-item>
        <el-form-item label="所属科目">
          <el-select v-model="examsearch.subject" placeholder="所属科目">
            <el-option label="java基础" value="0"></el-option>
            <el-option label="Java进阶" value="1"></el-option>
            <el-option label="java高级" value="2"></el-option>
            <el-option label="spring初级" value="3"></el-option>
            <el-option label="spring进阶" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="examsearch.grade" placeholder="年级">
            <el-option label="2019级" value="0"></el-option>
            <el-option label="2018级" value="1"></el-option>
            <el-option label="2017级" value="2"></el-option>
            <el-option label="2016级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="examsearch.cla" placeholder="班级">
            <el-option label="软件一班" value="0"></el-option>
            <el-option label="信科一班" value="1"></el-option>
            <el-option label="计科一班"" value="2"></el-option>
            <el-option label="软件二班" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-date-picker
          v-model="examsearch.startTime"
          type="datetime"
          placeholder="考试开始时间">
        </el-date-picker>
        <el-date-picker
          v-model="examsearch.endTime"
          type="datetime"
          placeholder="考试结束时间">
        </el-date-picker>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 考试列表 使用表格展示 -->
    <div style="border: 1px #ccc solid;">
      <el-table
      ref="singleTable"
      highlight-current-row
      @current-change="handleCurrentChange"
      border
      :data="examlist"
      style="width: 100%"
      height="550">
        <el-table-column
          fixed
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="ename"
          label="考试名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="type"
          label="试卷类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="subject"
          label="所属科目"
          width="120">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="年级"
          width="100">
        </el-table-column>
        <el-table-column
          prop="cla"
          label="年级"
          width="100">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="考试开始日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="考试结束日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="avaliableTime"
          label="考试时长"
          width="80">
        </el-table-column>
        <el-table-column
          prop="questionNum"
          label="试题总数"
          width="80">
        </el-table-column>
        <el-table-column
          prop="totalScore"
          label="总分"
          width="80">
        </el-table-column>
        <el-table-column
          prop="passScore"
          label="及格线"
          width="80">
        </el-table-column>
        <el-table-column
          prop="selectNum"
          label="选择题数量"
          width="80">
        </el-table-column>
        <el-table-column
          prop="blankNum"
          label="填空题数量"
          width="80">
        </el-table-column>
        <el-table-column
          prop="shortNum"
          label="简答题数量""
          width="80">
        </el-table-column>
        <el-table-column
          prop="proBlankNum"
          label="程序填空题数量"
          width="80">
        </el-table-column>
        <el-table-column
          prop="programNum"
          label="编程题数量"
          width="80">
        </el-table-column>
        <el-table-column
          prop="paperNum"
          label="生成试卷的数量""
          width="80">
        </el-table-column>
        <el-table-column
          prop="examedNum"
          label="已考人数"
          width="80">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加的时间"
          width="100">
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>


<script>
export default {
  name: "testsetting",
  data() {
    return {
     examsearch:{   //考试的搜索条件
       ename:'',   //考试的名称
       subject:'',  //考试所属的科目
       grade:'',   //年级
       cla:'',    //班级
       startTime:'',   //开始时间
       endTime:''  //结束时间
     },
     exam:{
      id:111,
      ename:'',   //考试名称
      type:'',   //试卷类型
      subject:'',  //考试所属科目
      grade:'',   //年级
      cla:'',  //班级
      startTime:'',  //考试开始日期
      endTime:'',    //考试结束日期
      avaliableTime:'',   //考试限制时间
      questionNum:0,    //考试试题总数
      totalScore:0,   //总分
      passScore:0,   //及格线
      selectNum:0,   //选择题数量
      blankNum:0,    //填空题数量
      shortNum: 0,   //简答题数量
      proBlankNum:0,   //程序填空题
      programNum:0,    //编程题数量
      paperNum: 0,   //生成试卷数量（每生成一张卷子就+1）
      examedNum:0,   //已考人数
      createTime:'2020-03-03  00:00:00'   //添加考试的时间
     },
     examlist:[ ]
    };
  },
  methods: {
    onSubmit(){
      console.log('查询考试');
    },
    addExam(){
      console.log('添加考试');
    },
    editExam(){
      console.log('修改考试');
    },
    deleteExam(){
      console.log('删除考试');
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  }
};
</script>

<style scoped>
.testsetting{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  /* height: 600px; */
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
