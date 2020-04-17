<template>
  <div class="startExam">
    <h3 style="padding-left: 22%;">考试名称 - {{examInfo.examName}}</h3>
    <!-- <P>测试传值：<input type="button" value="传值" @click="sendCanswer()" /></P> -->
    <div v-loading="myloading" class="main">
      <!--nr start-->
      <div class="test_main">
        <div class="nr_left">
          <div class="test">
            <!-- <form action="/home/exam/answertest" > -->
            <form method="post">
              <div class="test_title">
                <font><input type="submit" @click.prevent="onSubmit()"></font>

              </div>

              <div class="test_content" id="q1">
                <div class="test_content_title">
                  <h2>选择题</h2>
                  <p>
                    <span>共</span><i class="content_lit">{{exam.choiceNum}}</i><span>题，</span><span>合计</span>
                    <!-- <i class="content_fs">{{exam.choiceNum}}* {{exam.choiceScore}}</i><span>分</span> -->
                    <i class="content_fs" v-text="sum(exam.choiceNum,exam.choiceScore)"></i><span>分</span>
                  </p>
                </div>
              </div>
              <div class="test_content_nr">
                <ul>
                  <li v-for="(item,index) in choicelist" :key="index" :id="'q_1_' + (index+1)">
                    <div class="test_content_nr_tt">
                      <i>{{index+1}}</i><span>({{exam.choiceScore}}分)</span>
                      <font>{{item==null?"":item.title}}</font>
                    </div>

                    <div class="test_content_nr_main">
                      <ul>

                        <li class="option">

                          <input type="radio" class="radioOrCheck" :name="'answer' + (index+1)" value="A"
                            v-model="checkedc[index]" @change="get_radio_value(index)"
                            :id=" '1_answer_'+ (index+1) + '_option_1' " />


                          <label :for=" '1_answer_' + (index+1) +'_option_1'">
                            A.
                            <p class="ue" style="display: inline;">{{item==null?"":item.attrA}}</p>
                          </label>
                        </li>

                        <li class="option">

                          <input type="radio" class="radioOrCheck" :name="'answer' + (index+1)" value="B"
                            v-model="checkedc[index]" @change="get_radio_value(index)"
                            :id="'1_answer_'+ (index+1) + '_option_2'" />


                          <label :for=" '1_answer_' + (index+1) + '_option_2' ">
                            B.
                            <p class="ue" style="display: inline;">{{item==null?"":item.attrB}}</p>
                          </label>
                        </li>

                        <li class="option">

                          <input type="radio" class="radioOrCheck" :name="'answer' + (index+1)" value="C"
                            v-model="checkedc[index]" @change="get_radio_value(index)"
                            :id="'1_answer_'+ (index+1) + '_option_3'" />


                          <label :for=" '1_answer_' + (index+1) + '_option_3'">
                            C.
                            <p class="ue" style="display: inline;">{{item==null?"":item.attrC}}</p>
                          </label>
                        </li>

                        <li class="option">

                          <input type="radio" class="radioOrCheck" :name="'answer' + (index+1)" value="D"
                            v-model="checkedc[index]" @change="get_radio_value(index)"
                            :id="'1_answer_'+ (index+1) + '_option_4'" />


                          <label :for=" '1_answer_' + (index+1) + '_option_4'">
                            D.
                            <p class="ue" style="display: inline;">{{item==null?"":item.attrD}}</p>
                          </label>
                        </li>

                      </ul>
                    </div>
                  </li>



                </ul>
              </div>

              <div class="test_content" id="q2">
                <div class="test_content_title">
                  <h2>填空题</h2>
                  <p>
                    <span>共</span><i class="content_lit">{{exam.blankNum}}</i><span>题，</span><span>合计</span><i
                      class="content_fs" v-text="sum(exam.blankNum,exam.blankScore)"></i><span>分</span>
                  </p>
                </div>
              </div>
              <div class="test_content_nr">
                <ul>

                  <li v-for="(item,index) in blanklist" :key="index" :id="'q_2_' + (index+1)">
                    <div class="test_content_nr_tt">
                      <i>{{index + 1}}</i><span>({{exam.blankScore}}分)</span>
                      <font>{{item==null?"":item.title}}</font>
                    </div>

                    <div class="test_content_nr_main">
                      <font>答案：</font>
                      <input type="text" v-model="checkedb[index]" @change="get_bla_value(index)"
                        style="height: 25px;font-size: 16px;color:black;" />
                    </div>
                  </li>

                </ul>
              </div>


              <div class="test_content" id="q3">
                <div class="test_content_title">
                  <h2>简答题</h2>
                  <p>
                    <span>共</span><i class="content_lit">{{exam.shortNum}}</i><span>题，</span><span>合计</span><i
                      class="content_fs" v-text="sum(exam.shortNum,exam.shortScore)"></i><span>分</span>
                  </p>
                </div>
              </div>
              <div class="test_content_nr">
                <ul>
                  <li v-for="(item,index) in shortlist" :key="index" :id="'q_3_' + (index+1)">
                    <div class="test_content_nr_tt">
                      <i>{{index+1}}</i><span>({{exam.shortScore}}分)</span>
                      <font>{{item==null?"":item.title}}</font>
                    </div>

                    <div class="test_content_nr_main">
                      <font>答案：</font>
                      <el-input type="textarea" :rows="2" @change="get_short_value(index)" v-model="checkeds[index]">
                      </el-input>
                    </div>
                  </li>
                </ul>
              </div>


              <div class="test_content" id="q4">
                <div class="test_content_title">
                  <h2>程序填空题</h2>
                  <p>
                    <span>共</span><i class="content_lit">{{exam.proBlanktNum}}</i><span>题，</span><span>合计</span><i
                      class="content_fs" v-text="sum(exam.proBlankNum,exam.proBlankScore)"></i><span>分</span>
                  </p>
                </div>
              </div>
              <div class="test_content_nr">
                <ul>

                  <li v-for="(item,index) in proBlanklist" :key="index" :id="'q_4_' + (index+1)">
                    <div class="test_content_nr_tt">
                      <i>{{index+1}}</i><span>({{exam.proBlankScore}}分)</span>
                      <font>{{item==null?"":item.title}}</font>
                    </div>

                    <div class="test_content_nr_main">
                      <font>答案：</font>
                      <input type="text" style="height: 25px;font-size: 16px;color:black;" name="answer1"
                        v-model="checkedpb[index]" @change="get_pb_value(index)" />
                    </div>
                  </li>

                </ul>
              </div>

              <div class="test_content" id="q5">
                <div class="test_content_title">
                  <h2>编程题</h2>
                  <p>
                    <span>共</span><i class="content_lit">{{exam.programNum}}</i><span>题，</span><span>合计</span><i
                      class="content_fs" v-text="sum(exam.programScore,exam.programNum)"></i><span>分</span>
                  </p>
                </div>
              </div>
              <div class="test_content_nr">
                <ul>

                  <li v-for="(item,index) in programlist" :key="index" :id="'q_5_' + (index+1)">
                    <div class="test_content_nr_tt">
                      <i>{{index+1}}</i><span>({{exam.programScore}}分)</span>
                      <font>{{item==null?"":item.title}}</font>
                    </div>

                    <div class="test_content_nr_main">
                      <font>答案：</font>
                      <el-input type="textarea" :rows="2" placeholder="请输入内容" @change="get_pro_value(index)"
                        v-model="checkedpro[index]">
                      </el-input>

                    </div>
                  </li>

                </ul>
              </div>





            </form>
          </div>

        </div>
        <div class="nr_right">
          <div class="nr_rt_main">
            <div class="rt_nr1">
              <div class="rt_nr1_title">
                <h1>
                  考试剩余时间
                </h1>
                <p class="test_time">
                  <b class="alt-1">{{keepTime}}</b>
                </p>
              </div>

              <div class="rt_content">
                <div class="rt_content_tt" >
                  <h2>选择题</h2>
                  <p>
                    <span>共</span><i class="content_lit">{{exam.choiceNum}}</i><span>题</span>
                  </p>
                </div>
                <!--<div class="rt_content_nr answerSheet">
                   <ul> -->
                    <!-- <li v-for="index in choicelist.length"><a :href=" '#q_1_' + index">{{index}}</a></li> -->
                    <!-- <li v-for="index in choicelist.length" @click="trun('q_1_'+index)">{{index}}</li>
                  </ul> 
                </div>-->
              </div>

              <div class="rt_content">
                <div class="rt_content_tt">
                  <h2>填空题</h2>
                  <p>
                    <span>共</span><i class="content_lit">{{exam.blankNum}}</i><span>题</span>
                  </p>
                </div>
                <!--<div class="rt_content_nr answerSheet">
                  <ul>
                     <li><a href="">1</a></li> 
                    <li v-for="index in blanklist.length">{{index}}</li>
                  </ul>
                </div>-->
              </div>


              <div class="rt_content">
                <div class="rt_content_tt">
                  <h2>简答题</h2>
                  <p>
                    <span>共</span><i class="content_lit">{{exam.shortNum}}</i><span>题</span>
                  </p>
                </div>
                <!--<div class="rt_content_nr answerSheet">
                  <ul>
                     <li><a href="">1</a></li>
                    <li v-for="index in shortlist.length">{{index}}</li>
                  </ul>
                </div> -->
              </div>


              <div class="rt_content">
                <div class="rt_content_tt">
                  <h2>程序填空题</h2>
                  <p>
                    <span>共</span><i class="content_lit">{{exam.proBlankNum}}</i><span>题</span>
                  </p>
                </div>
                <!--<div class="rt_content_nr answerSheet">
                  <ul>
                     <li><a href="">1</a></li> 
                    <li v-for="index in proBlanklist.length">{{index}}</li>
                  </ul>
                </div>-->
              </div>


              <div class="rt_content">
                <div class="rt_content_tt">
                  <h2>编程题</h2>
                  <p>
                    <span>共</span><i class="content_lit">{{exam.programNum}}</i><span>题</span>
                  </p>
                </div>
                <!-- <div class="rt_content_nr answerSheet">
                  <ul>
                    <li><a href="">1</a></li> 
                    <li v-for="index in programlist.length">{{index}}</li>
                  </ul>
                </div>-->
              </div>



            </div>

          </div>
        </div>
      </div>
      <!--nr end-->
      <div class="foot"></div>
    </div>
  </div>
