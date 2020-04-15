<template>
  <div class="testsetting" v-loading="loading">
    <el-row>
      <el-button type="primary" v-show="!showaddexam" @click="showaddexam = !showaddexam">添加测试与考试设置</el-button>
      <el-button type="success" v-show="!showaddpra" @click="showaddpra = !showaddpra">添加章节练习设置</el-button>
    </el-row>
    <!-- <p @click="loadComments()">localstorage的信息：{{local}}{{teaName}}</p> -->
    <el-divider></el-divider>

    <!-- 新增 exam 设置 -->
    <div v-show="showaddexam" style="
    top:50px;
    text-align: center;
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
        <el-button @click=" showaddexam=!showaddexam " circle>X</el-button>
      </div>
      <h3 style="text-align: center;">新增考试设置</h3>
      <div style="margin: 0px auto;">
        <el-form style="padding-right: 30px;padding-top: 20px; width: 60%;" ref="form" :model="oneexamset"
          label-width="300px">
          <el-form-item label="科目"">
           <el-input v-model=" oneexamset.subjectId" placeholder="科目">
            </el-input>
          </el-form-item>
          <el-form-item label="考试名称"">
          <el-input v-model=" oneexamset.examName" placeholder="考试名称">
            </el-input>
          </el-form-item>
          <el-form-item label="考试类型">
              <el-radio label="1" v-model="oneexamset.examType">章节测试</el-radio>
              <el-radio label="2" v-model="oneexamset.examType">考试</el-radio>
          </el-form-item>

          <el-form-item label="年级"">
        <el-input v-model=" oneexamset.grade">
            </el-input>
          </el-form-item>

          <el-form-item label="考试班级"">
          <el-input v-model=" oneexamset.examClass">
            </el-input>
          </el-form-item>

          <el-form-item label="考试时间范围" required>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" placeholder="开始时间" v-model="oneexamset.startTime" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" placeholder="结束时间" v-model="oneexamset.endTime" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="考试时长(分钟)"">
          <el-input v-model=" oneexamset.needTime">
            </el-input>
          </el-form-item>

          <el-form-item label="选择题数目与分数"">
          <el-col :span=" 11">
            <el-form-item>
              <el-input v-model=" oneexamset.choiceNum" placeholder="题数目" style="width: 100%;">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input v-model=" oneexamset.choiceScore" placeholder="分数" style="width: 100%;">
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="填空题数目与分数"">
          <el-col :span=" 11">
            <el-form-item>
              <el-input v-model=" oneexamset.blankNum" placeholder="题数目" style="width: 100%;">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input v-model=" oneexamset.blankScore" placeholder="分数" style="width: 100%;">
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="简答题数目与分数"">
          <el-col :span=" 11">
            <el-form-item>
              <el-input v-model=" oneexamset.shortNum" placeholder="题数目" style="width: 100%;">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input v-model=" oneexamset.shortScore" placeholder="分数" style="width: 100%;">
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="程序填空题数目与分数"">
          <el-col :span=" 11">
            <el-form-item>
              <el-input v-model=" oneexamset.proBlankNum" placeholder="题数目" style="width: 100%;">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input v-model=" oneexamset.proBlankScore" placeholder="分数" style="width: 100%;">
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="编程题数目与分数"">
          <el-col :span=" 11">
            <el-form-item>
              <el-input v-model=" oneexamset.programNum" placeholder="题数目" style="width: 100%;">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input v-model=" oneexamset.programScore" placeholder="分数" style="width: 100%;">
              </el-input>
            </el-col>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="save()">新 增</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>

    <!-- 新增 practice 设置 -->
    <div v-show="showaddpra" style="
    top:50px;
    text-align: center;
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
        <el-button @click=" showaddpra=!showaddpra " circle>X</el-button>
      </div>
      <h3 style="text-align: center;">新增章节练习设置</h3>
      <div style="margin: 0px auto;">
        <el-form style="padding-right: 30px;padding-top: 20px; width: 60%;" ref="form" :model="onepracset"
          label-width="300px">
          <el-form-item label="科目">
           <el-input v-model=" onepracset.subjectId" placeholder="科目">
            </el-input>
          </el-form-item>
          <el-form-item label="练习名称">
          <el-input v-model=" onepracset.practiceName" placeholder="练习名称">
            </el-input>
          </el-form-item>

          <el-form-item label="练习时间范围" required>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" placeholder="开始时间" v-model="onepracset.startTime" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" placeholder="结束时间" v-model="onepracset.endTime" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="练习时长(分钟)">
          <el-input v-model=" onepracset.needTime">
            </el-input>
          </el-form-item>

          <el-form-item label="选择题数目">
              <el-input v-model=" onepracset.choiceNum" placeholder="题数目" style="width: 100%;">
              </el-input>
          </el-form-item>

          <el-form-item label="填空题数目">
              <el-input v-model=" onepracset.blankNum" placeholder="题数目" style="width: 100%;">
              </el-input>
          </el-form-item>

          <el-form-item label="简答题数目">
              <el-input v-model=" onepracset.shortNum" placeholder="题数目" style="width: 100%;">
              </el-input>
          </el-form-item>

          <el-form-item label="程序填空题数目">
              <el-input v-model=" onepracset.proBlankNum" placeholder="题数目" style="width: 100%;">
              </el-input>
          </el-form-item>

          <el-form-item label="编程题数目">
              <el-input v-model=" onepracset.programNum" placeholder="题数目" style="width: 100%;">
              </el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="savepra()">新 增</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>

    <!-- 修改 exam 设置 -->
    <div v-show="showEditPanel" style="
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
        <el-button @click=" showEditPanel=!showEditPanel " circle>X</el-button>
      </div>
      <h4 style="text-align: center;">编辑考试设置</h4>
      <div style="margin: 0px auto;">
        <el-form style="padding-right: 30px;padding-top: 20px; width: 60%;" ref="form" :model="newexamInfo"
          label-width="300px">
          <el-form-item label="科目"">
           <el-input v-model=" newexamInfo.subjectId" placeholder="科目">
            </el-input>
          </el-form-item>
          <el-form-item label="考试名称"">
          <el-input v-model=" newexamInfo.examName" placeholder="考试名称">
            </el-input>
          </el-form-item>
          <el-form-item label="考试类型">
            <el-radio-group>
              <el-radio label="章节测试" value="1" v-model="newexamInfo.examType"></el-radio>
              <el-radio label="考试" value="2" v-model="newexamInfo.examType"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="年级"">
        <el-input v-model=" newexamInfo.grade">
            </el-input>
          </el-form-item>

          <el-form-item label="考试班级"">
          <el-input v-model=" newexamInfo.examClass">
            </el-input>
          </el-form-item>

          <el-form-item label="考试时间范围" required>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" placeholder="开始时间" v-model="newexamInfo.startTime" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" placeholder="结束时间" v-model="newexamInfo.endTime" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="考试时长(分钟)"">
          <el-input v-model=" newexamInfo.needTime">
            </el-input>
          </el-form-item>

          <el-form-item label="选择题数目与分数"">
          <el-col :span=" 11">
            <el-form-item>
              <el-input v-model=" newexamInfo.choiceNum" placeholder="题数目" style="width: 100%;">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input v-model=" newexamInfo.choiceScore" placeholder="分数" style="width: 100%;">
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="填空题数目与分数"">
          <el-col :span=" 11">
            <el-form-item>
              <el-input v-model=" newexamInfo.blankNum" placeholder="题数目" style="width: 100%;">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input v-model=" newexamInfo.blankScore" placeholder="分数" style="width: 100%;">
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="简答题数目与分数"">
          <el-col :span=" 11">
            <el-form-item>
              <el-input v-model=" newexamInfo.shortNum" placeholder="题数目" style="width: 100%;">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input v-model=" newexamInfo.shortScore" placeholder="分数" style="width: 100%;">
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="程序填空题数目与分数"">
          <el-col :span=" 11">
            <el-form-item>
              <el-input v-model=" newexamInfo.proBlankNum" placeholder="题数目" style="width: 100%;">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input v-model=" newexamInfo.proBlankScore" placeholder="分数" style="width: 100%;">
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="编程题数目与分数"">
          <el-col :span=" 11">
            <el-form-item>
              <el-input v-model=" newexamInfo.programNum" placeholder="题数目" style="width: 100%;">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input v-model=" newexamInfo.programScore" placeholder="分数" style="width: 100%;">
              </el-input>
            </el-col>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="comfirmexam()">确 定</el-button>
          </el-form-item>

        </el-form>
      </div>

    </div>

    <!-- *****************************  编辑 章节练习设置 -->
    <div v-show="showEditpra" style="
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
        <el-button @click=" showEditpra=!showEditpra " circle>X</el-button>
      </div>
      <h4 style="text-align: center;">编辑章节练习设置</h4>
      <div style="margin: 0px auto;">
        <el-form style="padding-right: 30px;padding-top: 20px; width: 60%;" ref="form" :model="newpraInfo"
          label-width="300px">
          <el-form-item label="科目">
            <el-input v-model=" newpraInfo.subjectId" placeholder="科目">
            </el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model=" newpraInfo.practiceName" placeholder="练习名称">
            </el-input>
          </el-form-item>

          <el-form-item label="考试时间范围" required>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" placeholder="开始时间" v-model="newpraInfo.startTime" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="datetime" placeholder="结束时间" v-model="newpraInfo.endTime" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="练习时长(分钟)">
            <el-input v-model=" newpraInfo.needTime">
            </el-input>
          </el-form-item>

          <el-form-item label="选择题数目">
            <el-input v-model=" newpraInfo.choiceNum" placeholder="题数目">
            </el-input>
          </el-form-item>
          <el-form-item label="填空题数目">
            <el-input v-model=" newpraInfo.blankNum" placeholder="题数目">
            </el-input>
          </el-form-item>
          <el-form-item label="简答题数目">
            <el-input v-model=" newpraInfo.shortNum" placeholder="题数目">
            </el-input>
          </el-form-item>
          <el-form-item label="程序填空题数目">
            <el-input v-model=" newpraInfo.proBlankNum" placeholder="题数目">
            </el-input>
          </el-form-item>
          <el-form-item label="编程题数目">
            <el-input v-model=" newpraInfo.programNum" placeholder="题数目">
            </el-input>
          </el-form-item>
          <el-form-item label="可练习次数">
            <el-input v-model="newpraInfo.practiceNum">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="comfirmpra()">确 定</el-button>
          </el-form-item>

        </el-form>
      </div>

    </div>


    <!-- ************************** -->
    <!-- //章节测试与考试设置 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="测试与考试设置" name="first">
        <div style="text-align: center;">
          <el-table :data="examlist.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%" height="450">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column label="课程" prop="subjectId">
            </el-table-column>
            <el-table-column label="考试名称" prop="examName">
            </el-table-column>
            <el-table-column label="考试类型" prop="examType">
            </el-table-column>
            <el-table-column label="考试年级" prop="grade">
            </el-table-column>
            <el-table-column label="考试班级" prop="examClass">
            </el-table-column>
            <el-table-column label="考试开始时间" prop="startTime">
            </el-table-column>
            <el-table-column label="考试截止时间" prop="endTime">
            </el-table-column>
            <el-table-column label="考试时长" prop="needTime">
            </el-table-column>
            <el-table-column label="选择题数目" prop="choiceNum">
            </el-table-column>
            <el-table-column label="选择题分数"" prop=" choiceScore">
            </el-table-column>
            <el-table-column label="填空题数目" prop="blankNum">
            </el-table-column>
            <el-table-column label="填空题分数" prop="blankScore">
            </el-table-column>
            <el-table-column label="简答题数目" prop="shortNum">
            </el-table-column>
            <el-table-column label="简答题分数" prop="shortScore">
            </el-table-column>
            <el-table-column label="程序填空题数目" prop="proBlankNum">
            </el-table-column>
            <el-table-column label="程序填空题分数" prop="proBlankScore">
            </el-table-column>
            <el-table-column label="编程题数目" prop="programNum">
            </el-table-column>
            <el-table-column label="编程题分数" prop="programScore">
            </el-table-column>
            <el-table-column align="right" width="150">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>


      <el-tab-pane label="章节练习设置" name="second">
        <div style="text-align: center;">
          <el-table
            :data="practicelist.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%" height="450">
            <el-table-column label="序号" type="index" width="50">
            </el-table-column>
            <el-table-column label="课程" prop="subjectId">
            </el-table-column>
            <el-table-column label="练习名称" prop="examName">
            </el-table-column>
            <el-table-column label="练习开始时间" prop="startTime">
            </el-table-column>
            <el-table-column label="练习截止时间" prop="endTime">
            </el-table-column>
            <el-table-column label="练习时长" prop="needTime">
            </el-table-column>
            <el-table-column label="选择题数目" prop="choiceNum">
            </el-table-column>
            <el-table-column label="填空题数目" prop="blankNum">
            </el-table-column>
            <el-table-column label="简答题数目" prop="shortNum">
            </el-table-column>
            <el-table-column label="程序填空题数目" prop="proBlankNum">
            </el-table-column>
            <el-table-column label="编程题数目" prop="programNum">
            </el-table-column>
            <el-table-column align="right" width="150">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEditpra(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDeletepra(scope.$index, scope.row)">删除</el-button>
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
    name: "testsetting",
    data() {
      return {
        loading: true,  //加载
        search: "",
        examsearch: {   //考试的搜索条件
          ename: '',   //考试的名称
          subject: '',  //考试所属的科目
          grade: '',   //年级
          cla: '',    //班级
          startTime: '',   //开始时间
          endTime: ''  //结束时间
        },
        exam: {
          ename: '',   //考试名称
          type: '',   //试卷类型
          subject: '',  //考试所属科目
          grade: '',   //年级
          cla: '',  //班级
          startTime: '',  //考试开始日期
          endTime: '',    //考试结束日期
          avaliableTime: '',   //考试限制时间
          questionNum: 0,    //考试试题总数
          totalScore: 0,   //总分
          passScore: 0,   //及格线
          selectNum: 0,   //选择题数量
          blankNum: 0,    //填空题数量
          shortNum: 0,   //简答题数量
          proBlankNum: 0,   //程序填空题
          programNum: 0,    //编程题数量
          paperNum: 0,   //生成试卷数量（每生成一张卷子就+1）
          examedNum: 0,   //已考人数
          createTime: '2020-03-03  00:00:00'   //添加考试的时间
        },
        oneexamset: {    // 一个 exam 对象， 添加时使用
          examId: null,
          examType: '1',
          subjectId: null,
          grade: null,
          examClass: null,
          startTime: null,
          endTime: null,
          needTime: null,
          choiceNum: null,
          choiceScore: null,
          blankNum: null,
          blankScore: null,
          shortNum: null,
          shortScore: null,
          proBlankNum: null,
          proBlankScore: null,
          programNum: null,
          programScore: null,
          examName: null,
          createTime: null,
          createTeacher: null,
        },
        onepracset: {    // 一个 practiceSet 对象， 添加时使用
          practiceSetId: null,
          practiceName: null,
          subjectId: null,
          startTime: null,
          endTime: null,
          needTime: null,
          choiceNum: null,
          blankNum: null,
          shortNum: null,
          proBlankNum: null,
          programNum: null,
          practiceNum: null,
          createTime: null,
          createTeacher: null,
        },
        activeName: "first",
        practicelist: [],   //章节练习的设置 列表
        examlist: [],   //测试与考试的列表
        oldexamInfo: {    // 编辑时，旧的exam设置信息
          examId: null,
          examType: null,
          subjectId: null,
          grade: null,
          examClass: null,
          startTime: null,
          endTime: null,
          needTime: null,
          choiceNum: null,
          choiceScore: null,
          blankNum: null,
          blankScore: null,
          shortNum: null,
          shortScore: null,
          proBlankNum: null,
          proBlankScore: null,
          programNum: null,
          programScore: null,
          examName: null,
          createTeacher: null,
          createTime: null,
        },
        newexamInfo: {    // 编辑时，新的exam设置信息
          examId: null,
          examType: null,
          subjectId: null,
          grade: null,
          examClass: null,
          startTime: null,
          endTime: null,
          needTime: null,
          choiceNum: null,
          choiceScore: null,
          blankNum: null,
          blankScore: null,
          shortNum: null,
          shortScore: null,
          proBlankNum: null,
          proBlankScore: null,
          programNum: null,
          programScore: null,
          examName: null,
          createTeacher: null,
          createTime: null,
        },
        oldpraInfo: {    // 编辑时，旧的 practice 设置信息
          practiceSetId: null,
          practiceName: null,
          subjectId: null,
          startTime: null,
          endTime: null,
          needTime: null,
          choiceNum: null,
          blankNum: null,
          shortNum: null,
          proBlankNum: null,
          programNum: null,
          practiceNum: null,
          createTime: null,
          createTeacher: null,
        },
        newpraInfo: {    // 编辑时，新的practice设置信息
          practiceSetId: null,
          practiceName: null,
          subjectId: null,
          startTime: null,
          endTime: null,
          needTime: null,
          choiceNum: null,
          blankNum: null,
          shortNum: null,
          proBlankNum: null,
          programNum: null,
          practiceNum: null,
          createTime: null,
          createTeacher: null,
        },
        showEditPanel: false,   //编辑exam
        showEditpra: false,   //编辑 practice
        showaddexam: false,  // 增加 exam
        showaddpra: false,   //增加 practice
        local:null,
        teaName:'', //当前教师的名字
      };
    },
    mounted() {
      this.getAllSettings();
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
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //编辑 考试
      handleEdit(index, row) {
        console.log(index, row);
        this.oldexamInfo = {    // 编辑时，旧的exam设置信息
          examId: row.examId,
          examType: row.examType,
          subjectId: row.subjectId,
          grade: row.grade,
          examClass: row.examClass,
          startTime: row.startTime,
          endTime: row.endTime,
          needTime: row.needTime,
          choiceNum: row.choiceNum,
          choiceScore: row.choiceScore,
          blankNum: row.blankNum,
          blankScore: row.blankScore,
          shortNum: row.shortNum,
          shortScore: row.shortScore,
          proBlankNum: row.proBlankNum,
          proBlankScore: row.proBlankScore,
          programNum: row.programNum,
          programScore: row.programScore,
          examName: row.examName,
          createTime: row.createTime,
          createTeacher: row.createTeacher,
        };
        this.newexamInfo = {
          examId: row.examId,
          examType: row.examType,
          subjectId: row.subjectId,
          grade: row.grade,
          examClass: row.examClass,
          startTime: row.startTime,
          endTime: row.endTime,
          needTime: row.needTime,
          choiceNum: row.choiceNum,
          choiceScore: row.choiceScore,
          blankNum: row.blankNum,
          blankScore: row.blankScore,
          shortNum: row.shortNum,
          shortScore: row.shortScore,
          proBlankNum: row.proBlankNum,
          proBlankScore: row.proBlankScore,
          programNum: row.programNum,
          programScore: row.programScore,
          examName: row.examName,
          createTime: row.createTime,
          createTeacher: row.createTeacher,
        };
        this.showEditPanel = true;
      },
      //删除考试
      handleDelete(index, row) {
        console.log(index, row.examId);
        var that = this;

        this.$confirm("确定删除该考试设置？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // axios
            //   .post("/exam/deleteExam?examId=" + row.examId)
            //   .then(function (response) {
            //     console.log(response.data);
            //     if (response.data == 1) {
            //       that.$message({
            //         type: "success",
            //         message: "删除成功!"
            //       });
            //       that.examlist.splice(index, 1);
            //     } else {
            //       alert("删除失败。");
            //     }
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
            console.log("删除exam");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      //编辑 练习设置
      handleEditpra(index, row) {
        console.log(index, row);
        this.oldpraInfo = {    // 编辑时，旧的exam设置信息
          practiceSetId: row.practiceSetId,
          practiceName: row.practiceName,
          subjectId: row.subjectId,
          startTime: row.startTime,
          endTime: row.endTime,
          needTime: row.needTime,
          choiceNum: row.choiceNum,
          blankNum: row.blankNum,
          shortNum: row.shortNum,
          proBlankNum: row.proBlankNum,
          programNum: row.programNum,
          practiceNum: row.practiceNum,
          createTime: rwo.createTime,
          createTeacher: row.createTeacher,
        };
        this.newpraInfo = {
          practiceSetId: row.practiceSetId,
          practiceName: row.practiceName,
          subjectId: row.subjectId,
          startTime: row.startTime,
          endTime: row.endTime,
          needTime: row.needTime,
          choiceNum: row.choiceNum,
          blankNum: row.blankNum,
          shortNum: row.shortNum,
          proBlankNum: row.proBlankNum,
          programNum: row.programNum,
          practiceNum: row.practiceNum,
          createTime: rwo.createTime,
          createTeacher: row.createTeacher,
        };
        this.showEditpra = true;
      },
      //删除 练习设置  practiceSet
      handleDeletepra(index, row) {
        // console.log(index, row.stuId);
        var params = new URLSearchParams();
        params.append("stuId", row.stuId);
        var that = this;

        this.$confirm("确定删除该章节练习设置？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // axios
            //   .post("/comm/delStudent", params)
            //   .then(function (response) {
            //     console.log(response.data.object);
            //     if (response.data.object == 1) {
            //       that.$message({
            //         type: "success",
            //         message: "删除成功!"
            //       });
            //       that.allStudents.splice(index, 1);
            //     } else {
            //       alert("删除失败。");
            //     }
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
            console.log("删除 prac");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      //拿到 章节练习的设置 与 考试的设置
      getAllSettings() {
        var that = this;
        axios
          .post("/exam/getALLSettings")
          .then(function (response) {
            console.log(response.data);
            that.examlist = response.data.exam;
            that.practicelist = response.data.practice;
            that.loading = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      // 确认修改 exam
      comfirmexam() {
        var that = this;
        // if (ops == "major") {
        //   var params = new URLSearchParams();
        //   params.append("stuId", this.newStuInfo.stuId);
        //   params.append("major", this.newStuInfo.major);
        //   params.append("adminClass", this.newStuInfo.adminClass);
        //   axios
        //     .post("/comm/changeMajor", params)
        //     .then(function (response) {
        //       console.log(response);
        //       if (response.data.code == 200) {
        //         that.$message({
        //           showClose: true,
        //           type: "success",
        //           message: "成功"
        //         });
        //         that.getAllStudents();
        //         that.oldStuInfo.major = that.newStuInfo.major;
        //         that.oldStuInfo.adminClass = that.newStuInfo.adminClass;
        //       }
        //     })
        //     .catch(function (error) {
        //       console.log(error);
        //     });
        // }
        console.log("修改exam");
      },
      // 新增一个 exam 的设置
      save() {
        console.log(this.oneexamset);
        //这里需要有 输入的校验，是否能有空值
        var params = new URLSearchParams();
          params.append("examType",this.oneexamset.examType);
          params.append("subjectId",this.oneexamset.subjectId);
          params.append("grade",this.oneexamset.grade);
          params.append("examClass",this.oneexamset.examClass);
          params.append("startTime",this.oneexamset.startTime);
          params.append("endTime",this.oneexamset.endTime);
          params.append("needTime",this.oneexamset.needTime);
          params.append("choiceNum",this.oneexamset.choiceNum);
          params.append("choiceScore",this.oneexamset.choiceScore);
          params.append("blankNum",this.oneexamset.blankNum);
          params.append("blankScore",this.oneexamset.blankScore);
          params.append("shortNum",this.oneexamset.shortNum);
          params.append("shortScore",this.oneexamset.shortScore);
          params.append("proBlankNum",this.oneexamset.proBlankNum);
          params.append("proBlankScore",this.oneexamset.proBlankScore);
          params.append("programNum",this.oneexamset.programNum);
          params.append("programScore",this.oneexamset.programScore);
          params.append("examName",this.oneexamset.examName);
          params.append("createTime",(new Date()).toString());
          params.append("createTeacher",this.teaName);
         console.log(params);
        var that = this;
        axios
          .post("/exam/addExam", params)
          .then(function (response) {
            console.log(response);
            if (response.data == 1) {
              that.examlist.push(that.oneexamset);
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
      },
      //新增一个 practice 设置
      savepra() {
        console.log(this.onepracset);
        //这里需要有 输入的校验，是否能有空值
        var params = new URLSearchParams();
          params.append("subjectId",this.onepracset.subjectId);
          params.append("startTime",this.onepracset.startTime);
          params.append("endTime",this.onepracset.endTime);
          params.append("needTime",this.onepracset.needTime);
          params.append("choiceNum",this.onepracset.choiceNum);
          params.append("blankNum",this.onepracset.blankNum);
          params.append("shortNum",this.onepracset.shortNum);
          params.append("proBlankNum",this.onepracset.proBlankNum);
          params.append("programNum",this.onepracset.programNum);
          params.append("practiceName",this.onepracset.practiceName);
          params.append("createTime",(new Date()).toString());
          params.append("createTeacher",this.teaName);
         console.log(params);
         console.log("*************practiceset");
        var that = this;
        axios
          .post("/practiceSet/addPracticeSet", params)
          .then(function (response) {
            console.log(response);
            console.log()
            if (response.data == 1) {
              that.practicelist.push(that.onepracset);  //增加一条
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
      },

    }
  };
</script>

<style scoped>
  .testsetting {
    margin: 20px auto;
    padding: 30px;
    background: white;
    width: 95%;
    /* height: 600px; */
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
</style>