<template>
  <div class="question">
    试题库
    <el-divider></el-divider>

    <!-- 新增试题的对话框 -->
    <el-dialog title="添加试题" :visible.sync="dialogFormVisible">
      <el-form style="padding-right: 30px;padding-top: 20px;" ref="form" :model="question" label-width="90px">
        <el-form-item label="题目"">
        <el-input v-model=" question.title" placeholder="请输入题目">
          </el-input>
        </el-form-item>

        <el-form-item label="年级" placeholder="请选择">
          <el-select v-model="question.grade" placeholder="请选择">
            <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目" placeholder="请选择">
          <el-select v-model="question.subject" placeholder="请选择">
            <el-option v-for="item in subjs" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="章节" placeholder="请选择">
          <el-select v-model="question.chapter" placeholder="请选择">
            <el-option v-for="item in chapters" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="题型">
          <el-radio-group v-model="question.type">
            <el-radio :label="0">选择题</el-radio>
            <el-radio :label="1">填空题</el-radio>
            <el-radio :label="2">简单题</el-radio>
            <el-radio :label="3">程序填空题</el-radio>
            <el-radio :label="4">编程题</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 如果是选择题，则有选项 -->
        <el-form-item label="选项" v-if="question.type===0 ">
          <div>A:<input type="text" v-model="question.arrtA" /></div>
          <div>B:<input type="text" v-model="question.arrtB" /></div>
          <div>C:<input type="text" v-model="question.arrtC" /></div>
          <div>D:<input type="text" v-model="question.arrtD" /></div>
        </el-form-item>

        <!-- 显示答案 -->
        <!-- <h2>{{question.answer}}</h2> -->

        <el-form-item label="答案" style="width:500px;">
          <el-input type=" textarea" :rows="6" placeholder="请输入答案" v-model="question.answer">
          </el-input>
        </el-form-item>

        <!-- 解析 -->
        <el-form-item label="解析" style="width:500px;">
          <el-input type=" textarea" :rows="6" placeholder="请输入题目解析" v-model="question.desc">
          </el-input>
        </el-form-item>

        <!-- 添加题的教师 -->
        <el-form-item label="添加教师" style="width:500px;">
          <el-input v-model=" question.creTea">
          </el-input>
        </el-form-item>

        <!-- 添加题的时间 -->
        <el-form-item label="添加时间" style="width:500px;">
          <el-input v-model=" question.createTime">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>


    <!-- 试题的增删改查操作 -->
    <el-row>
      <el-button type="primary" plain @click="dialogFormVisible = true"><i class="el-icon-circle-plus"></i>添加试题
      </el-button>
      <!-- <router-link to="name='AddQuestion'"><el-button type="primary" plain><i class="el-icon-circle-plus"></i>添加试题</el-button></router-link> -->
      <el-button type="primary" plain @click="editQuestion"><i class="el-icon-edit"></i>修改试题</el-button>
      <el-button type="primary" plain @click="deleteQuestion"><i class="el-icon-remove"></i>删除试题</el-button>
      <!-- <el-button type="primary" plain @click="importQuestion"><i class="el-icon-document"></i>导入试题</el-button> -->
      <el-upload style="padding-top: 10px;width:300px;" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
      :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" 
      :file-list="fileList">
      <el-button plain type="primary">导入试题</el-button>
      <div slot="tip" class="el-upload__tip">只能上传xls,xlsx格式的文件，且不超过5M</div>
    </el-upload>
    </el-row>
    <!-- 使用 行内表单  设置试题的搜索条件 -->
    <div style="padding-top: 20px;">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="题目">
          <el-input v-model="formSearch.title" placeholder="题目"></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="formSearch.grade" placeholder="年级">
            <el-option label="2019级" value="0"></el-option>
            <el-option label="2018级" value="1"></el-option>
            <el-option label="2017级" value="2"></el-option>
            <el-option label="2016级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建教师">
          <el-input v-model="formSearch.createTea" placeholder="创建教师"></el-input>
        </el-form-item>
        <el-form-item label="试题类型">
          <el-select v-model="formSearch.type" placeholder="试题类型">
            <el-option label="选择题" value="0"></el-option>
            <el-option label="填空题" value="1"></el-option>
            <el-option label="简答题" value="2"></el-option>
            <el-option label="程序填空题" value="3"></el-option>
            <el-option label="编程题" value="4"></el-option>
          </el-select>
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
    </div>

    <!-- 试题列表 使用表格展示 -->
    <div style="border: 1px #ccc solid;">
      <el-table ref="singleTable" highlight-current-row @current-change="handleCurrentChange" border
        :data="questionlist" style="width: 100%" height="550">
        <el-table-column fixed type="index" width="50">
        </el-table-column>
        <el-table-column prop="title" label="题目" width="200">
        </el-table-column>
        <el-table-column prop="subject" label="科目" width="120">
        </el-table-column>
        <el-table-column prop="grade" label="年级" width="100">
        </el-table-column>
        <el-table-column prop="chapter" label="章节" width="100">
        </el-table-column>
        <el-table-column prop="score" label="分数" width="80">
        </el-table-column>
        <el-table-column prop="type" label="题型" width="100">
        </el-table-column>
        <el-table-column prop="arrtA" label="选项A" width="120">
        </el-table-column>
        <el-table-column prop="arrtB" label="选项B" width="120">
        </el-table-column>
        <el-table-column prop="arrtC" label="选项C" width="120">
        </el-table-column>
        <el-table-column prop="arrtD" label="选项D" width="120">
        </el-table-column>
        <el-table-column prop="answer" label="正确答案" width="120">
        </el-table-column>
        <el-table-column prop="desc" label="解析" width="120">
        </el-table-column>
        <el-table-column prop="createTea" label="添加教师" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="120">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
  export default {
    name: "question",
    data() {
      return {
        msg: "试题库",
        grades: [{    //模拟的年级数据
          value: '2019',
          label: '2019级'
        }, {
          value: '2018',
          label: '2018级'
        }, {
          value: '选项3',
          label: '2017级'
        }, {
          value: '选项4',
          label: '2016级'
        }],
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
          id: +new Date,
          title: '',  //题目
          subject: '',  //科目
          grade: '',  //年级
          chapter: '',  //章节
          score: '',  //分数
          type: 0,  //题型
          arrtA: '',  //选项
          arrtB: '',
          arrtC: '',
          arrtD: '',
          answer: '',   //答案
          desc: '',   //解析
          creTea: '',   //添加题的教师
          createTime: ''   //添加题的时间
        },
        dialogFormVisible: false,
        fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
        formSearch: {    //试题的搜索条件
          title: '',  //试题题目
          grade: '',    //题目年级
          createTea: '',   //创建教师
          type: '',   //试题类型
          subject: '',   //所属科目  
          chapter: '',   //所属章节
        },
        questionlist: [   //试题例子
          {
            id: 101,   //试题编号
            title: '下列需要在虚拟机中执行的代码是？',   //题目
            subject: 'java基础',   //科目
            grade: '2019级',     //年级
            chapter: '第二章',   //章节
            score: '4',   //分数
            type: '0',   //题型，0表示选择题
            arrtA: 'Java代码',   //选项
            arrtB: 'C代码',
            arrtC: 'C++代码',
            arrtD: 'PHP代码',
            answer: 'A',  //答案
            desc: '这道题考察java基础内容。',  //答案解析
            createTea: '张三',   //题目的创建老师
            createTime: '2020-03-01 18:23:20'   //题目的创建时间
          },
          {
            id: 102,   //试题编号
            title: '下列需要在虚拟机中执行的代码是？',   //题目
            subject: 'java进阶',   //科目
            grade: '2018级',   //年级
            chapter: '第二章',   //章节
            score: '4',   //分数
            type: '0',   //题型，0表示选择题
            arrtA: 'Java代码',   //选项
            arrtB: 'C代码',
            arrtC: 'C++代码',
            arrtD: 'PHP代码',
            answer: 'A',  //答案
            desc: '这道题考察java基础内容。',  //答案解析
            createTea: '李四',   //题目的创建老师
            createTime: '2020-03-02 18:23:20'   //题目的创建时间
          },
          {
            id: 103,   //试题编号
            title: '下列需要在虚拟机中执行的代码是？',   //题目
            subject: 'java高级',   //科目
            grade: '2017级',   //年级
            chapter: '第二章',   //章节
            score: '4',   //分数
            type: '0',   //题型，0表示选择题
            arrtA: 'Java代码',   //选项
            arrtB: 'C代码',
            arrtC: 'C++代码',
            arrtD: 'PHP代码',
            answer: 'A',  //答案
            desc: '这道题考察java基础内容。',  //答案解析
            createTea: '王五',   //题目的创建老师
            createTime: '2020-03-02 19:23:20'   //题目的创建时间
          },
        ],
        currentRow: null,   //当前选中的下标
      };
    },
    methods: {
      // addQuestion(){
      //   console.log('添加试题');
      // },
      editQuestion() {
        console.log('修改试题');
      },
      deleteQuestion() {
        console.log('删除试题');
      },
      importQuestion() {
        console.log('导入试题');
      },
      onSubmit() {
        console.log("搜索");
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