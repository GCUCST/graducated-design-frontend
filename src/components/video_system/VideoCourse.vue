<template>
  <div class="video-course">

    <el-page-header @back="goBack"></el-page-header>

    <div style="width:100%">
      <div style="display:flex; justify-content:space-between">
        <div style="width:20%;text-align:left;line-height:45px;">如何精通JAVA1</div>
        <div style="width:20%;text-align:center">
          <img  style="line-height:60px;height:45px;width:45px;" src="http://47.94.166.187:70/cwh_pics/ad.jpg" />
          <span style="line-height:45px;">CST先生</span>
        </div>
      </div>

      <el-divider></el-divider>


      <div style="width:100%">
        <div style="width:100%;display:flex; justify-content:space-between">
          <div style="width:100%">
            <div style="width:100%">
              <video
                @mouseover="mouseOver"
                @mouseleave="mouseLeave"
                :class="[video_full?'video-big':'video-small']"
                controls="controls"
                id="qnv"
                src="http://47.94.166.187:70/cwh_pics/1.mp4"
              >您的视频开始</video>
              <br />
              <div style="display:flex;justify-content:space-between">
                <span>
                 <el-button plain type="primary">点赞</el-button>
                  <el-button  plain type="primary">评论</el-button>
                </span>
                 <el-button style="margin-right:10%;" @click="video_full=!video_full" plain type="primary">网页全屏</el-button>
             
              </div>
            </div>
          </div>

          <transition name="custom-classes-transition" enter-active-class="animated bounceInRight">
            <div style="width:35%" v-show="!video_full">
                <el-tabs style="height:100%" type="border-card" stretch>
                  <el-tab-pane label="章节">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                  </el-tab-pane>
                  <el-tab-pane label="笔记本">笔记本</el-tab-pane>
                </el-tabs>
            </div>
          </transition>


        </div>
      </div>

      <!-- -----------作为评论分割线----------------------- -->
      <el-divider></el-divider>
 <el-tabs >
    <el-tab-pane label="热度排序" name="first">热度排序</el-tab-pane>
    <el-tab-pane label="时间排序" name="second">时间排序</el-tab-pane>
  </el-tabs>


      <!-- -----------/作为评论分割线----------------------- -->
    </div>
  </div>
</template>



<script>
export default {
  name: "VideoCourse",
  data() {
    return {
      msg: "课程页面",
      courseId: null,
      video_full: false,
      far: 0,
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
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
  width: 90%;
      text-align: center;
  object-fit: fill;
}
.video-big {
  margin: 0 auto;
  width: 100%;
  height: 700px;
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
