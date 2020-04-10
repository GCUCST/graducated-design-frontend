<template>
  <div class="errorset">
    历史考试-试卷管理
    <el-divider></el-divider>

    <!-- 使用 行内表单  设置 试卷 的搜索条件 -->
    <div style="padding-top: 20px;">
      <el-form :inline="true" :model="examSearch" class="demo-form-inline">
        <el-form-item label="考试名称">
          <el-input v-model="examSearch.ename" placeholder="考试名称"></el-input>
        </el-form-item>
        <el-form-item label="试卷类型">
          <el-select v-model="examSearch.type" placeholder="试卷类型">
            <el-option label="章节练习" value="0"></el-option>
            <el-option label="章节测试"" value="1"></el-option>
            <el-option label="考试" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试卷状态">
          <el-select v-model="examSearch.status" placeholder="试卷状态">
            <el-option label="全部" value="0"></el-option>
            <el-option label="已阅"" value="1"></el-option>
            <el-option label="未阅" value="2"></el-option>
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
          fixed="left"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="ename"
          label="考试名称"
          width="250">
        </el-table-column>
        <el-table-column
          prop="type"
          label="试卷类型"
          width="150">
        </el-table-column>
        <el-table-column
          prop="subject"
          label="所属科目"
          width="150">
        </el-table-column>
        <el-table-column
          prop="avaliableTime"
          label="考试时长"
          width="100">
        </el-table-column>
        <el-table-column
          prop="useTime"
          label="考试耗时"
          width="100">
        </el-table-column>
        <el-table-column
          prop="examTime"
          label="考试时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="getScore"
          label="试卷得分"
          width="100">
        </el-table-column>
        <el-table-column
          prop="totalScore"
          label="试卷总分"
          >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="primary" @click="routeJump('ChapterTest')" size="small">回看试卷</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="createTime"
          label="添加的时间"
          width="100">
        </el-table-column> -->
      </el-table>
    </div>

  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "errorset",
  data() {
    return{
      examSearch:{  
        ename:'',  //试卷名称
        subject:'',  //科目
        type:'',   //试卷类型
        status:'',  //试卷状态
      },
      paperlist:[    //试卷列表
        {
          ename:'java基础-期末考试',  //  试卷名称
          type:'期末考试',   //试卷类型
          status:'未批阅',  //试卷状态
          avaliableTime:'80',   //考试可用时长
          useTime:'50',    //考试耗时
          examTime:'2020-03-04 13:25:22 2020-03-04 13:26:30',   //考试时间
          subject:'java基础',   //考试所属科目
          getScore:95,   //试卷得分
          totalScore:100,   //试卷总分
        },
        {
          ename:'java进阶-期末考试',  //  试卷名称
          type:'期末考试',   //试卷类型
          status:'已批阅',  //试卷状态
          avaliableTime:'80',   //考试可用时长
          useTime:'70',    //考试耗时
          examTime:'2020-03-04 13:25:22 2020-03-04 13:26:30',   //考试时间
          subject:'java进阶',   //考试所属科目
          getScore:65,   //试卷得分
          totalScore:100,   //试卷总分
        },
        {
          ename:'spring基础-期末考试',  //  试卷名称
          type:'期末考试',   //试卷类型
          status:'已批阅',  //试卷状态
          avaliableTime:'80',   //考试可用时长
          useTime:'80',    //考试耗时
          examTime:'2020-03-04 13:25:22 2020-03-04 13:26:30',   //考试时间
          subject:'spring基础',   //考试所属科目
          getScore:75,   //试卷得分
          totalScore:100,   //试卷总分
        }
      ]
    };
  },
  methods: {
    onSubmit(){
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
      if (e == "ChapterTest")
        this.$router.push({ name: "ChapterTest" });
    }
  }
};
</script>

<style scoped>
.errorset{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  /* height: 600px; */
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
