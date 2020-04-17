<template>
  <div class="errorset">
    历史考试-试卷管理
    <el-divider></el-divider>

    <!-- 使用 行内表单  设置 试卷 的搜索条件 -->
    <!-- <div style="padding-top: 20px;">
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
    </div> -->


    <!-- 试卷列表 使用表格展示 -->
    <div style="border: 1px #ccc solid;">
      <div style="text-align: center;">
        <el-table
          :data="paperlist.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%;height: 550px;">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column label="课程" prop="subjectId">
          </el-table-column>
          <el-table-column label="试卷名称" prop="examName">
          </el-table-column>
          <el-table-column label="考试类型" prop="examType">
          </el-table-column>
          <el-table-column label="学号" prop="stuId">
          </el-table-column>
          <el-table-column label="考试时间" prop="generationTime">
          </el-table-column>
          <el-table-column align="right">
            <!-- <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template> -->
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="lookpaper(scope.$index, scope.row)">回看试卷</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      ],
      stuId:'',  //当前学生
      search:'',
    };
  },
  mounted () {
    this.loadComments();
    this.getallpapers();
  },
  methods: {
    getallpapers() {   //拿到试卷
        let that = this;
        axios.get("/examInfo/getAllExamInfo").then(res => {
          console.log(res.data);
          let papers = res.data;
          for (let i = 0; i < papers.length; i++) {
            if (papers[i].stuId == that.stuId) {   //只拿当前学生的试卷
              that.paperlist.push(papers[i]);
            } 
          };

          console.log(that.paperlist);
        });
      },
      loadComments() {   //拿到当前用户的信息
        let that = this;
        //localStorage.getItem("userInfo");
        var list = JSON.parse(localStorage.getItem("userInfo"));
        that.local = list;
         console.log("localstorage******");
         that.stuId = that.local.account;
        console.log("学号"+that.stuId);
       },
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
    },

    //回看某个试卷
    lookpaper(index, row) {
        console.log(index, row);
        //console.log(row.examInfoId);  当前的试卷id
        this.examInfoid = row.examInfoId
        this.examName = row.examName
        this.stuId = row.stuId;
        // this.$router.push({
        // name: "LearnProgress",
        // query: { 
        //   examInfoId:this.examInfoid,
        //   examName:this.examName,
        //   stuId:this.stuId
        // }
        // });
      },
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
