<template>
  <div class="marking">
    考生试卷库-试卷管理
    <el-divider></el-divider>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未阅试卷" name="first">
        <div style="text-align: center;">
          <el-table
            :data="unReadpapers.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
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
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
              </template>
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">改卷</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>


      <el-tab-pane label="已阅试卷" name="second">
        <div style="text-align: center;">
          <el-table
            :data="readedpapers.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
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
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
              </template>
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="lookpaper(scope.$index, scope.row)">查看试卷</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>


<script>
  import axios from "axios";
  export default {
    name: "marking",
    data() {
      return {
        activeName: 'first',
        unReadpapers: [],  //未阅试卷
        readedpapers: [],   //已阅试卷
        onepaper: {   
          subjectId: '2016-05-02',
          examName: '王小虎',
          examType: '上海市普陀区金沙江路 1518 弄',
          stuId:'111',
          generationTime:null,
        },
        search: '',
        examInfoid:null,
        examName:null,
        stuId:null,
      };
    },
    mounted() {
      this.getallpapers();
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getallpapers() {   //拿到试卷
        let that = this;
        axios.get("/examInfo/getAllExamInfo").then(res => {
          console.log(res.data);
          let papers = res.data;
          for (let i = 0; i < papers.length; i++) {
            if (papers[i].status == 1) {
              that.readedpapers.push(papers[i]);
            } else {
              that.unReadpapers.push(papers[i]);
            }
          };

          console.log(that.readedpapers);
        });
      },
      handleDelete(index, row) {
        console.log(index, row);
        //console.log(row.examInfoId);  当前的试卷id
        this.examInfoid = row.examInfoId
        this.examName = row.examName
        this.stuId = row.stuId;
        this.$router.push({
        name: "ExportPaper",
        query: { 
          examInfoId:this.examInfoid,
          examName:this.examName,
          stuId:this.stuId
        }
      });
      },
      // 查看 某个试卷
      lookpaper(index, row) {
        console.log(index, row);
        //console.log(row.examInfoId);  当前的试卷id
        this.examInfoid = row.examInfoId
        this.examName = row.examName
        this.stuId = row.stuId;
        this.$router.push({
        name: "LearnProgress",
        query: { 
          examInfoId:this.examInfoid,
          examName:this.examName,
          stuId:this.stuId
        }
      });
      },
    }
  };
</script>

<style scoped>
  .marking {
    margin: 20px auto;
    padding: 30px;
    background: white;
    width: 95%;
    /* height: 600px; */
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
</style>