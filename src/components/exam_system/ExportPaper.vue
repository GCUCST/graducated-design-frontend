<template>
  <div class="expaper" >

      <el-button type="primary" round @click="back()">返回</el-button>

      <el-divider></el-divider>
      {{stuId}}
      <h3 style="text-align: center;">{{examName}}</h3>
      
      <!-- <div v-for="(item,index) in choicelist">
       <ul >
        <i>{{index+1}}、</i><font>{{item.title}}</font>
         <li>A. {{item.attrA}}</li>
         <li>B. {{item.attrB}}</li>
         <li>C. {{item.attrC}}</li>
         <li>D. {{item.attrD}}</li>
       </ul>
      </div> -->
      <p>
        {{choicelist[2].title}}
      </p>
      <div v-loading="myloading">
        <form method="post">
          <div>
            <h4>简答题</h4>
            <ul v-for="(item,index) in eqs">
              <h4>{{index+1}}（{{exam.shortScore}}分）、{{shortlist[index].title}}</h4>
              <li>参考答案：{{item.answer}}</li>
              <li>学生答案：{{item.stuAnswer}}</li>
              <el-input type="textarea" :rows="2" placeholder="请打分" @change="get_s_value(index)" v-model="checkeds[index]">
              </el-input>
            </ul>
          </div>

          <div>
            <h4>编程题</h4>
            <ul v-for="(item,index) in eqpro">
              <h4>{{index+1}}（{{exam.programScore}}分）、{{programlist[index].title}}</h4>
              <li>参考答案：{{item.answer}}</li>
              <li>学生答案：{{item.stuAnswer}}</li>
              <el-input type="textarea" :rows="2" placeholder="请打分" @change="get_pro_value(index)" v-model="checkedpro[index]">
              </el-input>
            </ul>
          </div>

          <input type="submit" @click.prevent="onSubmit()">
        </form>
        
      </div>


      
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "expaper",
  data() {
    return {
      msg: "考试系统-导出学生试卷",
      examInfoId:null,
      examName:null,
      stuId:null,
      choicelist:[],  //原题目
      blanklist:[],
      shortlist:[],
      proBlanklist:[],
      programlist:[],
      sanc:null,   //学生的答案
      sanb:null,
      sans:null,
      sanpb:null,
      sanpro:null,
      eqc:[],   //examquestion
      eqb:[],
      eqs:[],
      eqpb:[],
      eqpro:[],
      checkeds:[],   //简答题的分值数组
      checkedpro:[],
      scores:[],   //简单题的分数对象
      scorepro:[],
      allscores:[],
      num3:null,
      num5:null,
      myloading:true,
      exam:[],
    }
  },
  mounted () {
    this.examInfoId=this.$route.query.examInfoId;
    this.examName=this.$route.query.examName;
    this.stuId=this.$route.query.stuId;
    this.getPapers(this.examInfoId);
    this.getExam(this.examName);
  },
  methods: {
    back(){
      this.$router.push({
        name: "Marking",
        // query: { examInfoId:this.examInfoid}
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

          //设置分数 对象
          that.num3 = res.data.examPaper.shortQues.length;
          that.num5 = res.data.examPaper.program.length;
          console.log("num3:****"+that.num5);
          that.setscores(that.num3);
          that.setscorepro(that.num5);
          console.log(that.scores);

        });
      
    },
    get_s_value: function (index) {
        let that = this;
        let sco = that.checkeds[index];
        that.scores[index].sco = sco; //赋值给 分数数组
    },
    get_pro_value: function (index) {
        let that = this;
        let sco = that.checkedpro[index];
        that.scorepro[index].sco = sco; //赋值给 分数数组
    },
    setscores(n) {   //  简答题的分值对象
        let that = this;
        for (var i = 0; i < n; i++) {
          that.scores.push({examInfoId:that.examInfoId, id: that.shortlist[i].shortQuesId, type: 3, sco: "null" });
        }
        console.log("scores:");
        console.log(that.scores);
      },
      setscorepro(n) {   //  编程题的分值对象
        let that = this;
        for (var i = 0; i < n; i++) {
          that.scorepro.push({ examInfoId:that.examInfoId,id: that.programlist[i].programId, type: 5, sco: "null" });
        }
        
      },
      onSubmit(){
        let that = this;
        that.allscores = that.scores.concat(that.scorepro);

        let date=that.allscores;
        let formData = JSON.stringify(date);
        // console.log(formData);
        
        // 将分数提交给后台
        axios.post('/marking/teamarking', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            console.log(res);
            if(res.status == 200){
              console.log("已经将答案提交给后台");
            }
            
          });
      },
  },
};
</script>

<style scoped>
.expaper{
    padding: 15px 30px;
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
</style>