</template>


<script>
  import axios from "axios";
  export default {
    name: "startExam",
    data() {
      return {
        msg: "考试系统-学生-章节练习",
        time: '',
        flag: false,
        //endTime: '2020-03-09 16:30:20',
        //id: null,  //每道题目的id
        choicelist: [],  //选择题试题
        blanklist: [],
        shortlist: [],
        proBlanklist: [],
        programlist: [],
        num1: 0,   //每种题型的长度
        num2: 0,
        num3: 0,
        num4: 0,
        num5: 0,
        // choiceAnswer: { 18: 'A', 23: 'B', 34: 'C', 29: 'C', 17: 'D', 27: 'A', 26: 'A', 22: 'A', 11: 'A', 14: 'B', 21: 'D', 14: 'C' },  //学生答案
        choiceIds: [],
        canswers: [],  //答案数组，格式是：{id:15,type:2,ans:'test15'}
        checkedc: [],  //单选题绑定的值
        banswers: [],
        checkedb: [],
        sanswers: [],  //简答
        checkeds: [],
        pbanswers: [],  //程序填空
        checkedpb: [],
        proanswers: [],
        checkedpro: [],
        allAnswers: [],
        //kaoshishijian:'90',
        exam: [], //考试信息设置
        examInfo: [],  //试卷信息的信息
        keepTime: '倒计时',
        limittime: 90,
        settime: '',
        questid: null,
        examId: null,   //当前考试的examid
        myloading: true,   //正在加载
        examInfoId: 5,
      };
    },
    created() {
      //this.StartCountDown();
      this.getExam();
      this.getExamInfo();
      this.getChoice();   //拿到所有的题目
      // this.setChoiceAnswer();
      // this.getBlank();
      // this.getShort();
      // this.getProBlank();
      // this.getProgram(); 
    },
    mounted() {
      this.examId = this.$route.query.examId;
      console.log("***************************************" + this.id);
    },
    methods: {
      // goAnchor,
      // GetQueryString,
      //  传c答案
      // sendCanswer() {
      //   //let tmp=that.choiceAnswer;
      //   let date = [{ id: 15, type: 2, ans: 'test15' }, { id: 22, type: 3, ans: 'test22' }];
      //   // let date=[{id:11,type:1,ans:'A'}];
      //   let tmp = JSON.stringify(date);
      //   console.log(tmp);
      //   axios.post("/home/exam/arrtest", tmp, {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   }).then(res => {
      //     console.log(res);
      //   });
      // },
      StartCountDown() {
        var mydate = new Date();
        mydate.setMinutes(mydate.getMinutes() + this.limittime);
        this.settime = mydate;

        let time = setInterval(() => {
          if (this.flag == true) {
            clearInterval(time)
          }
          this.timeDown()
        }, 100)
      },
      timeDown() {
        const endTime = new Date(this.settime);
        const nowTime = new Date();
        let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
        let d = parseInt(leftTime / (24 * 60 * 60));
        let h = this.formate(parseInt(leftTime / (60 * 60) % 24));
        let m = this.formate(parseInt(leftTime / 60 % 60));
        let s = this.formate(parseInt(leftTime % 60));
        if (leftTime <= 0) {
          this.flag = true;
          alert("时间到，停止作答");
        }
        this.keepTime = `${h}:${m}:${s}`;
      },
      formate(time) {
        return time < 10 ? `0${time}` : time;
        // if (time >= 10) {
        //     return time
        // } else {
        //     return `0${time}`
        // }
      },
      getExam() {
        let that = this;
        axios.get("/exam/getExamById?examId=4").then(res => {
          console.log(res.data);
          that.exam = res.data;
        });
      },
      getExamInfo() {
        let that = this;
        axios.get("/examInfo/getExamInfoById?examInfoId=5").then(res => {
          console.log(res.data);
          that.examInfo = res.data;
        });
      },
      getChoice() {
        let that = this;
        axios.get("/home/exam/getQuesList?examInfoId=5").then(res => {
          console.log(res.data);
          // console.log(res.data.choice);   输出选择题
          that.choicelist = res.data.choice;    //拿到所有题目
          that.blanklist = res.data.blankQues;
          that.shortlist = res.data.shortQues;
          that.proBlanklist = res.data.proBlank;
          that.programlist = res.data.program;
          console.log(that.choicelist);
          that.myloading = false;
          that.StartCountDown();
          that.num1 = that.exam.choiceNum;    //拿到题目的数量
          that.num2 = that.exam.blankNum;
          that.num3 = that.exam.shortNum;
          that.num4 = that.exam.proBlankNum;
          that.num5 = that.exam.programNum;
          that.setChoiceAnswer(that.num1);   //设置 答案空对象
          that.setbAnswer(that.num2);
          that.setsAnswer(that.num3);
          that.setpbAnswer(that.num4);
          that.setproAnswer(that.num5);
        });
        // that.num1 = that.exam.choiceNum;    //拿到题目的数量
        // that.num2 = that.exam.blankNum;
        // that.num3 = that.exam.shortNum;
        // that.num4 = that.exam.proBlankNum;
        // that.num5 = that.exam.programNum;
        // that.setChoiceAnswer(that.num1);   //设置 答案空对象
        // that.setbAnswer(that.num2);
        // that.setsAnswer(that.num3);
        // that.setpbAnswer(that.num4);
        // that.setproAnswer(that.num5);
      },
      arrconcat() {   //将答案数组连接成一个
        let that = this;
        that.allAnswers = that.canswers.concat(that.banswers).concat(that.sanswers).concat(that.pbanswers).concat(that.proanswers);
      },
      get_radio_value(index) {   //选择题
        let that = this;
        // 获取当前radio当前值
        console.log(index + 1 + "题" + that.checkedc[index]);
        let ans = that.checkedc[index];
        that.canswers[index].ans = ans; //赋值给 答案数组
        console.log(index + 1 + "题" + that.canswers[index].ans);
      },
      get_bla_value(index) {
        let that = this;
        let ans = that.checkedb[index];
        that.banswers[index].ans = ans; //赋值给 答案数组
        console.log(index + 1 + "题" + that.banswer[index].ans);
      },
      get_short_value(index) {   //简答题
        let that = this;
        let ans = that.checkeds[index];
        that.sanswers[index].ans = ans; //赋值给 答案数组
      },
      get_pb_value(index) {
        let that = this;
        let ans = that.checkedpb[index];
        that.pbanswers[index].ans = ans; //赋值给 答案数组   程序填空
      },
      get_pro_value(index) {
        let that = this;
        let ans = that.checkedpro[index];
        that.proanswers[index].ans = ans; //赋值给 答案数组  编程题
      },
      setChoiceAnswer(n) {   //选择题
        let that = this;
        for (var i = 0; i < n; i++) {
          that.canswers.push({ examInfoId: that.examInfoId, id: that.choicelist[i].choiceId, type: 1, ans: "null" });
        }
        console.log("choiceAnswer:");
        console.log(that.canswers);
      },
      setbAnswer(n) {   //填空
        let that = this;
        for (var i = 0; i < n; i++) {
          that.banswers.push({ examInfoId: that.examInfoId, id: that.blanklist[i].blankQuesId, type: 2, ans: "null" });
        }
      },
      setsAnswer(n) {
        let that = this;
        for (var i = 0; i < n; i++) {
          that.sanswers.push({ examInfoId: that.examInfoId, id: that.shortlist[i].shortQuesId, type: 3, ans: "null" });
        }
        console.log("choiceAnswer:");
        console.log(that.canswers);
      },
      setpbAnswer(n) {   //程序填空
        let that = this;
        for (var i = 0; i < n; i++) {
          that.pbanswers.push({ examInfoId: that.examInfoId, id: that.proBlanklist[i].proBlankId, type: 4, ans: "null" });
        }
      },
      setproAnswer(n) {   //编程题
        let that = this;
        for (var i = 0; i < n; i++) {
          that.proanswers.push({ examInfoId: that.examInfoId, id: that.programlist[i].programId, type: 5, ans: "null" });
        }
      },

      submitPaper() {
        confirm("确定交卷吗？")
      },
      //  题目的id
      generateCId(index) {
        return "q_0_" + (index + 1);
      },
      // 答题卡对应的id
      generateCq(index) {
        return "#q_0_" + index;
      },
      // goAnchor(selector) {
      //   let that = this;
      //   let anchor = that.$el.querySelector(selector)
      //   document.documentElement.scrollTop = anchor.offsetTop
      // },
      // myAnchor(selector) {
      //   document.querySelector(selector).scrollIntoView(true);
      // },
      sum(a, b) {
        return a * b;
      },
      onSubmit() {
        let that = this;
        that.arrconcat();  //将答案数组连接
        //let date = { 11: "A", 14: "C", 17: "B", 18: "B", 22: "A", 23: "B", 26: "B", 27: "B", 29: "C", 34: "D" };
        let date = that.allAnswers;
        let formData = JSON.stringify(date);
        console.log(formData);

        axios.post('/home/exam/arrtest', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            if (res.data == 1) {
              that.$message({
                type: "success",
                message: "交卷成功!"
              });
            } else {
              alert("交卷失败。");
            }
            console.log(res);
            this.$router.push({
              name: "Exam"
            });
          });
      },
      //锚点跳转
      trun(anc) {
        console.log(anc);
        let ele = document.getElementById(anc);
        console.log(ele);
        let top = ele.getBoundingClientRect().top;  //返回相对视口的位置 
        window.scrollTo(10, top);
      },


    }
  };
