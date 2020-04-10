<template>
  <div class="examedPaper">
    <el-button type="primary" plain icon="el-icon-caret-left" @click="routeJump('ErrorSet')">返回</el-button>
    <div>
      <div class="nr_left">
        <div class="nr_title">已考试卷-java期末考试</div>
        <div>
          <div style="padding-top: 10px;">
            选择题 
            <ul>
              <li>
                <div>
                  <i>1、</i><span>(2分)</span><font>需要在虚拟机中执行的代码是（  ）</font>
                </div>
                <div>
                  <ul>
                    <li>A.Java代码</li>
                    <li>B.c代码</li>
                    <li>C.c++代码</li>
                    <li>D.php代码</li>
                  </ul>
                </div>
                <div>答案：A</div>
              </li>
            </ul>
            <ul>
              <li>
                <div>
                  <i>2、</i><span>(2分)</span><font>需要在虚拟机中执行的代码是（  ）</font>
                </div>
                <div>
                  <ul>
                    <li>A.Java代码</li>
                    <li>B.c代码</li>
                    <li>C.c++代码</li>
                    <li>D.php代码</li>
                  </ul>
                </div>
                <div>答案：A</div>
              </li>
            </ul>
          </div>

          <div style="padding-top: 10px;">
            填空题
            <ul>
              <li>
                <div>
                  <i>1、</i><span>(5分)</span><font>Java源程序中只能有一个类是()类，并且这个类必须与源文件名同名。</font>
                </div>
                <div>答案：public</div>
              </li>
            </ul>
          </div>

          <div style="padding-top: 10px;">
            简答题
            <ul>
              <li>
                <div>
                  <i>1、</i><span>(5分)</span><font>包的作用是：</font>
                </div>
                <div style="padding-top: 10px;">答案：<br>
                  将功能相近的类放到同一个包中，可以方便查找和使用； <br>
                  在一定程度上避免命名冲突。
                </div>
              </li>
            </ul>
          </div>
          
          <div style="padding-top: 10px;">
            程序填空题
            <ul>
              <li>
                <div>
                  <i>1、</i><span>(10分)</span><font>以下程序要求从键盘输入一个整数，判别该整数为几位数，<br/>并输出结果，请将下面的程序填写完整。<br/>
                    public class Blank1 {  <br>
                      public static void main(String[] args) throws IOException { <br>
                        Scanner sc=new Scanner(      （1）        ); <br>
                        int count=0,t;   <br>
                        int x=sc.nextInt();<br>
                        sc.close();   <br>
                        t=x; <br>
                        while(t!=0){   <br>
                           count++;  <br>
                          （2）        ;  <br>
                        } <br>
                        System.out.println(x+"是"+count+"位数。"); <br>
                      } <br>
                    } <br>
                  </font>
                </div>
                <div style="padding-top: 10px;">答案：<br>
                  (1):System.in <br>
                  (2):t=t/10
                </div>
              </li>
            </ul>
          </div>
          <div style="padding-top: 10px;">
            编程题
            <ul>
              <li>
                <div>
                  <i>1、</i><span>(15分)</span><font>判断101-200之间有多少个素数，并输出所有素数。<br>程序分析：判断素数的方法：用一个数分别去除2到sqrt(这个数)，<br>如果能被整除， 则表明此数不是素数，反之是素数。   </font>
                </div>
                <div style="padding-top: 10px;">参考程序：<br>
                  <pre>
                    <code>
                      public class lianxi02 {
                        public static void main(String[] args) {   
                            int count = 0;   
                            for (int i = 101; i < 200; i += 2) {    
                                boolean b = false;    
                                for (int j = 2; j <= Math.sqrt(i); j++)     {       
                                    if (i % j == 0) {
                                        b = false;
                                        break;
                                    }        
                                    else           {
                                        b = true;
                                    }    
                                }       
                                if (b == true) {
                                    count++;
                                    System.out.println(i);
                                }                                 
                            }   
                            System.out.println("素数个数是: " + count);
                        }
                     }
                    </code>
                  </pre>
                </div>
              </li>
            </ul>
          </div>


        </div>
      </div>
      <div class="nr_right">
        <div class="nr_right_title">
          <h3>答题卡</h3>
        </div>
        <div class="rn_content">
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="foot"></div>
    </div>

  </div>
</template>


<script>
export default {
  name: "examedPaper",
  data() {
    return {
      msg: "考试系统-学生-章节测试。",
    };
  },
  methods: {
    routeJump(e) {
      // console.log(e);
      if (e == "ErrorSet")
        this.$router.push({ name: "ErrorSet" });
    }
  }
};
</script>

<style scoped>
.examedPaper{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  /* height: 600px; */
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.nr_left{
  width: 900px;
    height: 100%;
    float: left;
}

.nr_title{
  border-width: 0px;
    /* position: absolute;
    left: 0px;
    top: -14px; */
    font-size: 30px;
    text-align: center;
    width: 792px;
    height: 90px;
}

.nr_right{
  width: 280px;
  height: 100%;
  float: right;
}

.nr_right_title{
  width: 280px;
    position: fixed;
    top: 80px;
    z-index: 1000;
}

.foot{
  width: 100%;
    height: 50px;
    clear: both;
}
</style>
