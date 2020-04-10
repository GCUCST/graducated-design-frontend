<template>
  <div class="addquestion">

    <el-form style="padding-right: 30px;padding-top: 20px;" ref="form" :model="question" label-width="60px">
        <el-form-item label="标题"">
          <el-input v-model="question.title"></el-input>
        </el-form-item>

        <el-form-item label="年级" placeholder="请选择">
          <el-select v-model="question.grade" placeholder="请选择">
            <el-option
              v-for="item in grades"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目" placeholder="请选择">
          <el-select v-model="question.subject" placeholder="请选择">
            <el-option
              v-for="item in subjs"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="章节" placeholder="请选择">
          <el-select v-model="question.chapter" placeholder="请选择">
            <el-option
              v-for="item in chapters"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="题型">
          <el-radio-group v-model="question.type">
          <el-radio :label="0">选择题</el-radio>
          <el-radio :label="1">填空题</el-radio>
          <el-radio :label="2">简单题</el-radio>
          <el-radio :label="3">程序填空题</el-radio>
          <el-radio :label="3">编程题</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 如果是选择题，则有选项 -->
        <el-form-item label="选项" v-if="subject.type==='0' ">  

        </el-form-item>

        <!-- 显示答案 -->
        <h2>{{question.answer}}</h2>
        
        <!-- 解析 -->
        <el-form-item label="解析"">
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="question.desc">
            </el-input>
        </el-form-item>

        <!-- 添加题的教师 -->
        <el-form-item label="题目的添加教师"">
            <el-input v-model="question.creTea"></el-input>
        </el-form-item>

        <!-- 添加题的时间 -->
        <el-form-item label="题目的添加时间"">
            <el-input v-model="question.createTime"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name:"addquestion",
  data(){
    return {
        grades: [{
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
        question:{
            id:+new Date,
            title:'',  //题目
            subject:'',  //科目
            grade:'',  //年级
            chapter:'',  //章节
            score:'',  //分数
            type:'',  //题型
            arrtA:'',  //选项
            arrtB:'',
            arrtC:'',
            arrtD:'',
            answer:'',   //答案
            desc:'',   //解析
            creTea:'',   //添加题的教师
            createTime:''   //添加题的时间
        }
    };
  },
  methods:{
    onSubmit(){
        console.log('添加试题**');
    },
}
}
</script>

<style scoped>
.addquestion{
  margin: 20px auto;
  padding:30px;
  background: white;
  width: 95%;
  /* height: 600px; */
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>