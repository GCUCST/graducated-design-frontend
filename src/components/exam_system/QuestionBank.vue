<template>
  <div class="question">
    <el-row>
      <el-button type="primary"  @click="dialogFormVisible=true">添加试题</el-button>
      <el-button type="success"  @click="">导入试题</el-button>
    </el-row>
    <el-divider></el-divider>

    <!-- 新增试题的对话框 -->
    <el-dialog title="添加试题" :visible.sync="dialogFormVisible">
      <el-form style="padding-right: 30px;padding-top: 20px;" ref="form" :model="question" label-width="90px">
        <el-form-item label="题目"">
        <el-input v-model=" question.title" placeholder="请输入题目">
          </el-input>
        </el-form-item>

        <el-form-item label="知识点"">
          <el-input v-model=" question.knowledgePoint" placeholder="请输入知识点">
            </el-input>
          </el-form-item>

        
        <!-- <el-form-item label="科目" placeholder="请选择">
          <el-select v-model="question.subject" placeholder="请选择">
            <el-option v-for="item in subjs" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="章节" placeholder="请选择">
          <el-select v-model="question.chapter" placeholder="请选择">
            <el-option v-for="item in chapters" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="科目"">
          <el-input v-model=" question.subjectId" placeholder="科目">
            </el-input>
          </el-form-item>

          <el-form-item label="章节"">
            <el-input v-model=" question.chapter" placeholder="章节">
              </el-input>
            </el-form-item>



        <el-form-item label="题型">
          <el-radio-group v-model="question.type">
            <el-radio :label="1">选择题</el-radio>
            <el-radio :label="2">填空题</el-radio>
            <el-radio :label="3">简单题</el-radio>
            <el-radio :label="4">程序填空题</el-radio>
            <el-radio :label="5">编程题</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 如果是选择题，则有选项 -->
        <el-form-item label="选项" v-if="question.type===1 ">
          <div>A:<input type="text" v-model="question.attrA" /></div>
          <div>B:<input type="text" v-model="question.attrB" /></div>
          <div>C:<input type="text" v-model="question.attrC" /></div>
          <div>D:<input type="text" v-model="question.attrD" /></div>
        </el-form-item>

        <!-- 显示答案 -->
        <!-- <h2>{{question.answer}}</h2> -->

        <el-form-item label="答案" style="width:500px;">
          <el-input type=" textarea" :rows="6" placeholder="请输入答案" v-model="question.answer">
          </el-input>
        </el-form-item>

        <!-- 解析 -->
        <el-form-item label="解析" style="width:500px;">
          <el-input type=" textarea" :rows="6" placeholder="请输入题目解析" v-model="question.description">
          </el-input>
        </el-form-item>

        <!-- 添加题的教师 -->
        <!-- <el-form-item label="添加教师" style="width:500px;">
          <el-input v-model=" question.creTeacher">
          </el-input>
        </el-form-item> -->

        <!-- 添加题的时间 -->
        <!-- <el-form-item label="添加时间" style="width:500px;">
          <el-input v-model=" question.createTime">
          </el-input>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addQuestion()">确 定</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>


    <!-- 试题的增删改查操作 -->
    <!-- <el-row>
      <el-button type="primary" plain @click="dialogFormVisible = true"><i class="el-icon-circle-plus"></i>添加试题
      </el-button> -->
      <!-- <router-link to="name='AddQuestion'"><el-button type="primary" plain><i class="el-icon-circle-plus"></i>添加试题</el-button></router-link> -->
      <!-- <el-button type="primary" plain @click="editQuestion"><i class="el-icon-edit"></i>修改试题</el-button>
      <el-button type="primary" plain @click="deleteQuestion"><i class="el-icon-remove"></i>删除试题</el-button> -->
      <!-- <el-button type="primary" plain @click="importQuestion"><i class="el-icon-document"></i>导入试题</el-button> -->
      <!-- <el-upload style="padding-top: 10px;width:300px;" class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove"
        :before-remove="beforeRemove" multiple :limit="1" :file-list="fileList">
        <el-button plain type="primary">导入试题</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls,xlsx格式的文件，且不超过5M</div>
      </el-upload>
    </el-row> -->
    <!-- 使用 行内表单  设置试题的搜索条件 -->
    <!-- <div style="padding-top: 20px;">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="题目">
          <el-input v-model="formSearch.title" placeholder="题目"></el-input>
        </el-form-item>
        <el-form-item label="知识点">
          <el-input v-model="formSearch.knowledgePoint" placeholder="知识点"></el-input>
        </el-form-item>
        <el-form-item label="所属科目">
          <el-select v-model="formSearch.subject" placeholder="试题类型">
            <el-option label="java基础" value="0"></el-option>
            <el-option label="Java进阶" value="1"></el-option>
            <el-option label="java高级" value="2"></el-option>
            <el-option label="spring初级" value="3"></el-option>
            <el-option label="spring进阶" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属章节">
          <el-select v-model="formSearch.chapter" placeholder="试题类型">
            <el-option label="第一章" value="0"></el-option>
            <el-option label="第二章" value="1"></el-option>
            <el-option label="第三章" value="2"></el-option>
            <el-option label="第四章" value="3"></el-option>
            <el-option label="第五章" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div> -->

    <!-- 试题列表 使用表格展示 -->
    <h3>选择题</h3>
    <div style="border: 1px #ccc solid;">
      <el-table ref="singleTable" highlight-current-row 
      @selection-change="selectionChangeChoice" border
        :data="questionlist" style="width: 100%" height="550">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <!-- <el-table-column prop="choiceId" label="试题编号" width="100">
        </el-table-column> -->
        <el-table-column prop="subjectId" label="科目编号" width="100">
        </el-table-column>
        <el-table-column prop="chapter" label="章节" width="120">
        </el-table-column>
        <el-table-column prop="knowledgePoint" label="知识点" width="100">
        </el-table-column>
        <el-table-column prop="title" label="题目" width="200">
        </el-table-column>
        <el-table-column prop="attrA" label="选项A" width="100">
        </el-table-column>
        <el-table-column prop="attrB" label="选项B" width="100">
        </el-table-column>
        <el-table-column prop="attrC" label="选项C" width="100">
        </el-table-column>
        <el-table-column prop="attrD" label="选项D" width="100">
        </el-table-column>
        <el-table-column prop="answer" label="答案" width="80">
        </el-table-column>
        <el-table-column prop="description" label="解析" width="120">
        </el-table-column>
        <el-table-column prop="createTeacher" label="添加教师" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="120">
        </el-table-column>
      </el-table>
    </div>

    <h3>填空题</h3>
    <div style="border: 1px #ccc solid;">
      <el-table ref="singleTable" highlight-current-row 
      @selection-change="selectionChangeBlank" border :data="blanklist"
        style="width: 100%" height="550">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <!-- <el-table-column prop="blankQuesId" label="试题编号" width="100">
        </el-table-column> -->
        <el-table-column prop="subjectId" label="科目编号" width="100">
        </el-table-column>
        <el-table-column prop="chapter" label="章节" width="120">
        </el-table-column>
        <el-table-column prop="knowledgePoint" label="知识点" width="100">
        </el-table-column>
        <el-table-column prop="title" label="题目" width="350">
        </el-table-column>
        <el-table-column prop="answer" label="答案" width="100">
        </el-table-column>
        <el-table-column prop="description" label="解析" width="120">
        </el-table-column>
        <el-table-column prop="createTeacher" label="添加教师" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="120">
        </el-table-column>
      </el-table>
    </div>

    <h3>简答题</h3>
    <div style="border: 1px #ccc solid;">
      <el-table ref="singleTable" highlight-current-row 
      @selection-change="selectionChangeShort" border :data="shortlist"
        style="width: 100%" height="550">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <!-- <el-table-column prop="shortQuesId" label="试题编号" width="100">
        </el-table-column> -->
        <el-table-column prop="subjectId" label="科目编号" width="100">
        </el-table-column>
        <el-table-column prop="chapter" label="章节" width="120">
        </el-table-column>
        <el-table-column prop="knowledgePoint" label="知识点" width="100">
        </el-table-column>
        <el-table-column prop="title" label="题目" width="350">
        </el-table-column>
        <el-table-column prop="answer" label="答案" width="350">
        </el-table-column>
        <el-table-column prop="description" label="解析" width="120">
        </el-table-column>
        <el-table-column prop="createTeacher" label="添加教师" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="120">
        </el-table-column>
      </el-table>
    </div>

    <h3>程序填空题</h3>
    <div style="border: 1px #ccc solid;">
      <el-table ref="singleTable" highlight-current-row 
        @selection-change="selectionChangeProBlank" border
        :data="proBlanklist" style="width: 100%" height="550">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <!-- <el-table-column prop="proBlankId" label="试题编号" width="100">
        </el-table-column> -->
        <el-table-column prop="subjectId" label="科目编号" width="100">
        </el-table-column>
        <el-table-column prop="chapter" label="章节" width="120">
        </el-table-column>
        <el-table-column prop="knowledgePoint" label="知识点" width="100">
        </el-table-column>
        <el-table-column prop="title" label="题目" width="350">
        </el-table-column>
        <el-table-column prop="answer" label="答案" width="350">
        </el-table-column>
        <el-table-column prop="description" label="解析" width="120">
        </el-table-column>
        <el-table-column prop="createTeacher" label="添加教师" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="120">
        </el-table-column>
      </el-table>
    </div>

    <h3>编程题</h3>
    <div style="border: 1px #ccc solid;">
      <el-table ref="singleTable" highlight-current-row 
        @selection-change="selectionChangeProgram" border :data="programlist"
        style="width: 100%" height="550">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <!-- <el-table-column prop="programId" label="试题编号" width="100">
        </el-table-column> -->
        <el-table-column prop="subjectId" label="科目编号" width="100">
        </el-table-column>
        <el-table-column prop="chapter" label="章节" width="120">
        </el-table-column>
        <el-table-column prop="knowledgePoint" label="知识点" width="100">
        </el-table-column>
        <el-table-column prop="title" label="题目" width="350">
        </el-table-column>
        <el-table-column prop="answer" label="答案" width="350">
        </el-table-column>
        <el-table-column prop="description" label="解析" width="120">
        </el-table-column>
        <el-table-column prop="createTeacher" label="添加教师" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="120">
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>


