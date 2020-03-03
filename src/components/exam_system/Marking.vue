<template>
  <div class="marking">
    考生试卷库-试卷管理
    <el-divider></el-divider>

    <!-- 试卷的增删改查操作 -->
    <el-row>
      <el-button type="primary" plain @click="editPaper"><i class="el-icon-edit"></i>修改试卷</el-button>
      <el-button type="primary" plain @click="deletePaper"><i class="el-icon-remove"></i>删除试卷</el-button>
    </el-row>

    <!-- 使用 行内表单  设置 试卷 的搜索条件 -->
    <div style="padding-top: 20px;">
      <el-form :inline="true" :model="paperSearch" class="demo-form-inline">
        <el-form-item label="试卷名称">
          <el-input v-model="paperSearch.ename" placeholder="考试名称"></el-input>
        </el-form-item>
        <el-form-item label="试卷类型">
          <el-select v-model="paperSearch.type" placeholder="试卷类型">
            <el-option label="章节练习" value="0"></el-option>
            <el-option label="章节测试"" value="1"></el-option>
            <el-option label="考试" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试卷状态">
          <el-select v-model="paperSearch.status" placeholder="试卷状态">
            <el-option label="全部" value="0"></el-option>
            <el-option label="已阅"" value="1"></el-option>
            <el-option label="未阅" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考生姓名">
          <el-select v-model="paperSearch.type" placeholder="考生姓名">
            <el-option label="张三" value="0"></el-option>
            <el-option label="李四"" value="1"></el-option>
            <el-option label="王五" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="paperSearch.grade" placeholder="年级">
            <el-option label="2019级" value="0"></el-option>
            <el-option label="2018级" value="1"></el-option>
            <el-option label="2017级" value="2"></el-option>
            <el-option label="2016级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="paperSearch.cla" placeholder="班级">
            <el-option label="软件一班" value="0"></el-option>
            <el-option label="信科一班" value="1"></el-option>
            <el-option label="计科一班"" value="2"></el-option>
            <el-option label="软件二班" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属科目">
          <el-select v-model="paperSearch.subject" placeholder="试题类型">
            <el-option label="java基础" value="0"></el-option>
            <el-option label="Java进阶" value="1"></el-option>
            <el-option label="java高级" value="2"></el-option>
            <el-option label="spring初级" value="3"></el-option>
            <el-option label="spring进阶" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>


    <!-- 试卷列表 使用表格展示 -->
    <div style="border: 1px #ccc solid;">
      <el-table
      ref="singleTable"
      highlight-current-row
      @current-change="handleCurrentChange"
      border
      :data="paperlist"
      style="width: 100%"
      height="550">
        <el-table-column
          fixed
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="ename"
          label="试卷名称"
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
          label="班级"
          width="100">
        </el-table-column>
        <el-table-column
          prop="starExamtTime"
          label="开始考试时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="endExamTime"
          label="结束考试时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="useTime"
          label="考试时长"
          width="80">
        </el-table-column>
        <el-table-column
          prop="totalScore"
          label="试卷总分"
          width="80">
        </el-table-column>
        <el-table-column
          prop="getScore"
          label="试卷得分"
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
  name: "marking",
  data() {
    return {
      paperSearch:{   //试卷的搜索条件
       ename:'',   //所属考试
       subject:'',  //所属科目
       student:'',  //所属考生
       status:'',   //试卷状态
       type:'',  //试卷类型
       grade:'',   //年级
       cla:'',   //班级
      },
      paperlist:   //试卷例子
      [
        {   
          id:121,
          ename:'java进阶章节测试-第一章',   //所属考试
          type:'章节测试',   //试卷类型
          subject:'java进阶',  //考试所属科目
          grade:'2017级',   //年级
          cla:'软件一班',    //班级
          status:'已考',  //试卷状态
          startExamTime:'2020-03-03 09:30:01',  //开始考试时间
          endExamTime:'2020-03-03 10:20:20',    //结束考试时间
          useTime:'50',   //考试用时
          totalScore:100,   //试卷总分
          getScore:60,   //试卷得分
          createTime:'2020-03-03  10:20:20'   //添加考试的时间(与考试结束时间一致)
        },
      ]
    };
  },
  methods: {
    onSubmit(){
      console.log('搜索试卷');
    },
    editPaper(){
      console.log('修改试卷');
    },
    deletePaper(){
      console.log('删除试卷');
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  }
};
</script>

<style scoped>
.marking{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  /* height: 600px; */
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
