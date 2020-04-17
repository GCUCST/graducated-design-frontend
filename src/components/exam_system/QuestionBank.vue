<template>
  <div class="question">
    <el-row>
      <el-button type="primary" @click="dialogFormVisible=true">添加试题</el-button>
      <el-button type="success" @click="impdia=true">导入试题</el-button>
    </el-row>
    <el-divider></el-divider>


    <!-- 导入试题的对话框 -->
    <el-dialog title="导入选择题" :visible.sync="impdia" width="80%">
      <el-form style="padding-right: 30px;padding-top: 20px;" ref="form" :model="question" label-width="90px">

        <el-button style size="mini" @click="selFile()" type="primary">{{fileName}}</el-button>

          <el-button @click="parseChoiceJson()" size="mini" type="primary">解析</el-button>

          <input style="opacity: 0;
    width: 0px;" @change="updateFile()" type="file" id="file" />

          <el-table
            :data="batchChoice.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            tooltip-effect="dark"
            height="450"
          >
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="科目" prop="subjectId">
            </el-table-column>
            <el-table-column label="章节" prop="chapter">
            </el-table-column>
            <el-table-column label="知识点" prop="knowledgePoint">
            </el-table-column>
            <el-table-column label="题目" prop="title">
            </el-table-column>
            <el-table-column label="选项A" prop="attrA">
            </el-table-column>
            <el-table-column label="选项B" prop="attrB">
            </el-table-column>
            <el-table-column label="选项C" prop="attrC">
            </el-table-column>
            <el-table-column label="选项D" prop="attrD">
            </el-table-column>
            <el-table-column label="答案" prop="answer">
            </el-table-column>
            <el-table-column label="题目解析" prop="description">
            </el-table-column>
            <el-table-column width="180" label="操作">
              <!-- eslint-disable-next-line -->
              <!-- <template slot="header" slot-scope="scope">
                <el-input @click="fun(scope.$index)" v-model="search" placeholder="输入姓名搜索" />
              </template> -->
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="remove(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = false" style="margin-left: 350px;">取 消</el-button>
          <el-button type="primary" @click="batchChoiceAdd()" style="margin-left: 200px;">确定导入</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

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

        <el-form-item >
          <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addQuestion()" >确 定</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

    <!-- 修改 选择题  -->
    <div v-show="addchop" style="
    text-align: center;
    top:50px;
