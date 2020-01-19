<template>
  <div @click="visible=false" @contextmenu.prevent>
    <!-- 整个内容区 -->
    <div class="content">
      <div style="justify-content:space-between ;padding:2%;display:flex" v-for="i in 5" :key="i">
        <el-card shadow="hover" style="width:24%;" class="box-card">
          <!-- 一个课程 -->
          <div @contextmenu.prevent @click.right="rightClick($event,i)">
            <div>
              <img style="width:100%;height:150px;" src="http://47.94.166.187:70/cwh_pics/ad.jpg" />
            </div>
            <!-- 标题 -->
            <div class="title">JAVA入门基础{{i}}</div>

          
          </div>
          <!-- /一个课程 -->
        </el-card>
        <div style="width:70%;">
          <el-card class="box-card" shadow="never" style="width:100%">
            <div slot="header">
              <span>JAVA入门基础{{i}}</span>
              <el-button style="float: right; padding: 3px 0" type="text">编辑课程</el-button>
              <el-button style="float: right; padding: 3px 3px" type="text">删除课程</el-button>
              <el-button style="float: right; padding: 3px 3px" type="text">添加课程</el-button>
            </div>
            <div style="font-size:14px">
              介&emsp;&emsp;绍：一个 Java 程序可以认为是一系列对象的
              集合，而这些对的集。 简要介绍下类、对 象
              、方法和实个 Java 程序可以认为是一系列对象的
              集合，而这些对的集。简要介绍下类、对象、
              方法和实例变量的概括。
              <br />创建&emsp;者：陈一一
              <!-- <br />任课老师：陈一一    （该课程已被李二二、张三三添加） -->
              <br />学&emsp;&emsp;时：64
              <br />学&emsp;&emsp;分：2.0
              <br />性&emsp;&emsp;质：必修课
              <br />创建时间：20200101-01:15:22
              <br />课程时间：大四第一学期
              <br />课程目录：查看
              <hr />

              

              <div >
                <span>该课程使用者</span>
                <el-carousel height="120px">
                  <el-carousel-item style="padding-left:20%;" v-for="item in 3" :key="item">
                    <br />教师：陈一一
              <br />课程状态：进行（截至06-05，80%进度考试）
              <br />考试时间：2020-50-15 15：00
              <br />教学班级：16软工1，2班
              <br />
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            
          </el-card>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  name: "ShareClass",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.detail {
  width: 400px;
  /* height: 220px; */
  z-index: 99999;
  background: white;
  border: 1px solid;
  position: fixed;
}

.bottom-content {
  font-size: 12px;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}

.title {
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}
.box-card {
  width: 300px;
}
</style>