</script>

<style scoped>
  .startExam {
    margin: 20px auto;
    padding: 15px 30px;
    background: white;
    width: 95%;
    /* height: 600px; */
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  /*nr start*/
  .test_main {
    width: 1200px;
    margin: 15px auto 0;
    /* 考题与名称的距离*/
  }

  .nr_left {
    width: 900px;
    height: 100%;
    float: left;
  }

  .test {
    width: 100%;
    border: 1px solid #e4e4e4;
    text-align: left;
    float: left;
  }

  .test_title {
    width: 900px;
    height: 45px;
    line-height: 45px;
    background-color: #f7f7f7;
    position: fixed;
    bottom: 0;
    z-index: 1000;
  }

  .test_title p {
    padding: 0 20px;
    display: block;
    float: left;
  }

  .test_time {
    color: #f00;
    line-height: 45px;
  }

  .test_time i {
    font-size: 20px;
    height: 45px;
    line-height: 40px;
    display: block;
    float: left
  }

  .test_time b {
    font-size: 16px;
    height: 45px;
    display: block;
    float: left;
    margin-left: 10px;
  }

  .test_dtk {
    line-height: 45px;
  }

  .test_dtk i {
    font-size: 22px;
    height: 45px;
    line-height: 45px;
    display: block;
    float: left;
    color: #389fc3;
  }

  .test_dtk span {
    font-size: 14px;
    height: 45px;
    display: block;
    float: left;
    margin-left: 10px;
  }

  .test_title font {
    width: 80px;
    height: 45px;
    display: block;
    float: right;
    text-align: center;
  }

  .test_title font input {
    background: #389fc3;
    border: none;
    display: block;
    width: 80px;
    height: 45px;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }

  .test_title font input:active {
    background: #79aef0;
  }

  .test_content {
    width: 100%;
    height: auto;
    margin-top: 15px;
  }

  .test_content_title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #f7f7f7;
    text-align: center;
  }

  .test_content_title h2 {
    padding: 0 30px;
    font-size: 16px;
    font-weight: normal;
    display: block;
    float: left
  }

  .test_content_title p {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    background: #389fc3;
    color: #fff;
    border-radius: 30px;
    display: block;
    float: left;
    margin-top: 5px;
  }

  .test_content_nr {
    width: 100%;
    border-top: 3px solid #efefef;
  }

  .test_content_nr>ul>li {
    width: 100%;
    border-bottom: 5px solid #efefef;
    padding-top: 10px;
  }

  .test_content_nr_tt {
    width: 85%;
    height: auto;
    line-height: 32px;
    margin: 0 auto;
    border-bottom: 1px solid #e4e4e4;
  }

  .test_content_nr_tt i {
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    display: block;
    float: left;
    background: #5d9cec;
    border-radius: 50%;
    margin-left: -50px;
    color: #fff;
    margin-top: 8px;
    font-size: 16px;
  }

  .test_content_nr_tt span {
    padding: 0 8px;
  }

  .test_content_nr_tt font {
    font-size: 14px
  }

  .test_content_nr_tt b {
    display: block;
    float: right;
    margin-right: -50px;
    color: #f48c27;
    font-size: 20px;
  }

  .test_content_nr_main {
    width: 85%;
    margin: 0 auto;
    padding: 10px 0;
    height: auto;
  }

  .option {
    line-height: 32px;
    display: block;
    background: #fff;
    color: #666;
  }

  .option:hover {
    background: #e4e4e4;
  }

  .option input {
    width: 20px;
    height: 20px;
    display: block;
    float: left;
    margin: 10px 10px 0 0;
  }

  .option label {
    height: auto;
    display: block;
  }

  .test_more_nr_main {
    width: 85%;
    margin: 0 auto;
    padding: 10px 0;
  }

  .multiple {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: block;
    background: #fff;
    margin-bottom: 3px;
  }

  .multiple:hover {
    background: #e4e4e4;
  }

  .multiple dd input {
    width: 20px;
    height: 20px;
    display: block;
    float: left;
    margin: 10px 10px 0 0;
  }

  .multiple dd label {
    width: 725px;
    height: 40px;
    display: block;
    float: left;
  }

  .test_click {
    background: #7aaff3;
  }

  .test_click a {
    color: #fff;
  }

  /*nr_right start*/
  .nr_right {
    width: 280px;
    height: 100%;
    float: right;
  }

  .nr_rt_main {
    width: 100%;
    height: auto;
  }

  .rt_nr1 {
    width: 280px;
    position: fixed;
    top: 85px;
    /* 答题卡与顶部的距离*/
    z-index: 1000;
  }

  .rt_nr1_title {
    width: 280px;
    height: 45px;
    line-height: 45px;
    background: #f3f3f3;
  }

  .rt_nr1_title h1 {
    width: 130px;
    height: 45px;
    background: #389fc3;
    text-align: center;
    font-size: 14px;
    display: block;
    float: left;
    color: #fff;
  }

  .rt_nr1_title h1 i {
    padding: 0 5px;
    font-size: 14px;
    font-weight: normal;
  }

  .rt_nr1_title p {
    width: 141px;
    height: 43px;
    padding-right: 8px;
    border: 1px solid #e4e4e4;
    border-left: 0;
    display: block;
    float: right;
  }

  .rt_nr1_title p i {
    margin-left: 10px;
  }

  .rt_content {
    width: 278px;
    height: 100%;
    border: 1px solid #e4e4e4;
    border-top: 0;
  }

  .rt_content_tt {
    width: 95%;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    border-bottom: 1px solid #e4e4e4;
  }

  .rt_content_tt h2 {
    width: 150px;
    font-size: 18px;
    display: inline-block;
    padding-left: 8px;
  }

  .rt_content_tt p {
    width: 100px;
    display: inline-block;
  }

  .answerSheet ul {
    padding: 10px;
    text-align: left;
  }

  .answerSheet li {
    display: inline-block;
    /* margin-bottom: 5px; */
    margin: 5px 5px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #e4e4e4;
  }

  .answerSheet li:hover {
    cursor: pointer;
  }

  .answerSheet li a {
    display: block;
  }

  .answerSheet li:hover {
    color: #389fc3;
    border-color: #389fc3;
  }

  .rt_more {
    width: 278px;
    height: 100%;
    border: 1px solid #e4e4e4;
    border-top: 0;
  }

  .rt_more_tt {
    width: 95%;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    border-bottom: 1px solid #e4e4e4;
  }

  .rt_more_tt h2 {
    width: 150px;
    font-size: 14px;
    display: inline-block;
  }

  .rt_more_tt p {
    width: 100px;
    display: inline-block;
  }

  .rt_more_nr ul {
    padding: 10px;
    text-align: left;
  }

  .rt_more_nr ul li {
    display: inline-block;
    margin: 5px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #e4e4e4;
  }


  /*nr_right end*/
  /*nr end*/

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    overflow: auto;
    font-size: 12px;
    margin: 0;
    padding: 0;
    font-family: "微软雅黑";
    background: #fff;
    text-align: center;
  }

  ul,
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #666;
  }

  a:hover {
    text-decoration: none;
  }

  .hover {
    background: #0f6c8d;
  }

  i {
    font-style: normal;
  }



  #active {
    font-size: 12px;
    color: #289cd5;
    font-weight: bold;
  }

  .course_main {
    width: 100%;
    height: 100%;
  }

  /*top start*/
  .top {
    width: 100%;
    height: 90px;
    background: #fff;
    color: #000;
  }

  .top_nr {
    width: 1200px;
    margin: 0 auto;
  }

  .top_left {
    height: 90px;
    float: left;
  }



  .top_left h1 {
    line-height: 100px;
    display: block;
    float: left;
    font-size: 28px;
  }

  .top_right {
    height: 90px;
    float: right;
    line-height: 90px;
    padding-right: 10px;
  }

  .top_right a {
    padding: 0 10px;
    color: #000;
    font-size: 14px;
    display: block;
    float: left;
  }

  .top_right a span {
    padding-right: 5px;
    display: block;
    float: left;
  }

  .top_right a i {
    color: #f00;
    padding: 0 5px;
    display: block;
    float: left;
  }

  .top_right a b {
    display: block;
    float: left;
  }

  .top_right a img {
    margin-top: 30px;
    display: block;
    float: left;
  }

  /*top end*/
  /*nav start*/
  .nav {
    width: 100%;
    height: 50px;
    background: #389fc3;
    margin-top: 15px;
  }

  .nav_nr {
    width: 1200px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    font-size: 14px;
  }

  .nav_nr ul {
    display: block;
    margin: 0;
  }

  .nav_nr ul li {
    height: 50px;
    display: block;
    float: left;
  }

  .nav_nr ul li a {
    color: #fff;
    display: block;
    height: 50px;
    float: left;
    padding: 0 20px;
  }

  .nav_nr ul li a:hover {
    text-decoration: none;
  }

  .nav_nr i {
    color: #fff;
    display: block;
    float: left;
  }

  /*分页 start*/
  .fy {
    width: 100%;
    height: 50px;
    margin-left: 15px;
    margin-top: 10px;
    float: left;
  }

  /*分页 end*/
  /*百分比进度 start*/
  .easyPieChart {
    position: relative;
    text-align: center;
  }

  .easyPieChart canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  .foot {
    width: 100%;
    height: 50px;
    clear: both;
  }
</style>