width: 80%;
box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
border-radius: 5px;
margin: 0 auto;
background: white;
z-index: 999;
position:fixed;
overflow: auto;
height:650px;
/* padding: 20px; */
  ">
      <div style="text-align:right;position: fixed;right: 12%;">
        <el-button @click=" addchop=!addchop " circle>X</el-button>
      </div>
      <h4 style="text-align: center;">编辑选择题</h4>
      <div style="margin: 0px auto;">
        <el-form style="padding-right: 30px;padding-top: 20px; width: 60%;" ref="form" :model="newChoice"
          label-width="300px">
          <el-form-item label="科目"">
           <el-input v-model=" newChoice.subjectId" placeholder="科目">
            </el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="comfirmcho()">确 定</el-button>
          </el-form-item>

        </el-form>
      </div>

    </div>


   

    <!-- 试题列表 使用表格展示 -->
    <h3>选择题</h3>
    <div style="border: 1px #ccc solid;">
      <el-table :data="questionlist.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%" height="550">
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
        <el-table-column width="180" label="操作">
          <!-- eslint-disable-next-line -->
          <!-- <template slot="header" slot-scope="scope">
            <el-input @click="fun(scope.$index)" v-model="search" placeholder="输入姓名搜索" />
          </template> -->

          <template slot-scope="scope">
            <el-button size="mini" @click="editCho(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delcho(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <h3>填空题</h3>
    <div style="border: 1px #ccc solid;">
      <el-table ref="singleTable" highlight-current-row @selection-change="selectionChangeBlank" border
        :data="blanklist" style="width: 100%" height="550">
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
      <el-table ref="singleTable" highlight-current-row @selection-change="selectionChangeShort" border
        :data="shortlist" style="width: 100%" height="550">
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
      <el-table ref="singleTable" highlight-current-row @selection-change="selectionChangeProBlank" border
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
      <el-table ref="singleTable" highlight-current-row @selection-change="selectionChangeProgram" border
        :data="programlist" style="width: 100%" height="550">
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
        search:'',
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
        formSearch: {    //试题的搜索条件
          title: '',  //试题题目
          knowledgePoint: '',   //创建教师
          subject: '',   //所属科目  
          chapter: '',   //所属章节
        },
        addchop:false,   // 编辑选择题
        oldChoice:{   //旧的选择题，编辑时使用
          choiceId:null,
          subjectId: '',  //科目
          knowledgePoint: '',  //知识点
          chapter: '',  //章节
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
        newChoice:{   // 新的选择题，编辑时使用
          choiceId:null,
          subjectId: null,  //科目
          knowledgePoint: null,  //知识点
          chapter: null,  //章节
          title: null,  //题目
          attrA: null,  //选项
          attrB: null,
          attrC:null,
          attrD: null,
          answer: null,   //答案
          description: null,   //解析
          createTeacher: null,   //添加题的教师
          createTime: null   //添加题的时间
        },
        questionlist: [],  //试题例子
        blanklist: [],  //填空题
        shortlist: [],  //简答题
        proBlanklist: [],  //程序填空题
        programlist: [], //编程题
        currentRow: null,   //当前选中的下标
        quesid: null,
        local: null,  //当前用户的laocalstorage 信息
        teaName: '', //当前教师的姓名
        // uploadLoading: false,   //导入
        // file: null,
        impdia: false,  
        file: {},
        fileName: "选择",
        batchChoice: [],
        
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
      //导入
      // handleFormatError(file) {
      //   this.$Notice.warning({
      //     title: '文件格式不正确',
      //     desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
      //   })
      // },
      // handleSuccess(res, file) {
      //   this.$Message.success("数据导入成功！")
      //   //提示完渲染页面
      //   this.getTreeData(1)
      // },
      // handleError(error, file) {
      //   this.$Message.error("数据导入失败！")
      // },
      addQuestion() {
        let that = this;
        console.log('添加试题');
        let qtype = that.question.type;
        var params = new URLSearchParams();
        if (qtype == 1) {   //如果是添加选择题
          params.append("subjectId", that.question.subjectId);
          params.append("chapter", that.question.chapter);
          params.append("knowledgePoint", that.question.knowledgePoint);
          params.append("title", that.question.title);
          params.append("attrA", that.question.attrA);
          params.append("attrB", that.question.attrB);
          params.append("attrC", that.question.attrC);
          params.append("attrD", that.question.attrD);
          params.append("answer", that.question.answer);
          params.append("description", that.question.description);
          params.append("createTime", (new Date()).toString());
          params.append("createTeacher", that.teaName);
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
        if (qtype == 2) {
          console.log("进入到添加填空题的步骤********");
          params.append("subjectId", that.question.subjectId);
          params.append("chapter", that.question.chapter);
          params.append("knowledgePoint", that.question.knowledgePoint);
          params.append("title", that.question.title);
          params.append("answer", that.question.answer);
          params.append("description", that.question.description);
          params.append("createTime", (new Date()).toString());
          params.append("createTeacher", that.teaName);
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
        if (qtype == 3) {
          params.append("subjectId", that.question.subjectId);
          params.append("chapter", that.question.chapter);
          params.append("knowledgePoint", that.question.knowledgePoint);
          params.append("title", that.question.title);
          params.append("answer", that.question.answer);
          params.append("description", that.question.description);
          params.append("createTime", (new Date()).toString());
          params.append("createTeacher", that.teaName);
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
        if (qtype == 4) {
          params.append("subjectId", that.question.subjectId);
          params.append("chapter", that.question.chapter);
          params.append("knowledgePoint", that.question.knowledgePoint);
          params.append("title", that.question.title);
          params.append("answer", that.question.answer);
          params.append("description", that.question.description);
          params.append("createTime", (new Date()).toString());
          params.append("createTeacher", that.teaName);
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
        if (qtype == 5) {
          params.append("subjectId", that.question.subjectId);
          params.append("chapter", that.question.chapter);
          params.append("knowledgePoint", that.question.knowledgePoint);
          params.append("title", that.question.title);
          params.append("answer", that.question.answer);
          params.append("description", that.question.description);
          params.append("createTime", (new Date()).toString());
          params.append("createTeacher", that.teaName);
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
        let that = this;
        console.log('删除试题');
        axios.post("/choice/deleteChoice?choiceId=" + that.quesid).then(res => {
          console.log(res);
          if (res.data == 1) {
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
      selectionChangeChoice(selection) {
        //在这个方法中拿到 题目的id
        this.quesid = null;
        console.log(selection);
        this.quesid = selection[0].choiceId;
        console.log(this.quesid);
      },
      selectionChangeBlank(selection) {
        //在这个方法中拿到 题目的id
        this.quesid = null;
        console.log(selection);
        this.quesid = selection[0].blankQuesId;
        console.log(this.quesid);
      },
      selectionChangeShort(selection) {
        //在这个方法中拿到 题目的id
        this.quesid = null;
        console.log(selection);
        this.quesid = selection[0].shortQuesId;
        console.log(this.quesid);
      },
      selectionChangeProBlank(selection) {
        //在这个方法中拿到 题目的id
        this.quesid = null;
        console.log(selection);
        this.quesid = selection[0].proBlankId;
        console.log(this.quesid);
      },
      selectionChangeProgram(selection) {
        //在这个方法中拿到 题目的id
        this.quesid = null;
        console.log(selection);
        this.quesid = selection[0].programId;
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

      remove(index, row) {
      var params = new URLSearchParams();
      // params.append("stuId", row.stuId);

      var that = this;
      this.$confirm("取消新增该试题？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.batchChoice.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
      updateFile() {
      var that = this;
      var obj = document.getElementById("file").files;
      if (obj.length == 0) {
        this.fileName = "选择";
        return;
      }
      var f = obj[0];
      if (f != null) {
        this.file = f;
      }
      console.log(this.file.name);
      this.fileName = this.file.name;
    },

      //选择文件
      selFile() {
        document.getElementById("file").click();
      },
      //解析excel
      parseChoiceJson() {
      var that = this;
      var obj = document.getElementById("file").files;
      var wb;
      if (obj.length == 0) {
        this.$message.error("请选择xls文件");
        return;
      }
      var extension = obj[0].name.substring(obj[0].name.lastIndexOf(".") + 1);
      console.log(extension);
      if (
        extension != "xls" &&
        extension != "XLS" &&
        extension != "xlsx" &&
        extension != "XLSX"
      ) {
        this.$message.error("请选择xls文件");
        return;
      }

      var f = obj[0];
      //新建文件读取
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        //将文件读取为二进制字符串
        wb = XLSX.read(data, { type: "binary" });
        // alert(wb.SheetNames[0]);
        // wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        // wb.Sheets[Sheet名]获取第一个Sheet的数据
        var valiData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        console.log(valiData[0]);
        if (
          valiData.length > 0 &&
          valiData[0].subjectId != undefined &&
          valiData[0].title != undefined
        )
          that.batchChoice = XLSX.utils.sheet_to_json(
            wb.Sheets[wb.SheetNames[0]]
          );
        else {
          that.$message.error("文件数据有误！");
        }
      };
      reader.readAsBinaryString(f);
    },
    batSaveOne(subjectId, chapter, knowledgePoint, title, attrA, attrB,attrC,attrD,answer,description) {
      var that = this;
      let createTime = (new Date()).toString();
      var params = new URLSearchParams();
      params.append("subjectId", subjectId);
          params.append("chapter", chapter);
          params.append("knowledgePoint",knowledgePoint);
          params.append("title", title);
          params.append("attrA", attrA);
          params.append("attrB", attrB);
          params.append("attrC",attrC);
          params.append("attrD", attrD);
          params.append("answer", answer);
          params.append("description", description);
          params.append("createTime", createTime);
          params.append("createTeacher", that.teaName);
      axios
        .post("/choice/addChoice", params)
        .then(function(response) {
          console.log(response);
          if (response.data== 1) {
            // console.log(stuId+" 插入成功！");
            that.$message({
              message: subjectId + "：" + title + " 插入成功！",
              type: "success"
            });
            that.batchChoice.forEach((element, index) => {
              if (element.stuId == stuId) {
                that.batchStudent.splice(index, 1);
              }
            });
          } else {
            that.$message.error(" 插入失败");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    batchChoiceAdd() {
      this.batchChoice.forEach((element, index) => {
        console.log(element, index);
        this.batSaveOne(
          element.subjectId,
          element.chapter,
          element.knowledgePoint,
          element.title,
          element.attrA,
          element.attrB,
          element.attrC,
          element.attrD,
          element.answer,
          element.description
        );
      });
      setTimeout(() => {
        this.getData();
      }, 2000);
    },

    //编辑 单选题
    editCho(index, row) {
        console.log(index, row);
        this.oldChoice = {    // 编辑时，旧的exam设置信息
          choiceId:row.choiceId,
          subjectId: row.subjectId,  //科目
          knowledgePoint: row.knowledgePoint,  //知识点
          chapter: row.chapter,  //章节
          title: row.title,  //题目
          attrA: row.attrA,  //选项
          attrB: row.attrB,
          attrC:row.attrC,
          attrD: row.attrD,
          answer: row.answer,   //答案
          description: row.description,   //解析
          createTeacher: row.createTeacher,   //添加题的教师
          createTime: row.createTime   //添加题的时间
        };
        this.newChoice = {
          choiceId:row.choiceId,
          subjectId: row.subjectId,  //科目
          knowledgePoint: row.knowledgePoint,  //知识点
          chapter: row.chapter,  //章节
          title: row.title,  //题目
          attrA: row.attrA,  //选项
          attrB: row.attrB,
          attrC:row.attrC,
          attrD: row.attrD,
          answer: row.answer,   //答案
          description: row.description,   //解析
          createTeacher: row.createTeacher,   //添加题的教师
          createTime: row.createTime   //添加题的时间
        };
        this.addchop = true;
      },
      // 确认修改 选择题
      comfirmcho() {
        var that = this;
        var params = new URLSearchParams();
          params.append("choiceId", that.newChoice.choiceId);
          params.append("subjectId", that.newChoice.subjectId);
          params.append("chapter", that.newChoice.chapter);
          params.append("knowledgePoint", that.newChoice.knowledgePoint);
          params.append("title", that.newChoice.title);
          params.append("attrA", that.newChoice.attrA);
          params.append("attrB", that.newChoice.attrB);
          params.append("attrC", that.newChoice.attrC);
          params.append("attrD", that.newChoice.attrD);
          params.append("answer", that.newChoice.answer);
          params.append("description", that.newChoice.description);
          params.append("createTime", that.newChoice.createTime);
          params.append("createTeacher", that.newChoice.createTeacher);
          console.log(params);
          axios
            .post("/choice/updateChoice", params)
            .then(function (response) {
              console.log(response);
              that.addchop = false;
              if (response.data == 1) {
                that.questionlist.push(that.question);
                that.$message({
                  message: that.newChoice.choiceId + "修改成功",
                  type: "success"
                });
                
              } else {
                that.$message.error("插入失败。");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      },
      //删除 当前选择题
      delcho(index, row) {
        console.log(index, row.choiceId);
        var that = this;

        this.$confirm("确定删除该考试设置？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios
              .post("/choice/deleteChoice?choiceId=" + row.choiceId)
              .then(function (response) {
                console.log(response.data);
                if (response.data == 1) {
                  that.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  that.questionlist.splice(index, 1);
                } else {
                  alert("删除失败。");
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },


    },

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