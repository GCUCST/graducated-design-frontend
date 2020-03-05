<template>
  <div class="practice" v-loading="loading">
    <div>
      <div style="text-align:center" v-if="questions.length<1">老师未设置题库</div>
      <el-collapse accordion @change="handleChange">
        <div v-for="(item,index) in questions" :key="index">
          <!-- 选择题 -->
          <el-collapse-item v-if="item.questionType==0">
            <template slot="title">
              <p style="font-size:18px">{{index+1}}、 {{item.title}}</p>
            </template>
            <!-- 教师持有这个 -->
            <el-button
              @click="del(item.QuestionId)"
              v-if="role=='teacher'"
              style="float: right; padding: 3px 0"
              type="text"
            >删除</el-button>
            <el-checkbox-group v-model="checkList">
              <el-checkbox :label="'A、 '+item.attrA"></el-checkbox>
              <el-checkbox :label="' B、'+item.attrB"></el-checkbox>C、
              <el-checkbox :label="'C、'+item.attrC"></el-checkbox>D、
              <el-checkbox :label="'D、'+item.attrD"></el-checkbox>
            </el-checkbox-group>
            <div style="text-align:center">
              <br />
              <el-button @click="shwoAnswer(index)">查看答案</el-button>
              <br />
              <span v-show="showAnswerId==index">答案：{{item.answer}}</span>
            </div>
          </el-collapse-item>

          <!-- 简答题 -->
          <el-collapse-item v-if="item.questionType==2||item.questionType==4">
            <template slot="title">
              <p style="font-size:18px">{{index+1}}、 {{item.title}}</p>
            </template>
            <!-- 教师持有这个 -->
            <el-button
              @click="del(item.QuestionId)"
              v-if="role=='teacher'"
              style="float: right; padding: 3px 0"
              type="text"
            >删除</el-button>
            <el-input style="width:50%;margin:0 auto;" v-model="simpleAnswers" />
            <div style="text-align:center">
              <br />
              <br />
              <el-button @click="shwoAnswer(index)">查看答案</el-button>
              <br />
              <span v-show="showAnswerId==index">答案：{{item.answer}}</span>
            </div>
          </el-collapse-item>
          <!-- 填空 -->
          <el-collapse-item v-if="item.questionType==3||item.questionType==1">
            <template slot="title">
              <p style="font-size:18px">{{index+1}}、 {{item.title}}</p>
            </template>
            <!-- 教师持有这个 -->
            <el-button
              @click="del(item.QuestionId)"
              v-if="role=='teacher'"
              style="float: right; padding: 3px 0"
              type="text"
            >删除</el-button>
            <div style="display:flex;">
              <div v-for="(i,j) in item.answer" :key="j">
                {{j+1}}、
                <el-input v-model="blankList[j]" style="margin-right:50px;;width:100px;" />
              </div>
            </div>
            <div style="text-align:center">
              <br />
              <el-button @click="shwoAnswer(index)">查看答案</el-button>
              <br />
              <span v-show="showAnswerId==index">答案：{{item.answer}}</span>
            </div>
          </el-collapse-item>
        </div>
      </el-collapse>
      <!-- 教师持有这个 -->
      <div v-if="role=='teacher'" style="text-align:center;margin:50px;">
        <el-button @click="addQuestion()">添加题目</el-button>
        <el-button @click="save()">保存提交</el-button>
      </div>
    </div>

    <div class="panel" v-show="showQuestionsPanel">
      <div style="text-align:right">
        <el-button @click="showQuestionsPanel = !showQuestionsPanel" icon="el-icon-close" circle></el-button>
      </div>
      <el-table
        :data="allQuestions.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        max-height="450"
        style="width: 100%"
      >
        <el-table-column label="编号" prop="QuestionId"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="类型" prop="questionType"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import VueBus from "@/utils/VueBus.js";
