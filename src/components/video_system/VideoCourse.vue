<template>
  <div class="video-course">
    <el-page-header @back="goBack"></el-page-header>

    <div style="width:100%">
      <div style="display:flex; justify-content:space-between">
        <div style="width:20%;text-align:left;line-height:45px;">如何精通JAVA1</div>
        <div style="width:20%;text-align:center">
          <img
            style="line-height:60px;height:45px;width:45px;"
            src="http://134.175.238.145:70/example.jpg"
          />
          <span style="line-height:45px;">CST先生</span>
        </div>
      </div>

      <el-divider></el-divider>

      <div style="width:100%">
        <div style="width:100%;display:flex; justify-content:space-between">
          <div style="width:100%">
            <div style="width:100%;text-align:center">
              <video
                @mouseover="mouseOver"
                @mouseleave="mouseLeave"
                :class="[video_full?'video-big':'video-small']"
                controls="controls"
                id="qnv"
                src="http://134.175.238.145:70/example.mp4"
              >您的视频开始</video>
              <br />
              <div style="display:flex;justify-content:space-between">
                <span>
                  <el-button plain type="primary">点赞</el-button>
                  <el-button plain type="primary">评论</el-button>
                </span>
                <el-button
                  style="margin-right:10%;"
                  @click="video_full=!video_full"
                  plain
                  type="primary"
                >网页全屏</el-button>
              </div>
            </div>
          </div>

          <transition name="custom-classes-transition" enter-active-class="animated bounceInRight">
            <div style="width:35%" v-show="!video_full">
              <el-tabs style="height:100%" type="border-card" stretch>

                <el-tab-pane label="章节">
                  <el-tree :data="data" :props="defaultProps" 
                  @node-click="handleNodeClick">
                  </el-tree>
                </el-tab-pane>


                <el-tab-pane label="笔记本">笔记本</el-tab-pane>
              </el-tabs>
            </div>
          </transition>
        </div>
      </div>

      <!-- -----------作为评论分割线----------------------- -->
      <el-divider></el-divider>
      <el-tabs>
        <el-tab-pane label="热度排序" name="first"></el-tab-pane>
        <el-tab-pane label="时间排序" name="second"></el-tab-pane>
      </el-tabs>

      <div style="display:flex;margin:20px;line-height:40px;height:40px;">
        <div>
          <el-avatar src="http://134.175.238.145:70/example.jpg"></el-avatar>
        </div>
        <div style="margin-left:40px">
          <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
        </div>
        <div style="margin-left:20px;">
          <el-button type="primary">发表</el-button>
        </div>
      </div>

      <el-divider></el-divider>

      <div style="text-align:left;margin-left:20px;">

        <div v-for="obj in comment" :key="obj.id">
        <div style="font-size:10px;color:grey;text-align:right">举报</div>
          
        <div style="display:flex;height:50px;">
           <span  > <el-avatar style="height:50px;width:50px;"  src="http://134.175.238.145:70/example.jpg"></el-avatar></span>
            <span  style="height:50px;line-height:50px;margin-left:20px">{{obj.nickName}}</span>
            
        </div>
        <br>
          <div style="margin-left:70px">
            {{obj.content}}
         </div>
        <br>

          <div style="text-align:right;">
            赞  {{obj.likeNum}}
            &nbsp;
            回复   {{obj.replyNum}}
         </div>

           <el-divider></el-divider>
       </div>

     </div>



      <!-- -----------/作为评论分割线----------------------- -->
    </div>
  </div>
</template>



<script>
export default {
  name: "VideoCourse",
  data() {
    return {
      input: "", //输入框内容
      msg: "课程页面",       //没用
      courseId: null,         //课程id
      video_full: false,     //全屏模式
      far: 0,                //视频最远进度

      comment:[
        {
          id:0,
          type:1,   //      1  或者 0   表达这是一条评论 或者 是一条回复     
          target:"001",    //回复的对象id    可以是  回复视频，也可以是一条回复
          avatar:"http://134.175.238.145:70/example.jpg",
          nickName:"陈少荣",
          content:"我觉得不错的视频！",
          likeNum:565,   //点赞数量
          replyNum:21,  //子回复数量
        },
        {
          id:2,
          type:1,   //      1  或者 0   表达这是一条评论 或者 是一条回复     
          target:"001",    //回复的对象id    可以是  回复视频，也可以是一条回复
          avatar:"http://134.175.238.145:70/example.jpg",
          nickName:"李薇薇",
          content:"我觉得很差视频！",
          likeNum:565,   //点赞数量
          replyNum:21,  //子回复数量
        }
      ],     //评论

      

      data: JSON.parse( localStorage.getItem("catalog")),
      defaultProps: {
        children: "children",
        label: "label"
      }


    };
  },
  methods: {
    goBack() {
      console.log("go back");
      this.$router.back(-1);
    },
    mouseOver: function() {
      console.log("鼠标进来了..");
    },
    mouseLeave: function() {
      console.log("鼠标出去了..");
      qnv.pause();
    },
    handleNodeClick(data) {
      console.log(data);
    }
  },
  mounted() {
    console.log("接受到：" + this.$route.query.courseId);
    this.courseId = this.$route.query.courseId;




    //防止进度条拉前
    let that = this;
    var sym; //实际进度
    var time; //拉的进度    //far是最远进度
    var qnv = document.querySelector("#qnv");
    var interval = setInterval(function() {
      try {
        time = qnv.currentTime;
        if (time - sym > 1 && time > that.far) {
          qnv.currentTime = that.far; //拉过头就跳到最远播放位置
        }
        sym = qnv.currentTime;

        if (sym > that.far) that.far = sym;
      } catch (error) {
        console.log("没有获取到视频资源:" + error);
        clearInterval(interval);
      }
    }, 500);

    var myVideo = document.getElementById("qnv");
    if (myVideo != null) {
      myVideo.oncanplay = function() {
        console.log("准备就绪");
      };
      //监听播放开始
      myVideo.addEventListener("play", function() {
        console.log("开始播放");
      });

      //监听播放结束
      myVideo.addEventListener("pause", function() {
        console.log("播放暂停");
      });

      //监听播放结束
      myVideo.addEventListener("ended", function() {
        console.log("播放结束");
      });

      var Media = document.getElementById("qnv");
      Media.addEventListener(
        "timeupdate",
        function() {
          var timeDisplay;
          //用秒数来显示当前播放进度
          timeDisplay = Math.floor(Media.currentTime);
          console.log(
            (Number(Media.currentTime) / Number(Media.duration)).toFixed(2)
          );
          //当视频播放到 4s的时候做处理
          if (timeDisplay == 4) {
            console.log("第四秒");
          }
        },
        true
      );
    }
  }
};
</script>

<style scoped>
.video-course {
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 100%;
  min-height: 600px;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}

/* .head-div {
  border: 1px solid;
  height: 150px;
  width: 100%;
  text-align: center;
} */
.body-div {
  border: 1px solid;
  height: 700px;
  width: 100%;
  text-align: center;
}
.video-small {
  width: 85%;
  text-align: center;
  object-fit: fill;
  height: 547px;
}
.video-big {
  margin: 0 auto;
  width: 100%;
  height: 750px;
  text-align: center;
  object-fit: fill;
}

video {
  transition: all 300ms ease-in-out 50ms;
  -o-transition: all 300ms ease-out 50ms; /*兼容parsto内核*/
  -moz-transition: all 300ms ease-in-out 50ms; /*兼容gecko内核*/
  -webkit-transition: all 300ms ease-in-out 50ms; /*兼容webkit内核*/
}
</style>
