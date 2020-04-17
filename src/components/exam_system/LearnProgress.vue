<template>
  <div class="progress">
      <el-button type="primary" round @click="back()">返回</el-button>

      <el-divider></el-divider>
      <table border="1" 
      cellpadding="5"
           cellspacing="0"
          width="280">
        <tr>
          <td style="text-align:right;">姓名：</td>
          <td>{{stuName}}</td>
        </tr>
        <tr>
          <td style="text-align:right;">姓名：</td>
          <td>{{stuId}}</td>
        </tr>
      </table>
      <h3 style="text-align: center;">{{examName}}</h3>
      <p style="margin-left: 60%;color: red;">总分：{{score.totalSco}}</p>
      <!-- <div v-for="(item,index) in choicelist">
       <ul >
        <i>{{index+1}}、</i><font>{{item.title}}</font>
         <li>A. {{item.attrA}}</li>
         <li>B. {{item.attrB}}</li>
         <li>C. {{item.attrC}}</li>
         <li>D. {{item.attrD}}</li>
       </ul>
      </div> -->
      
      <div v-loading="myloading"  style="width: 80%;margin: 5px auto;">
        <form method="post">
          <div>
            <h4>选择题</h4> 
            <p style="color: salmon;">选择题总得分：{{score.selectSco}}</p>
            <ul v-for="(item,index) in eqc">
              <h4>{{index+1}}（{{exam.choiceScore}}分）、{{choicelist[index].title}}</h4>
              <div class="attr">
                <li>A. {{choicelist[index].attrA}}</li>
                <li>B. {{choicelist[index].attrB}}</li>
                <li>C. {{choicelist[index].attrC}}</li>
                <li>D. {{choicelist[index].attrD}}</li>
              </div>
              <li>参考答案：{{item.answer}}</li> <br/>
              <li>学生答案：{{item.stuAnswer}}</li>
              <p>学生得分：{{item.sco}}</p>
            </ul>
          </div>

          <div>
            <h4>填空题</h4>
            <p style="color: salmon;">填空题总得分：{{score.blankSco}}</p>
            <ul v-for="(item,index) in eqb">
              <h4>{{index+1}}（{{exam.blankScore}}分）、{{blanklist[index].title}}</h4>
              <li>参考答案：{{item.answer}}</li><br/>
              <li>学生答案：{{item.stuAnswer}}</li>
              <p>学生得分：{{item.sco}}</p>
            </ul>
          </div>

          <div>
            <h4>简答题</h4>
            <p style="color: salmon;">简答题总得分：{{score.shortSco}}</p>
            <ul v-for="(item,index) in eqs">
              <h4>{{index+1}}（{{exam.shortScore}}分）、{{shortlist[index].title}}</h4>
              <li>参考答案：{{item.answer}}</li><br/>
              <li>学生答案：{{item.stuAnswer}}</li>
              <p>学生得分：{{item.sco}}</p>
            </ul>
          </div>

          <div>
            <h4>程序填空题</h4>
            <p style="color: salmon;">程序填空题总得分：{{score.proBlankSco}}</p>
            <ul v-for="(item,index) in eqpb">
              <h4>{{index+1}}（{{exam.proBlankScore}}分）、{{proBlanklist[index].title}}</h4>
              <li>参考答案：{{item.answer}}</li><br/>
              <li>学生答案：{{item.stuAnswer}}</li>
              <p>学生得分：{{item.sco}}</p>
            </ul>
          </div>

          <div>
            <h4>编程题</h4>
            <p style="color: salmon;">编程题总得分：{{score.programSco}}</p>
            <ul v-for="(item,index) in eqpro">
              <h4>{{index+1}}（{{exam.programScore}}分）、{{programlist[index].title}}</h4>
              <li>参考答案：<pre>{{item.answer}}</pre></li><br/>
              <li>学生答案：{{item.stuAnswer}}</li>
              <p>学生得分：{{item.sco}}</p>
            </ul>
          </div>


          <!-- <el-button type="primary" round @click.prevent="onSubmit()">导出试卷</el-button> -->
        </form>
        
      </div>

  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "progress",
  data() {
    return {
      msg: "考试系统-查看学生试卷",
      stuInfo:[],  //当前试卷的考生信息
      score:[],   //当前试卷的分数信息
      stuName:null,
      examInfoId:null,
      examName:null,
      stuId:null,
      choicelist:[],  //原题目
      blanklist:[],
      shortlist:[],
      proBlanklist:[],
      programlist:[],
      eqc:[],   //examquestion
      eqb:[],
      eqs:[],
      eqpb:[],
      eqpro:[],
      myloading:true,
      exam:[],
    };
  },
  mounted () {
    this.examInfoId=this.$route.query.examInfoId;
    this.examName=this.$route.query.examName;
    this.stuId=this.$route.query.stuId;
    this.getPapers(this.examInfoId);
    this.getExam(this.examName);
    this.getStuName(this.stuId);
    this.getScore(this.examInfoId);
  },
  methods: {
    back(){
      this.$router.push({
        name: "Marking",
        // query: { examInfoId:this.examInfoid}
      });
    },
    getStuName(stuId){   //获取学生姓名
      let that  = this;
      axios.get("/marking/getstuName?stuId="+stuId).then(res => {
          console.log("当前试卷的学生：");
          console.log(res.data);
          that.stuInfo = res.data;
          that.stuName = res.data.name;
        });
    },
    getScore(eid){   //拿到试卷的分数
      let that  = this;
      axios.get("/marking/getscore?examInfoId="+eid).then(res => {
          console.log(res.data);
          that.score = res.data;
        });
    },
    getExam(name){
      let that  = this;
      axios.get("/exam/getExamByExamName?examName="+name).then(res => {
          console.log(res.data);
          that.exam = res.data;
        });
    },
    getPapers(id){
      let that = this;
      // "/marking/paperMarking?examInfoId="+id 
      axios.get("/marking/paperMarking?examInfoId="+id ).then(res => {
        console.log("*********************test");
          console.log(res.data);
          that.choicelist = res.data.examPaper.choice;    //拿到所有题目
          that.blanklist = res.data.examPaper.blankQues;
          that.shortlist = res.data.examPaper.shortQues;
          that.proBlanklist = res.data.examPaper.proBlank;
          that.programlist = res.data.examPaper.program;
          console.log(that.choicelist);
          //that.examInfo = res.data;

          //拿到examquestions  
          for(let i=0;i<res.data.examquestions.length;i++){
            let type=res.data.examquestions[i].questionType;
            if(type ==1){
              that.eqc.push(res.data.examquestions[i]);
            }
            if(type ==2){
              that.eqb.push(res.data.examquestions[i]);
            }
            if(type ==3){
              that.eqs.push(res.data.examquestions[i]);
            }
            if(type ==4){
              that.eqpb.push(res.data.examquestions[i]);
            }
            if(type ==5){
              that.eqpro.push(res.data.examquestions[i]);
            }
          }
          that.myloading=false;
        });
    },
    //导出试卷按钮
    onSubmit(){

    },


  }
};
</script>

<style scoped>
.progress{
  margin: 20px auto;
    padding: 30px;
    background: white;
    width: 95%;
    /* height: 600px; */
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}
ul li{
  display: inline-block;
  list-style: none;
}
.attr li{
  display: block;
}
</style>
