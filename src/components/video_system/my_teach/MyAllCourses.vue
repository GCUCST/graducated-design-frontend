<template>
  <div>
<!-- 学生 -->
<v-AddClass v-show="showAddClassPanel"></v-AddClass>

<!--  学生 -->
    <!-- 整个内容区 -->
    <div class="content">
      <div v-for="(item,i) in courseObjects" :key="i">
        <div v-if="item.status=='待发布'" style="justify-content:space-between ;padding:2%;display:flex">
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
                <el-button @click="release(i)" style="float: right; padding: 3px 0" type="text">发布</el-button>
                <el-button @click="delCourse(i)" style="float: right; padding:3px 20px" type="text">删除</el-button>
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
                其他提示：<span v-if="item.tips==null"><el-button  type="mini"> 添加</el-button></span>
                         
                <br />
                考试时间：<span v-if="item.examTime==null"><el-button  type="mini"> 添加</el-button></span>
                <br />
                教&emsp;&emsp;师：{{item.author}}
                <br />
                教学班级： 
                 <span v-if="item.class!=null" >{{item.class}} <el-button @click="lookClass(item.students)">查看</el-button> <el-button @click="delClass(i)">删除</el-button></span>
                <span v-if="item.class==null" ><el-button @click="addClass(i)">添加</el-button></span>
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
    release(index)
    {
       console.log(index)
        var courseObjects =  JSON.parse(localStorage.getItem("courseObjects"))
       if(courseObjects[index].students.length==0||courseObjects[index].class=="null")
       {
         alert("添加班级")
         return;
        }
       courseObjects[index].status = "进行中"
      localStorage.setItem("courseObjects",JSON.stringify(courseObjects))
        this.courseObjects=JSON.parse(localStorage.getItem("courseObjects"))


    },
    addClass(index){
      localStorage.setItem("courseIndex",index)
      this.showAddClassPanel = true;
    },
    delClass(index){
    
     var courseObjects =  JSON.parse(localStorage.getItem("courseObjects"))
     courseObjects[index].class = null
     courseObjects[index].students = []
     localStorage.setItem("courseObjects",JSON.stringify(courseObjects))
    this.courseObjects=JSON.parse(localStorage.getItem("courseObjects"))

    },
    delCourse(index){
        var courseObjects = JSON.parse(localStorage.getItem("courseObjects"))
        var a = courseObjects.splice(index,1)
        console.log(courseObjects)
        localStorage.setItem("courseObjects",JSON.stringify(courseObjects))
        this.courseObjects = courseObjects
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
