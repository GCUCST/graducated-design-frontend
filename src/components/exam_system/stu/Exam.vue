<template>
  <div class="stuexam">
    我的考试-试卷管理
    <el-divider></el-divider>
    <!-- <router-link :to="{name:'StartExam'}">开始考试</router-link> -->

    <!-- 使用 行内表单  设置 试卷 的搜索条件 -->
    <div style="padding-top: 20px;">
      <el-form :inline="true" :model="examSearch" class="demo-form-inline">
        <el-form-item label="考试名称">
          <el-input v-model="examSearch.ename" placeholder="考试名称"></el-input>
        </el-form-item>
        <el-form-item label="试卷类型">
          <el-select v-model="examSearch.type" placeholder="试卷类型">
            <el-option label="章节练习" value="0"></el-option>
            <el-option label="章节测试"" value=" 1"></el-option>
            <el-option label="考试" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属科目">
          <el-select v-model="examSearch.subject" placeholder="试题类型">
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
    <h3>章节练习</h3>
    <div style="border: 1px #ccc solid;">
      <el-table ref="singleTable" highlight-current-row 
        @selection-change="selectionChangeChoice" border :data="practiceList"
        style="width: 100%" height="550">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column prop="practiceSetId" label="练习编号" width="100">
        </el-table-column>
        <el-table-column prop="practiceName" label="练习名称" width="350">
        </el-table-column>
        <el-table-column prop="subjectId" label="所属科目" width="150">
        </el-table-column>
        <el-table-column prop="startTime" label="练习开始时间" width="160">
        </el-table-column>
        <el-table-column prop="endTime" label="练习截止时间" width="160">
        </el-table-column>
        <el-table-column prop="needTime" label="练习时长" width="100">
        </el-table-column>
        
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="routeJump('ChapterPractice')"  type="primary" size="small">开始练习</el-button>
            <!-- <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>


    <h3>考试</h3>
    <div style="border: 1px #ccc solid;">
      <el-table ref="singleTable" highlight-current-row 
        @selection-change="selectionChangeChoice" border :data="exam"
        style="width: 100%" height="550">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column prop="examId" label="考试编号" width="100">
        </el-table-column>
        <el-table-column prop="examName" label="考试名称" width="350">
        </el-table-column>
        <el-table-column prop="subjectId" label="所属科目" width="150">
        </el-table-column>
        <el-table-column prop="examType" label="考试类型" width="150">
        </el-table-column>
        <el-table-column prop="startTime" label="考试开始时间" width="160">
        </el-table-column>
        <el-table-column prop="endTime" label="考试截止时间" width="160">
        </el-table-column>
        <el-table-column prop="needTime" label="考试时长" width="100">
        </el-table-column>
        
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="routeJump('ChapterPractice')"  type="primary" size="small">开始考试</el-button>
            <!-- <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>


<script>
  import axios from "axios";
  export default {
    name: "stuexam",
    data() {
      return {
        examSearch: {
          ename: '',  //试卷名称
          subject: '',  //科目
          type: '',   //试卷类型
          status: '',  //试卷状态
        },
        practiceList: [ ],  //章节练习设置信息
        exam:[ ],  //测试与考试设置信息
        practiceSetId:null,
      };
    },
    created () {
      this.getPractice();
      this.getExam();
    },
    methods: {
      getPractice(){
        let that = this;
        axios.get("/practiceSet/getAllPracticeSet").then(res => {
          console.log(res.data);
          that.practiceList = res.data;
        });
      },
      getExam(){
        let that = this;
        axios.get("/exam/getAllExam").then(res => {
          console.log(res.data);
          that.exam = res.data;
        });
      },
      selectionChangeChoice(selection){
        this.practiceSetId = null;
        console.log(selection);
        this.practiceSetId=selection[0].practiceSetId;
        console.log(this.quesid);
      },
      onSubmit() {
        console.log('搜索试卷');
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleClick(row) {
        console.log(row);
      },
      routeJump(e) {
      // console.log(e);
      if (e == "ChapterPractice")
        this.$router.push({ name: "ChapterPractice" });
      }
    }
  };
</script>

<style scoped>
  .stuexam {
    margin: 20px auto;
    padding: 30px;
    background: white;
    width: 95%;
    /* height: 600px; */
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
</style>