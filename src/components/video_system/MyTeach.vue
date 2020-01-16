<template>
  <div class="my-teach" @click="visible=false" @contextmenu.prevent>
    <el-tabs tab-position="up">
      <el-tab-pane :label="msg">
        <!--  -->

        <!-- 整个内容区 -->
        <div class="content">
          <div
            style="justify-content:space-between ;padding:2%;display:flex"
            v-for="i in 3"
            :key="i"
          >
            <el-card shadow="hover" style="width:24%;" class="box-card">
              <!-- 一个课程 -->
              <div @contextmenu.prevent @click.right="rightClick($event,i)">
                <div>
                  <img
                    style="width:100%;height:150px;"
                    src="http://47.94.166.187:70/cwh_pics/ad.jpg"
                  />
                </div>
                <!-- 标题 -->
                <div class="title">JAVA入门基础{{i}}</div>

                <div class="bottom-content">
                  <div>陈一一</div>
                  <div style="display:flex;">
                    <div>赞2664</div>&ensp;
                    <div>回复7654</div>
                  </div>
                </div>
              </div>
              <!-- /一个课程 -->
            </el-card>
            <div style="width:70%;">
              <el-card class="box-card" shadow="never" style="width:100%">
                <div slot="header">
                  <span>JAVA入门基础{{i}}</span>
                  <el-button style="float: right; padding: 3px 0" type="text">编辑课程</el-button>
                </div>
                <div style="font-size:14px">
                  介&emsp;&emsp;绍：一个 Java 程序可以认为是一系列对象的
                  集合，而这些对的集。 简要介绍下类、对 象
                  、方法和实个 Java 程序可以认为是一系列对象的
                  集合，而这些对的集。简要介绍下类、对象、
                  方法和实例变量的概括。
                  <br />创建&emsp;者：陈一一（创建者）
                  <br />任课老师：陈一一、李二二、张三三
                  <br />学&emsp;&emsp;时：64
                  <br />学&emsp;&emsp;分：2.0
                  <br />性&emsp;&emsp;质：必修课
                  <br />创建时间：20200101-01:15:22
                  <br />课程时间：20200101-20200501
                  <br />课程状态：进行
                  <br />教学班级：
                  陈一一：16软工1，2班
                  <br />&emsp;&emsp;&emsp;&emsp;&emsp;李二二：16软件工程三班
                  <br />&emsp;&emsp;&emsp;&emsp;&emsp;站三三：暂无添加
                  <br />
                </div>
              </el-card>
            </div>
          </div>
        </div>
        <!-- /整个内容区  -->

        <div style="text-align:center">
          <el-pagination layout="prev, pager, next" :total="10"></el-pagination>
        </div>
        <!--  -->
      </el-tab-pane>
      <el-tab-pane label="新建课程">
        <v-NowCourse></v-NowCourse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>




<script>
import NowCourse from "@/components/video_system/my_teach/NewCourse.vue";

export default {
  name: "MyTeach",
  data() {
    return {
      msg: "我教的课程",
      Axis: { x: 0, y: 0, index: null } //坐标和对象
    };
  },
  methods: {
    rightClick(e, index) {
      this.Axis = { x: e.x, y: e.y, index: index };
      this.visible = true;
    }
  },
  components: {
    "v-NowCourse": NowCourse
  }
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

.my-teach {
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
.content {
  /* display: flex; */
  flex-direction: row;
  flex-wrap: wrap;
  cursor: pointer;
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
