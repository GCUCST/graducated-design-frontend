<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: 'MyCourse' }">我的课程</el-breadcrumb-item>
      <el-breadcrumb-item>{{course?course.title:'加载中...'}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{getVideoTitleByVideoId(videoId)}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="width:99%">
      <div>
        <div
          style="width: 10%;
    text-align: center;
    position: absolute;
    right: 50px;
    top: 28px;"
        >
          <el-avatar :src="course?QiniuyunUrl+course.cover:''"></el-avatar>
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
              >您的浏览器不支持播放该视频！</video>

              <br />
              <div
                style="display: flex;justify-content: space-between;margin: 0 auto;"
                :style="{'width': (video_full ? '100%':'85%')}"
              >
                <span>
                  <el-button
                    plain
                    type="primary"
                    @click="liked(course.courseId,'course')"
                  >{{course?course.likeNum:0}}赞</el-button>
                  <!-- <el-button plain type="text">{{course?course.replyNum:0}}评论</el-button> -->
                </span>
                <el-button @click="video_full=!video_full" plain type="primary">网页全屏</el-button>
              </div>
            </div>
          </div>

          <transition name="custom-classes-transition" enter-active-class="animated bounceInRight">
            <div style="width:35%" v-show="!video_full">
              <el-tabs style="height:100%" type="border-card" stretch>
                <el-tab-pane label="章节">
                  <el-tree
                    node-key="id"
                    default-expand-all
                    :data="course?JSON.parse(course.catalogData):null"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                  ></el-tree>
                </el-tab-pane>

                <el-tab-pane label="我的进度" style="overflow:auto">
                  <div
                    style="font-size:12px;line-height:30px;font-weigth:700"
                    v-for=" (item,index) in progress.catalog"
                    :key="index"
                  >
                    <span style="cursor:pointer;">{{item.label}}</span>
                    <el-progress  :stroke-width="2" :percentage="Number(item.percent?item.percent:0)"></el-progress>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </transition>
        </div>
      </div>
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
      QiniuyunUrl: UrlConfig.getQiniuyunUrl(), //七牛云地址

      courseId: null, //第一次进来课程id
      videoId: null, //第一次进来当前视频id
      videoSrc: null, //视频地址
      far: 0, //视频最远进度

      video_full: false, //全屏模式
      course: null, //当前的课程
      defaultProps: {
        children: "children",
        label: "label"
      }, //目录菜单
      catalogData: null, //当前目录数据
      progress: { videoId: null, catalog: [] } //进度
    };
  },
  methods: {
    //点赞
    liked(targetId, targetType) {
      console.log(targetId);
      console.log(targetType);
      var parmas = new URLSearchParams();
      parmas.append("targetId", targetId);
      parmas.append("targetType", targetType);

      var that = this;
      axios.post("/comm/addLiked", parmas).then(function(response) {
        console.log(response);
        if (targetType == "course") that.course.likeNum++;
        if (targetType == "comment") {
          for (var i = 0; i < that.allReplies.length; i++) {
            if (that.allReplies[i].id == targetId) {
              that.allReplies[i].likeNum++;
            }
          }
        }
      });
    },

    //视频跳转
    jumpVideo(videoId) {
      // this.reqCourseRes(this.courseId, this.videoId);
      // location.reload();
      var that = this;
      this.progress.catalog.forEach(element => {
        if (element.videoId == videoId) {
          console.log(element);
          that.far = element.far;
          that.videoSrc = that.QiniuyunUrl + element.url;
        }
      });

                          this.$router.push({
                            name: "VideoCourse",
                            query: { courseId: this.courseId, videoId: videoId }
                          });
                          this.courseId = this.$route.query.courseId;
                          this.videoId = this.$route.query.videoId;

    },

    //获取小标题
    getVideoTitleByVideoId(videoId) {
      var title = null;
      this.progress.catalog.forEach(element => {
        if (element.videoId == videoId) {
          title = element.label;
        }
      });
      return title;
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
            percent: 0
          });
        }
      }
    },
    //返回上级
    goBack() {
      console.log("go back");
      this.$router.back(-1);
    },
    //鼠标进来了
    mouseOver: function() {},
    // 鼠标出去了
    mouseLeave: function() {
      qnv.pause();
    },
    //点击了目录菜单
    handleNodeClick(data) {
      if (data.level == 3) {
        this.jumpVideo(data.id);
      }
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
              
              that.progress.catalog[i].far = Number(that.far);
              if (that.progress.catalog[i].percent == 0) {
                that.progress.catalog[i].percent =
                  (Number(that.far) / Number(Media.duration)) * 100;
              } else {
                 
                if (Media.duration) {
                  that.progress.catalog[i].percent = (
                    Number(that.far / Media.duration) * 100
                  ).toFixed(2);
                  if( that.progress.catalog[i].percent>98){
                      that.progress.catalog[i].percent = 100
                  }
                  
                }
                else{
                }
              }

            }
          }
          var rightTime = (
            Number(Media.currentTime) / Number(Media.duration)
          ).toFixed(3);
          if (
            rightTime == 0.1 ||
            rightTime == 0.2 ||
            rightTime == 0.3 ||
            rightTime == 0.4 ||
            rightTime == 0.5 ||
            rightTime == 0.6 ||
            rightTime == 0.7 ||
            rightTime == 0.8 ||
            rightTime == 0.9 ||
            rightTime == 0.95||
            rightTime == 1.00

          ) {
            //上传
            // localStorage.setItem("progress", JSON.stringify(that.progress));
            var parmas = new URLSearchParams();
            parmas.append("courseId", that.courseId);
            parmas.append("progress", JSON.stringify(that.progress));
            axios.post("/comm/updTeachClass", parmas).then(function(response) {
              console.log("更新成功。");
            });
          }
        },
        true
      );
    },
    //防止进度条拉前
    preventDragAhead() {
      let that = this;
      var sym; //实际进度
      var time; //拉的进度    //far是最远进度
      var qnv = document.querySelector("#qnv");
      var interval = setInterval(function() {
        try {
          time = qnv.currentTime;
          if (time - sym > 1 && time > Number(that.far)) {
            qnv.currentTime = Number(that.far); //拉过头就跳到最远播放位置
          }
          sym = qnv.currentTime;
          if (sym > Number(that.far)) {
            that.far = sym;
          }
        } catch (error) {
          console.log("没有获取到视频资源:" + error);
          clearInterval(interval);
        }
      }, 500);
    },

    //获取我的进度
    getMyProgress(videoId) {
      var parmas = new URLSearchParams();
      parmas.append("courseId", this.courseId);
      var that = this;
      axios
        .post("/comm/getTeachClassByUsernameAndCourseId", parmas)
        .then(function(response) {
          var progress = response.data.object.progress;
          if (response.data.object.progress == 0) {
            progress = null;
          }
          if (progress == null) {
            console.log("目前没有目录");
            //不存在就创建
            that.findVideoIdUrl(that.catalogData);
            //做更新
            var parmas = new URLSearchParams();
            parmas.append("courseId", that.courseId);
            parmas.append("progress", JSON.stringify(that.progress));
            axios.post("/comm/updTeachClass", parmas).then(function(response) {
              console.log(response);
              location.reload();
            });
          } else {
            //存在就写入
            that.progress = JSON.parse(progress);
            //d第一次点击封面进来，不携带videoId
            //进来时候拿到的videoId
            that.videoId = videoId
              ? videoId
              : that.progress.videoId
              ? that.progress.videoId
              : that.progress.catalog[0].videoId;
            that.progress.videoId = that.videoId;
            for (var i = 0; i < that.progress.catalog.length; i++) {
              if (that.progress.catalog[i].videoId == that.videoId) {
                //根据进度id定位到该url
                that.videoSrc =
                  UrlConfig.getQiniuyunUrl() + that.progress.catalog[i].url;
                that.far = that.progress.catalog[i].far;
                // console.log(that.far)
              }
            }
            console.log("获取进度完成。");
          }
        })
        .catch(function(error) {
          console.log("获取进度失败。");
        });
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
          console.log("获取课程资源完成。");
          //设置目录
          that.catalogData = JSON.parse(response.data.object.catalogData);
          console.log("获取课程目录完成。");
          //请求视频资源
          that.getMyProgress(videoId);
        })
        .catch(function(error) {
          console.log("获取课程失败。");
        });
    }
  },

  mounted() {
    this.courseId = this.$route.query.courseId;
    this.videoId = this.$route.query.videoId;
    this.reqCourseRes(this.courseId, this.videoId);
    this.setProgress();
    this.preventDragAhead();
  }
};
</script>

<style scoped>
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
