<template>
  <div class="video-course">
    <el-page-header @back="goBack"></el-page-header>

    <div style="width:100%">
      <div style="display:flex; justify-content:space-between">
        <div style="width:20%;text-align:left;line-height:45px;">{{course?course.title:'加载中..'}}</div>
        <div style="width:20%;text-align:center">
          <img style="line-height:60px;height:45px;width:45px;" :src="course?course.cover:'null'" />
          <span style="line-height:45px;">{{course?course.author:'加载中'}}</span>
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
                :src="videoSrc"
                type="video/mp4"
              >
                您的浏览器不支持播放该视频！
                <!-- https://www.w3school.com.cn/i/movie.ogg -->
              </video>

              <br />
              <div style="display:flex;justify-content:space-between">
                <span>
                  <el-button plain type="primary">{{course?course.likeNum:0}}点赞</el-button>
                  <el-button plain type="primary">{{course?course.replyNum:0}}评论</el-button>
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
                <!-- :default-checked-keys="[this.progress.locateId]"  show-checkbox  -->
                <el-tab-pane label="章节">
                  <el-tree
                    node-key="id"
                    default-expand-all
                    :data="course?JSON.parse(course.catalogData):null"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                  ></el-tree>
                </el-tab-pane>

                <el-tab-pane label="我的进度">
                  <span v-for=" (item,index) in progress.catalog" :key="index">
                    <span style="cursor:pointer;" @click="jumpVideo(item.videoId)">{{item.label}}</span>
                    <!-- {{item.far}}---- -->
                    {{ item.percent+'%'}}
                    <br />
                    <br />
                  </span>
                </el-tab-pane>
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
          <el-avatar src="http://134.175.238.145:80/example.jpg"></el-avatar>
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
            <span>
              <el-avatar
                style="height:50px;width:50px;"
                src="http://134.175.238.145:80/example.jpg"
              ></el-avatar>
            </span>
            <span style="height:50px;line-height:50px;margin-left:20px">{{obj.nickName}}</span>
          </div>
          <br />
          <div style="margin-left:70px">{{obj.content}}</div>
          <br />

          <div style="text-align:right;">
            赞 {{obj.likeNum}}
            &nbsp;
            回复 {{obj.replyNum}}
          </div>

          <el-divider></el-divider>
        </div>
      </div>
      <!-- -----------/作为评论分割线----------------------- -->
    </div>
  </div>
</template>