import axios from "axios";
import UrlConfig from "../../config/UrlConfig.js";
export default {
  name: "VideoCourse",
  data() {
    return {
      role:  JSON.parse(localStorage.getItem("userInfo")).info.role,
      search: "",
      showAnswerId: null,
      loading: true,
      courseId: null,
      videoId: null,
      showQuestionsPanel: false,

      checkList: [],
      blankList: [],
      simpleAnswers: null,

      allQuestions: [
        {
          QuestionId: 1,
          questionType: 0,
          title: "下列需要虚拟机中执行代码的是？",
          score: 2,
          attrA: "Java代码",
          attrB: "c代码",
          attrC: "C++代码",
          attrD: "PHP代码",
          answer: ["PHP代码", "c代码"],
          desc: "这道题目考察Java的基本内容。"
        },
        {
          QuestionId: 3,
          questionType: 1,
          title: "java三大特性___ , ___ 和 ___。",
          score: 3,
          attrA: "",
          attrB: "",
          attrC: "",
          attrD: "",
          answer: ["封装", "继承", "多态"],
          desc: "这道题目考察Java的基本内容。"
        },
        {
          QuestionId: 2,
          questionType: "2",
          title: "包的作用是？",
          score: 5,
          attrA: null,
          attrB: null,
          attrC: null,
          attrD: null,
          answer: [
            "1、将功能相近的类放到同一个包中，可以方便查找和使用。2、在一定程度上避免命名冲突。"
          ],
          desc: "这道题考察包的作用。"
        }
      ],
      questions: []
     
    };
  },
  methods: {
    getQuestions() {
      console.log("getQuestion被调用。。");
      var parmas = new URLSearchParams();
      parmas.append("videoId", this.videoId);
      parmas.append("courseId", this.courseId);
      var that = this;
      axios
        .post("/comm/getPractice", parmas)
        .then(function(response) {
          if (response.data.object == null) {
            that.questions = [];
            return;
          } else if (response.data.object.questions) {
            that.questions = JSON.parse(response.data.object.questions);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    save() {
      var parmas = new URLSearchParams();
      parmas.append("videoId", this.videoId);
      parmas.append("courseId", this.courseId);
      parmas.append("questions", JSON.stringify(this.questions));

      var that = this;
      axios
        .post("/comm/addPractice", parmas)
        .then(function(response) {
          console.log(response);
          that.$message(
            "提交状态：" + (response.data.object == 1) ? "提交成功" : "提交失败"
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addQuestion() {
      this.showQuestionsPanel = true;
    },
    handleChange() {
      console.log("清空");
      this.checkList = [];
      this.blankList = [];
      this.simpleAnswers = null;
    },
    shwoAnswer(index) {
      if (this.showAnswerId == index) this.showAnswerId = null;
      // alert(this.questions[index].answer);
      else this.showAnswerId = index;
    },
    handleAdd(index, row) {
      console.log(index, row);
      var exist = false;
      this.questions.forEach(element => {
        if (element.QuestionId == row.QuestionId) {
          alert("已存在");
          exist = true;
        }
      });
      if (!exist) this.questions.push(row);
    },
    del(QuestionId) {
      this.questions.forEach((element, i) => {
        if (element.QuestionId == QuestionId) this.questions.splice(i, 1);
      });
    }
  },

  mounted() {
    this.courseId = this.$route.query.courseId;
    this.videoId = this.$route.query.videoId;
    this.loading = false;
    this.getQuestions();
    var that = this;
    VueBus.$on("reflash_practice", function(data) {
      that.videoId = data.videoId;
      that.courseId = data.courseId;
      that.getQuestions();
    });
  },
  updated() {
    this.courseId = this.$route.query.courseId;
    this.videoId = this.$route.query.videoId;
  },
  beforeDestroy() {
    VueBus.$off("reflash_practice");
  }
};
</script>

<style scoped>
.practice {
  min-height: 600px;
  margin: 0px auto;
  padding: 20px;
  width: 90%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.panel {
  text-align: left;
  height: 60%;
  width: 100%;
  min-height: 450px;
  position: initial;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 99;
  background: white;
}
</style>
