// 学生

<template>
  <div class="homebody" @click="visible=false" @contextmenu.prevent>
    <el-tabs tab-position="up">
      <el-tab-pane :label="msg">
        <!--  -->

        <!-- 右击详情 -->
        <div v-if="visible" :style="{top:Axis.y+'px',left:Axis.x+'px'}" class="detail">
          <div style="font-size:14px">
          名称：JAVA入门基础{{Axis.index}}<br>
          介绍：一个 Java 程序可以认为是一系列对象的
          集合，而这些对的集。 简要介绍下类、对 象
          、方法和实个 Java 程序可以认为是一系列对象的
          集合，而这些对的集。简要介绍下类、对象、
          方法和实例变量的概括。<br><br>
          任课老师：陈一一<br>
          学时：64<br>
          学分：0.0<br>
          性质：公开课<br>
          创建时间：20200115 01:15:22<br>
          课程时间：永久20200101-20201122<br>
          课程状态：进行<br>
          </div>
        </div>

        <!-- 整个内容区 -->
        <div class="content">
          <el-card
            shadow="hover"
            style="width:29%;margin:2%"
            v-for="i in 9"
            :key="i"
            class="box-card"
          >
            <!-- 一个课程 -->
            <div @contextmenu.prevent @click.right="rightClick($event,i)">
              <div>
                <img style="width:100%;height:200px;" src="http://134.175.238.145:70/example.jpg" />
              </div>
              <!-- 标题 -->
              <div class="title">JAVA入门基础{{i}}</div>

              <div class="bottom-content">
                <div>陈老师</div>
                <div style="display:flex;">
                  <div>赞2664</div>&ensp;
                  <div>回复7654</div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <!--  -->
      </el-tab-pane>

      <div style="text-align:center">
        <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
      </div>
    </el-tabs>
  </div>
</template>




<script>
export default {
  name: "Homebody",
  data() {
    return {
      msg: "公开课(右击查看详情)",
      Axis: { x: 0, y: 0, index: null }, //坐标和对象
      visible: false //展示右击菜单
    };
  },
  methods: {
    rightClick(e, index) {
      this.Axis = { x: e.x, y: e.y, index: index };
      this.visible = true;
    }
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
  position:fixed

}

.homebody {
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  cursor:pointer
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