<script>
  import axios from "axios";
  export default {
    name: "question",
    data() {
      return {
        msg: "试题库",
        
        subjs: [{
          value: 'java基础',
          label: 'java基础'
        }, {
          value: 'java进阶',
          label: 'java进阶'
        }, {
          value: '选项3',
          label: 'java高级'
        }, {
          value: '选项4',
          label: 'Linux'
        }],
        chapters: [{
          value: '第一章',
          label: '第一章'
        }, {
          value: '第二章',
          label: '第二章'
        }, {
          value: '选项3',
          label: '第三章'
        }, {
          value: '选项4',
          label: '第四章'
        }],
        question: {   //新增的试题数据
          subjectId: '',  //科目
          knowledgePoint: '',  //知识点
          chapter: '',  //章节
          type: 0,  //题型
          title: '',  //题目
          attrA: '',  //选项
          attrB: '',
          attrC: '',
          attrD: '',
          answer: '',   //答案
          description: '',   //解析
          createTeacher: '',   //添加题的教师
          createTime: ''   //添加题的时间
        },
        dialogFormVisible: false,
        fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
        formSearch: {    //试题的搜索条件
          title: '',  //试题题目
          knowledgePoint: '',   //创建教师
          subject: '',   //所属科目  
          chapter: '',   //所属章节
        },
        questionlist: [],  //试题例子
        blanklist: [],  //填空题
        shortlist: [],  //简答题
        proBlanklist: [],  //程序填空题
        programlist: [], //编程题
        currentRow: null,   //当前选中的下标
        quesid:null,
        local:null,  //当前用户的laocalstorage 信息
        teaName:'', //当前教师的姓名
      };
    },
    created() {
      this.getData();
      this.loadComments();
    },
    methods: {
      loadComments() {   //拿到当前用户的信息
        let that = this;
        //localStorage.getItem("userInfo");
      var list = JSON.parse(localStorage.getItem("userInfo"));
      that.local = list;
      console.log("localstorage******");
      that.teaName = that.local.info.name;
      console.log(that.teaName);
    },
      getData() {
        let that = this;
        axios.get("/choice/getAllChoice").then(res => {
          console.log(res.data);
          that.questionlist = res.data;
        });
        //填空题
        axios.get("/blankQues/getAllBlankQues").then(res => {
          console.log(res.data);
          that.blanklist = res.data;
        });
        //简答题
        axios.get("/shortQues/getAllShortQues").then(res => {
          that.shortlist = res.data;
        });
        //程序填空题
        axios.get("/proBlank/getAllProBlank").then(res => {
          that.proBlanklist = res.data;
        });
        //编程题
        axios.get("/program/getAllProgram").then(res => {
          that.programlist = res.data;
        });
      },
      addQuestion(){
        let that = this;
        console.log('添加试题');
        let qtype = that.question.type;
        var params = new URLSearchParams();
        if(qtype == 1){   //如果是添加选择题
          params.append("subjectId",that.question.subjectId);
          params.append("chapter",that.question.chapter);
          params.append("knowledgePoint",that.question.knowledgePoint);
          params.append("title",that.question.title);
          params.append("attrA",that.question.attrA);
          params.append("attrB",that.question.attrB);
          params.append("attrC",that.question.attrC);
          params.append("attrD",that.question.attrD);
          params.append("answer",that.question.answer);
          params.append("description",that.question.description);
          params.append("createTime",(new Date()).toString());
          params.append("createTeacher",that.teaName);
          axios
          .post("/choice/addChoice", params)
          .then(function (response) {
            console.log(response);
            that.dialogFormVisible = false;
            if (response.data == 1) {
              that.questionlist.push(that.question);
              that.$message({
                message: "添加成功。",
                type: "success"
              });
            } else {
              that.$message.error("插入失败。");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        //如果是填空题
        if(qtype == 2){   
          console.log("进入到添加填空题的步骤********");
          params.append("subjectId",that.question.subjectId);
          params.append("chapter",that.question.chapter);
          params.append("knowledgePoint",that.question.knowledgePoint);
          params.append("title",that.question.title);
          params.append("answer",that.question.answer);
          params.append("description",that.question.description);
          params.append("createTime",(new Date()).toString());
          params.append("createTeacher",that.teaName);
          axios
          .post("/blankQues/addBlankQues", params)
          .then(function (response) {
            console.log(response);
            that.dialogFormVisible = false;
            if (response.data == 1) {
              that.blanklist.push(that.question);
              that.$message({
                message: "添加成功。",
                type: "success"
              });
            } else {
              that.$message.error("插入失败。");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        //如果是简答题
        if(qtype == 3){   
          params.append("subjectId",that.question.subjectId);
          params.append("chapter",that.question.chapter);
          params.append("knowledgePoint",that.question.knowledgePoint);
          params.append("title",that.question.title);
          params.append("answer",that.question.answer);
          params.append("description",that.question.description);
          params.append("createTime",(new Date()).toString());
          params.append("createTeacher",that.teaName);
          axios
          .post("/shortQues/addShortQues", params)
          .then(function (response) {
            console.log(response);
            that.dialogFormVisible = false;
            if (response.data == 1) {
              that.shortlist.push(that.question);
              that.$message({
                message: "添加成功。",
                type: "success"
              });
            } else {
              that.$message.error("插入失败。");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        //如果是程序填空题
        if(qtype == 4){   
          params.append("subjectId",that.question.subjectId);
          params.append("chapter",that.question.chapter);
          params.append("knowledgePoint",that.question.knowledgePoint);
          params.append("title",that.question.title);
          params.append("answer",that.question.answer);
          params.append("description",that.question.description);
          params.append("createTime",(new Date()).toString());
          params.append("createTeacher",that.teaName);
          axios
          .post("/proBlank/addProBlank", params)
          .then(function (response) {
            console.log(response);
            that.dialogFormVisible = false;
            if (response.data == 1) {
              that.proBlanklist.push(that.question);
              that.$message({
                message: "添加成功。",
                type: "success"
              });
            } else {
              that.$message.error("插入失败。");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        //如果是编程题
        if(qtype == 5){   
          params.append("subjectId",that.question.subjectId);
          params.append("chapter",that.question.chapter);
          params.append("knowledgePoint",that.question.knowledgePoint);
          params.append("title",that.question.title);
          params.append("answer",that.question.answer);
          params.append("description",that.question.description);
          params.append("createTime",(new Date()).toString());
          params.append("createTeacher",that.teaName);
          axios
          .post("/program/addProgram", params)
          .then(function (response) {
            console.log(response);
            that.dialogFormVisible = false;
            if (response.data == 1) {
              that.programlist.push(that.question);
              that.$message({
                message: "添加成功。",
                type: "success"
              });
            } else {
              that.$message.error("插入失败。");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      },
      editQuestion() {
        console.log('修改试题');
      },
      deleteQuestion() {
        let that=this;
        console.log('删除试题');
        axios.post("/choice/deleteChoice?choiceId="+ that.quesid).then(res=>{
          console.log(res);
          if(res.data==1){
            //重新获取题目
            that.getData();
          }
        })
      },
      importQuestion() {
        console.log('导入试题');
      },
      onSubmit() {
        console.log("搜索");
      },
      selectionChangeChoice(selection){
        //在这个方法中拿到 题目的id
        this.quesid = null;
        console.log(selection);
        this.quesid=selection[0].choiceId;
        console.log(this.quesid);
      },
      selectionChangeBlank(selection){
        //在这个方法中拿到 题目的id
        this.quesid = null;
        console.log(selection);
        this.quesid=selection[0].blankQuesId;
        console.log(this.quesid);
      },
      selectionChangeShort(selection){
        //在这个方法中拿到 题目的id
        this.quesid = null;
        console.log(selection);
        this.quesid=selection[0].shortQuesId;
        console.log(this.quesid);
      },
      selectionChangeProBlank(selection){
        //在这个方法中拿到 题目的id
        this.quesid = null;
        console.log(selection);
        this.quesid=selection[0].proBlankId;
        console.log(this.quesid);
      },
      selectionChangeProgram(selection){
        //在这个方法中拿到 题目的id
        this.quesid = null;
        console.log(selection);
        this.quesid=selection[0].programId;
        console.log(this.quesid);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
        console.log(this.currentRow);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
    }
  };
</script>

<style scoped>
  .question {
    margin: 20px auto;
    padding: 30px;
    background: white;
    width: 95%;
    /* height: 600px; */
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
</style>