<script>
import axios from "axios";
import UrlConfig from "../../config/UrlConfig.js";
export default {
  name: "VideoCourse",
  data() {
    return {
      courseId: null, //第一次进来课程id
      videoId: null, //第一次进来当前视频id

      videoSrc: null, //视频地址
      duration:0,
      video_full: false, //全屏模式
      course: null, //当前的课程
      far: 0, //视频最远进度
      //---------------------------------
      input: "", //输入框内容
      comment: [
        {
          id: 0,
          type: 1, //      1  或者 0   表达这是一条评论 或者 是一条回复
          target: "001", //回复的对象id    可以是  回复视频，也可以是一条回复
          avatar: "http://134.175.238.145:80/example.jpg",
          nickName: "陈少荣",
          content: "我觉得不错的视频！",
          likeNum: 565, //点赞数量
          replyNum: 21 //子回复数量
        },
        {
          id: 2,
          type: 1, //      1  或者 0   表达这是一条评论 或者 是一条回复
          target: "001", //回复的对象id    可以是  回复视频，也可以是一条回复
          avatar: "http://134.175.238.145:80/example.jpg",
          nickName: "李薇薇",
          content: "我觉得很差视频！",
          likeNum: 565, //点赞数量
          replyNum: 21 //子回复数量
        }
      ], //评论
      defaultProps: {
        //目录菜单
        children: "children",
        label: "label"
      },
      //------------最新
      catalogData: null, //当前目录数据

      progress: { videoId: null, catalog: [] } //进度
    };
  },
  methods: {
    jumpVideo(videoId) {
      this.$router.push({
        name: "VideoCourse",
        query: { courseId: this.courseId, videoId: videoId }
      });
      location.reload();
    },

    //第一次进来，获取目录中所有的视频，并且设置进度
    findVideoIdUrl(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].level == 2 || data[i].level == 1) {
          this.findVideoIdUrl(data[i].children);
        } else if (data[i].level == 3) {
          this.progress.catalog.push({
            label: data[i].label,
            videoId: data[i].id,
            url: data[i].url,
            far: 0,
            percent:0
          });
        }
      }
    },
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
    //点击了目录菜单
    handleNodeClick(data) {
      // console.log(data);
    },
    //设置进度
    setProgress() {
      var that = this;
      var Media = document.getElementById("qnv");
      Media.addEventListener(
        "timeupdate",
        function() {
          var timeDisplay;
          //用秒数来显示当前播放进度
          timeDisplay = Math.floor(Media.currentTime);
          //--------设置进度---------------
          for (var i = 0; i < that.progress.catalog.length; i++) {
            if (that.progress.catalog[i].videoId == that.videoId) {
              
               that.progress.catalog[i].far = that.far
               if(that.progress.catalog[i].percent==0)
              that.progress.catalog[i].percent = that.far / Number(Media.duration)*100
               else that.progress.catalog[i].percent = ((that.far / Number(Media.duration)) *100).toFixed(2);

              //  localStorage.setItem("progress",JSON.stringify(that.progress))

            }
          }
          var rightTime = (Number(Media.currentTime) / Number(Media.duration)).toFixed(3)
          if (rightTime==0.100||rightTime==0.20||rightTime==0.300||rightTime==0.400||rightTime==0.500
          ||rightTime==0.600||rightTime==0.700||rightTime==0.800||rightTime==0.900||rightTime==0.990
          )
           {
               //上传
               localStorage.setItem("progress",JSON.stringify(that.progress))
            var parmas = new URLSearchParams();
              parmas.append("courseId", that.courseId);
              parmas.append("progress", JSON.stringify(that.progress));
          
            axios
             .post("/comm/updTeachClass", parmas)
             .then(function(response) {
            console.log(response)
             });

           }
          //----------------
        },
        true
      );
    },
    preventDragAhead() {
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
          if (sym > that.far) {
            that.far = sym;
          }
        } catch (error) {
          console.log("没有获取到视频资源:" + error);
          clearInterval(interval);
        }
      }, 500);
    },

    getMyProgress(videoId)
    {     
          
     var parmas = new URLSearchParams();
      parmas.append("courseId", this.courseId);
      var that = this;
      axios
        .post("/comm/getTeachClassByUsernameAndCourseId", parmas)
        .then(function(response) {

          var progress = response.data.object.progress;
          if(response.data.object.progress==0){
              progress=null;
          }
           if(progress==null)
            {
              console.log("目前没有目录")
               //不存在就创建
               that.findVideoIdUrl(that.catalogData);
               //做更新
          var parmas = new URLSearchParams();
           parmas.append("courseId", that.courseId);
           parmas.append("progress", JSON.stringify(that.progress));
          
          axios
          .post("/comm/updTeachClass", parmas)
          .then(function(response) {
            console.log(response)
          });
             
                //updTeachClass
                //localStorage.setItem("progress",JSON.stringify(that.progress))

            }
            else{

                            //存在就写入
          that.progress = JSON.parse(progress)
          //点击封面进来，不携带videoId
          //进来时候拿到的videoId
          that.videoId = videoId?videoId:(that.progress.videoId?that.progress.videoId: that.progress.catalog[0].videoId);
         that.progress.videoId = that.videoId
         for (var i = 0; i < that.progress.catalog.length; i++) {
            if (that.progress.catalog[i].videoId == that.videoId) {
              //根据进度id定位到该url
              that.videoSrc = UrlConfig.getQiniuyunUrl() + that.progress.catalog[i].url;

                that.far =   that.progress.catalog[i].far 
      

            }
          }

            }


        })
        .catch(function(error) {
          console.log(error);
        });



          //去后端获取
          //  var progress =localStorage.getItem("progress")?
          //   JSON.parse(localStorage.getItem("progress"))
          //   :null


            // if(progress==null)
            // {
            //   console.log("目前没有目录")
            //    // 可获取课程中的视频进度
            //    //不存在就创建
            //    this.findVideoIdUrl(this.catalogData);
            //    localStorage.setItem("progress",JSON.stringify(this.progress))
            // }
      //       else{

      //         //存在就写入
      //     this.progress = progress
      //     //点击封面进来，不携带videoId
      //     //进来时候拿到的videoId
      //     this.videoId = videoId?videoId:(this.progress.videoId?this.progress.videoId: this.progress.catalog[0].videoId);
      //    this.progress.videoId = this.videoId
      //    for (var i = 0; i < this.progress.catalog.length; i++) {
      //       if (this.progress.catalog[i].videoId == this.videoId) {
      //         //根据进度id定位到该url
      //         this.videoSrc = UrlConfig.getQiniuyunUrl() + this.progress.catalog[i].url;

      //           this.far =   this.progress.catalog[i].far 
           


      //       }
      //     }
      //  }


    },
    //请求课程资源和目录
    reqCourseRes(courseId, videoId) {
      var parmas = new URLSearchParams();
      parmas.append("courseId", courseId);
      var that = this;
      axios
        .post("/comm/getCourseByCourseId", parmas)
        .then(function(response) {
          //设置课程
          that.course = response.data.object;
          //设置目录
          that.catalogData = JSON.parse(response.data.object.catalogData);
          //请求视频资源
          that.getMyProgress(videoId);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },

  mounted() {
    var that = this
    var myVideo = document.getElementById("qnv");
    if (myVideo != null) {
      myVideo.oncanplay = function() {
        console.log("准备就绪"+myVideo.duration);
      };
    }
    // console.log("接受到：" + this.$route.query.courseId);
    this.courseId = this.$route.query.courseId;
    this.videoId = this.$route.query.videoId;
    this.reqCourseRes(this.courseId, this.videoId);

    this.preventDragAhead();
    this.setProgress();
    
    //   //监听播放开始
    //   myVideo.addEventListener("play", function() {
    //     console.log("开始播放");
    //   });

    //   //监听播放结束
    //   myVideo.addEventListener("pause", function() {
    //     console.log("播放暂停");
    //   });

    //   //监听播放结束
    //   myVideo.addEventListener("ended", function() {
    //     console.log("播放结束");
    //   });
    // }
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
