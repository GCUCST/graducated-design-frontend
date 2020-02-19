<template>
  <div>
<!-- 学生 -->
<v-AddClass v-show="showAddClassPanel"></v-AddClass>

<!--  学生 -->
    <!-- 整个内容区 -->
    <div class="content">
      <div v-for="(item,i) in courseObjects" :key="i">
        <div v-if="item.status=='进行中'" style="justify-content:space-between ;padding:2%;display:flex">
          <el-card shadow="hover" style="width:24%;" class="box-card">
            <el-tabs stretch>
              <el-tab-pane label="封面">
                <!-- 一个课程 -->
                <div>
                  <div>
                    <img
                      style="width:100%;height:150px;"
                      src="http://134.175.238.145:80/example.jpg"
                    />
                  </div>
                  <!-- 标题 -->
                  <div class="title">{{item.title}}</div>
                  <div class="bottom-content">
                    <div>{{item.author}}</div>
                    <div style="display:flex;">
                      <div>赞{{item.like}}</div>&ensp;
                      <div>回复{{item.reply}}</div>
                    </div>
                  </div>
                </div>
                <!-- /一个课程 -->
              </el-tab-pane>
              <el-tab-pane label="目录">
                <el-tree :data="item.catalogData" :props="defaultProps"></el-tree>
              </el-tab-pane>
            </el-tabs>
          </el-card>

          <div style="width:70%;">
            <el-card class="box-card" shadow="never" style="width:100%">
              <div slot="header">
                <span>{{item.title}}</span>
                <el-button @click="unrelease(i)" style="float: right; padding: 3px 0" type="text">挂起</el-button>
              </div>
              <div style="font-size:14px">
                介&emsp;&emsp;绍：{{item.introduce}}
                <br />
                创建&emsp;者：{{item.author}}
                <br />
                学&emsp;&emsp;时：{{item.courseHour}}
                <br />
                学&emsp;&emsp;分：{{item.credit}}
                <br />
                性&emsp;&emsp;质：{{item.courseType}}
                <br />
                创建时间：{{item.createTime}}
                <br />
                课程时间：{{item.date}}
                <hr />
                <br />
                课程状态：{{item.status}}
                <br />
                其他提示：{{item.tips}}
                         
                <br />
                考试时间：{{item.examTime}}
                <br />
                教&emsp;&emsp;师：{{item.author}}
                <br />
                教学班级： 
                {{item.class}} <el-button @click="lookClass(item.student)">查看</el-button> 
                <br />
                课程共享：{{item.share==0?'否':'是'}}
                <br />

                <br />
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <!-- /整个内容区  -->

   
    <!--  -->
  </div>
</template>




<script>
import VueBus from "../../../utils/VueBus.js"
import AddClass from "../my_teach/AddClass.vue"
export default {
  name: "ShareClass",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      msg: "1",
      showAddClassPanel:false,
      courseObjects: JSON.parse(localStorage.getItem("courseObjects"))
    };
  },
  mounted() {
    console.log(localStorage.getItem("courseObjects"));
    var that = this
    VueBus.$on("closeAddClass",function(data){
        that.showAddClassPanel = false;
         that.courseObjects=JSON.parse(localStorage.getItem("courseObjects"))
    })
  },
  methods: {
    unrelease(index)
    {
       console.log(index)
        var courseObjects =  JSON.parse(localStorage.getItem("courseObjects"))
        courseObjects[index].status = "待发布"
         localStorage.setItem("courseObjects",JSON.stringify(courseObjects))
        this.courseObjects=JSON.parse(localStorage.getItem("courseObjects"))
    },
    addClass(index){
      localStorage.setItem("courseIndex",index)
      this.showAddClassPanel = true;
    },

    lookClass(array){
       alert(JSON.stringify(array))
    }
  },
  components:{
    "v-AddClass":AddClass
  },
  beforeDestroy(){

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
