<template >
  <div>
    <!-- 上传面板---------------------- -->
    <div v-show="showUploadPanel" class="upload-panel">
      <div style="text-align:left;display:flex;justify-content:space-between">
        <div style="margin:0 auto;">
          <input
            @input="parseFileInfo"
            v-if="progress!=100"
            style="opacity: 0; cursor: pointer;width: 150px;height: 150px;position: fixed;"
            type="file"
            id="select"
          />
          <div :class="file==null?'el-icon-upload':'el-icon-finished'" style="font-size: 150px" />
        </div>
        <div v-if="file!=null" style="width:60%;font-size:17px">
          <br />
          <br />
          文件名：{{file.name}}
          <br />
          大小：{{(file.size/1024).toFixed(2)}}KB
          <br />
          格式：{{file.type}}
        </div>
      </div>
      <br />
      <div v-if="file!=null" style="text-align:center">
        <el-progress :percentage="progress" status="success"></el-progress>
        <el-button v-if="progress!=100" @click.once="uploadFun">上传</el-button>
      </div>
      <div style="text-align:center">
        <el-button @click="cancelUpload">{{progress==100?'完成':'取消'}}</el-button>
      </div>
    </div>

    <!-- /上传面板---------------------- -->

    <!-- 快捷菜单 -->
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div
        v-if="visible"
        :style="{top:PathAndAxis.y+'px',left:PathAndAxis.x+25+'px'}"
        id="shortcutMenu"
        class="shortcut-menu"
        @contextmenu.prevent
      >
        <!-- 右击空白处 -->
        <div v-if="PathAndAxis.path==null">
          <el-button @click="addFolder" type="text">新建文件夹</el-button>
        </div>
        <!-- /右击空白处 -->
        <!-- 右击文件或者文件夹 -->
        <div v-if="PathAndAxis.path!=null">
          <div v-if="!showDetail">
            <big>{{PathAndAxis.path}}</big>
            <br />
            <el-button v-if="curPath!='/'" @click="moveUp(PathAndAxis.path)" size type="text">移至上层</el-button>
            <br />
            <el-button style="margin-left:0px;" @click="rename(PathAndAxis.path)" type="text">重命名</el-button>
            <br />
            <el-button @click="targetDetail(PathAndAxis.obj)" type="text">详&#12288;情</el-button>
            <br />
            <el-button slot="reference" @click="del(PathAndAxis.path)" type="text">删&#12288;除</el-button>
          </div>

          <div v-if="showDetail" style="width:300px;text-align:left;text-indent:2em">
            <div>
              名称：{{PathAndAxis.obj.path}}
              <br />
              <br />
            </div>
            <div v-if="PathAndAxis.obj.type==1">
              个数：{{PathAndAxis.obj.content.length}}
              <br />
              <br />
            </div>
            <div v-if="PathAndAxis.obj.type==0">
              大小：{{parseFloat(PathAndAxis.obj.size/1024).toFixed(2)}}KB
              <br />
              <br />
            </div>
            <div v-if="PathAndAxis.obj.type==0">
              类型：{{PathAndAxis.obj.mimeType}}
              <br />
              <br />
            </div>
            <div>
              日期：{{PathAndAxis.obj.date}}
              <br />
              <br />
            </div>
          </div>
        </div>
        <!-- /右击文件或者文件夹 -->
      </div>
    </transition>
    <!-- /快捷菜单 -->

    <el-col>
      <div
        @click="visible=false"
        id="body-content"
        @click.right="rightEvent($event,null)"
        @contextmenu.prevent
        class="body"
        v-loading="loading"
      >
        <template>
          <el-tabs v-loading="showLoading" tab-position="up">
            <el-tab-pane :label="msg">
              <div style="text-align:right">
                <el-button type="primary" plain @click="uploadFile">上传文件</el-button>

                <el-button type="primary" plain @click="addFolder">新建文件夹</el-button>

                <el-button type="primary" plain @click="save">已自动保存</el-button>
              </div>
              <!-- 当前路径： {{curPath}}<br> -->

              <!-- 导航路径  -->
              <span style="font-size:16px;margin-left:32px">位置：</span>
              <span
                style="font-size:16px;"
                v-for="(item,index) in pathToArray(curPath)"
                :key="index"
              >
                <span v-if="index==0">
                  <el-link type="primary" style="font-size:16px;" @click="jump(index)">/</el-link>
                </span>
                <span v-else>
                  <span style="font-size:16px;">&nbsp;></span>
                  <el-link type="primary" @click="jump(index)" style="font-size:16px;">{{item}}</el-link>
                </span>
              </span>
              <!-- /导航路径  -->

              <div class="content">
                <!-- 根目录屏蔽返回键 -->
                <div @click="back" class="back" v-if="this.curPath!='/'">
                  <i class="el-icon-back"></i>
                </div>

                <div v-for="(item,index) in curContent" :key="index">
                  <el-tooltip effect="light" :content="item.path" placement="top-start">
                    <!-- -------------------文件夹------------- -->
                    <div
                      @contextmenu.prevent
                      v-if="item.type==1"
                      @click="enterPath(item.path)"
                      @click.right.stop="rightEvent($event,item)"
                      class="target"
                    >
                      <div class="folder-img" draggable="true" :id="index">
                        <img
                          width="85px"
                          height="85px"
                          src="../../assets/images/video_system/folder.png"
                        />
                      </div>
                      <footer class="folder-text">{{item.path}}</footer>
                    </div>
                    <!-- ------------------ /文件夹 ------------------ -->

                    <!-- --------------------文件--------------------------------------- -->
                    <div
                      v-if="item.type==0"
                      @contextmenu.prevent
                      @click.right.stop="rightEvent($event,item)"
                      class="target"
                    >
                      <div @click="preview(item.url)" class="file-img" draggable="true" :id="index">
                        <img
                          v-if=" item.mimeType.startsWith('image')"
                          width="85px"
                          height="85px"
                          src="../../assets/images/video_system/image.png"
                        />
                        <img
                          v-if="item.mimeType.startsWith('video')"
                          width="85px"
                          height="85px"
                          src="../../assets/images/video_system/video.png"
                        />
                        <img
                          v-if="!item.mimeType.startsWith('image')&&!item.mimeType.startsWith('video')"
                          width="85px"
                          height="85px"
                          src="../../assets/images/video_system/file.png"
                        />
                      </div>
                      <footer class="file-text">{{item.path}}</footer>
                    </div>
                    <!-- ----------------------/文件----------------------- -->
                  </el-tooltip>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
    </el-col>
  </div>
</template>


<script>
import UploadUtil from "../../utils/UploadUtil.js";
import VueBus from "@/utils/VueBus.js";
import UrlConfig from "../../config/UrlConfig.js";
import axios from "axios";
//默认文件夹
var defaultFolders = [
  {
    path: "/",
    type: 1,
    content: []
  }
];

/**   测试使用的目录
var testfolders = [
        {
          path: "/",
          type: 1,
          content: [
            {
              path: "one",
              type: 1,
              content: [
                { path: "video1.mp4", content: "video1.mp4", type: 0 },
                { path: "video2.mp4", content: "video2.mp4", type: 0 },
                { path: "video5.mp4", content: "video5.mp4", type: 0 },
                {
                  path: "pp",
                  content: [
                    { path: "video3.mp4", content: "com.mp4", type: 0 }
                  ],
                  type: 1
                }
              ]
            },
            {
              path: "two",
              type: 1,
              content: [
                { path: "video3.mp4", content: "src=baidu", type: 0 },
                {
                  path: "two_one",
                  content: [
                    { path: "two_one.mp4", content: "12.mp4", type: 0 }
                  ],
                  type: 1
                }
              ]
            }
          ]
        }
      ]
*/

export default {
  name: "VideoLibrary",
  data() {
    return {
      msg: "视频库",
      showLoading: true, //展示loading刷新
      showDetail: false, //展示详情页面
      tempForUpload: {}, //上传视频完成需要传递这临时变量
      progress: 0, //上传进度
      file: null, //上传的文件
      showUploadPanel: false, //出现上传白板
      loading: false, //页面不可以编辑状态
      PathAndAxis: { x: 0, y: 0, path: null }, //坐标和path
      from: null, //文件拖拽的起点
      to: null, //文件拖拽的目的地
      visible: false, //展示右击菜单
      curPath: "/", //当前路径
      curContent: [], //当前路径下的文件
      //type  类型   path 路径（也是名字的也是）     content 内容
      folders: localStorage.getItem("folders")
        ? JSON.parse(localStorage.getItem("folders"))
        : defaultFolders
    };
  },

  mounted() {
    // this.resolveCurPathToContent();
    // 被拖拉节点
    var dragged;
    var that = this;
    var b = document.getElementById("body-content");
    b.addEventListener("dragstart", function(event) {
      // 保存被拖拉节点
      dragged = event.target;
      // 被拖拉节点的背景色变透明
      event.target.style.opacity = 0.1;
      that.from = event.path[1].id;
      that.visible = false;
    });

    b.addEventListener(
      "dragend",
      function(event) {
        // 被拖拉节点的背景色恢复正常
        event.target.style.opacity = "";
        event.preventDefault();
        // console.log(event,"dragend")
      },
      false
    );
    b.addEventListener(
      "dragover",
      function(event) {
        // 防止拖拉效果被重置，允许被拖拉的节点放入目标节点
        event.preventDefault();
      },
      false
    );
    b.addEventListener(
      "dragenter",
      function(event) {
        // 目标节点的背景色变紫色
        // 由于该事件会冒泡，所以要过滤节点
        if (event.target.className === "dropzone") {
          event.target.style.background = "purple";
        }
        event.preventDefault();
      },
      false
    );
    b.addEventListener(
      "dragleave",
      function(event) {
        // 目标节点的背景色恢复原样
        if (event.target.className === "dropzone") {
          event.target.style.background = "";
        }
        event.preventDefault();
      },
      false
    );
    b.addEventListener(
      "drop",
      function(event) {
        // 防止事件默认行为（比如某些元素节点上可以打开链接），
        event.preventDefault();
        that.to = event.path[1].id;
        if (that.from == that.to) {
          console.log("不做操作..");
        } else if (that.to == "") {
          console.log("空,不做操作..");
        } else {
          that.move(that.from, that.to);
          that.from = null;
          that.to = null;
        }
      },
      false
    );

    VueBus.$on("uploadPrecentVideoLibrary", function(data) {
      console.log("视频库收到进度：" + data);
      that.progress = data;
    });
    VueBus.$on("uploadErrorVideoLibrary", function(data) {
      console.log("视频库收到错误：", data);
    });

    VueBus.$on("uploadFinishVideoLibrary", function(data) {
      console.log("视频库收到上传完成：", data);
      that.tempForUpload.newFile.url = data.object.key;
      that.tempForUpload.newFile.size = data.object.fsize;
      that.tempForUpload.newFile.mimeType = data.object.mimeType;
      that.tempForUpload.tempContent.push(that.tempForUpload.newFile);

      this.$message({
        type: "success",
        message: "新建文件成功！ " + that.tempForUpload.value
      });
      that.save();
    });
  },
  beforeMount() {
    var that = this;

    console.log("请求文件库");
    var params = new URLSearchParams();
    axios
      .post(UrlConfig.getApi().getLibraryJson)
      .then(function(response) {
        localStorage.setItem("folders", response.data.object.libraryJson);
        that.folders = JSON.parse(response.data.object.libraryJson);
        that.resolveCurPathToContent();
        that.showLoading = false;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  beforeDestroy() {
    //防止被多次触发。
    VueBus.$off("uploadPrecentVideoLibrary");
    VueBus.$off("uploadErrorVideoLibrary");
    VueBus.$off("uploadFinishVideoLibrary");
  },

  methods: {
    preview(url) {
      console.log("预览：" + UrlConfig.getQiniuyunUrl() + url);
      //新窗口打开它
      window.open(UrlConfig.getQiniuyunUrl() + url, "_blank");
    },
    parseFileInfo() {
      this.file = document.getElementById("select").files[0];
      console.log(this.file);
    },
    cancelUpload() {
      console.log("关闭上传面板。");
      this.showUploadPanel = false; //关闭上传白板
      this.loading = false; //页面不可以编辑状态
      this.file = null; //取消选择
      this.progress = 0; //置0
    },
    uploadFun() {
      console.log("上传中..");
      this.progress = 0; //置0
      var file = document.getElementById("select").files[0];
      if (file == null) {
        alert("请选择文件");
        return;
      }
      //  文件  命名在中间的字段  后缀  操作的用户名  调用目标方法
      var username = JSON.parse(localStorage.getItem("userInfo")).account;
      var midType = "upload";
      var suffix = "";
      var targetType = "uploadFile";
      UploadUtil.upload(
        file,
        midType,
        suffix,
        username,
        targetType,
        "VideoLibrary"
      );
    },

    //-----------------------------------------

    //详情
    targetDetail(obj) {
      this.showDetail = true;
    },

    //上传文件
    uploadFile() {
      this.$prompt("请输入文件名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9_<>()（）《》.]{1,40}$/,
        inputErrorMessage:
          "规则(限定40字符):中文,字母,数字,下划线,括号,尖括号,书名号."
      })
        .then(({ value }) => {
          //1.new一个   2解析当前路径   3遍历到当前文件夹的json  4.插入进去  5.更新数据展示
          var newFile = {
            path: value,
            url: null,
            type: 0,
            mimeType: null,
            size: 0,
            date: new Date()
          };
          var array = this.pathToArray(this.curPath);
          var tempContent = this.folders;
          array.forEach(o => {
            tempContent = tempContent.find(item => item.path == o).content;
          });
          //判断输入的文件是否存在
          var legal = true;
          tempContent.forEach(o => {
            o.path == value ? (legal = false) : null;
          });
          if (legal) {
            this.showUploadPanel = true;
            this.loading = true;
            console.log("文件名合法。");

            //为临时变量赋值
            this.tempForUpload = {
              tempContent: tempContent,
              newFile: newFile,
              value: value
            };

            // tempContent.push(newFile);
          } else {
            this.$message({
              type: "error",
              message: "新建文件： " + value + "   已存在"
            });
          }
          this.curContent = tempContent;
          this.resolveCurPathToContent();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },

    //新建文件夹
    addFolder() {
      this.$prompt("请输入文件夹名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9_<>()（）《》.]{1,40}$/,
        inputErrorMessage:
          "规则(限定40字符):中文,字母,数字,下划线,括号,尖括号,书名号."
      })
        .then(({ value }) => {
          //1.new一个   2解析当前路径   3遍历到当前文件夹的json  4.插入进去  5.更新数据展示
          var newFolder = {
            path: value,
            content: [],
            type: 1,
            date: new Date()
          };
          var array = this.pathToArray(this.curPath);
          var tempContent = this.folders;
          array.forEach(o => {
            tempContent = tempContent.find(item => item.path == o).content;
          });
          //判断输入的文件夹是否存在
          var legal = true;
          tempContent.forEach(o => {
            o.path == value ? (legal = false) : null;
          });
          if (legal) {
            tempContent.push(newFolder);
          }
          this.curContent = tempContent;
          this.resolveCurPathToContent();
          if (legal) {
            this.$message({
              type: "success",
              message: "新建文件夹： " + value
            });
          } else {
            this.$message({
              type: "error",
              message: "新建文件夹： " + value + "   已存在"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },

    //跳转指定目录
    jump(index) {
      //1.当前路径字符串解析路径数组
      //2.切开数组  后面的不要，在转为路径字符串
      //3重新赋值当前路径
      //4.重新展示
      var array = this.pathToArray(this.curPath);
      array.splice(index + 1);
      var path = this.arrayToPath(array);
      console.log("jump", path);
      this.curPath = path;
      this.resolveCurPathToContent();
    },

    //保存
    save() {
      console.log("保存");
      localStorage.setItem("folders", JSON.stringify(this.folders));
      var params = new URLSearchParams();
      params.append("libraryJson", JSON.stringify(this.folders));
      axios
        .post(UrlConfig.getApi().updateLibrary, params)
        .then(function(response) {
          console.log("成功上传更新。", response);
        })
        .catch(function(error) {
          console.log(error);
        });

      this.$message({
        type: "success",
        message: "保存成功"
      });
    },

    //移动到上一层
    moveUp(path) {
      this.visible = false;
      var array = this.pathToArray(this.curPath);
      array.pop();
      console.log("当前路径：" + this.curPath);
      console.log("要转移当前：" + path);
      console.log("上一层路径：", this.arrayToPath(array));

      //1建立临时变量存储当前路径的节点  2在上层路径判断添加该节点 3删除原路径该节点
      for (var i = 0; i < this.curContent.length; i++) {
        if (this.curContent[i].path == path) {
          console.log("该节点在当前文件夹的index:" + i);
          break;
        }
      }

      var movedObj = this.curContent[i];
      var upPath = this.arrayToPath(array);
      console.log("上一级目录" + upPath);
      var tempContent = this.folders;
      //把路劲转为数组
      var array = this.pathToArray(upPath);
      array.forEach(o => {
        tempContent = tempContent.find(item => item.path == o).content;
      });

      //加一个同名判断
      var canMove = true;
      tempContent.forEach(o => {
        if (o.path == movedObj.path) {
          canMove = false;
        }
      });
      if (canMove) {
        tempContent.push(movedObj);
        console.log("转移的文件：", movedObj.path);
        this.curContent.splice(i, 1); //删除这个文件(夹)
        this.resolveCurPathToContent();
      } else {
        alert("上一级目录存在同名文件！");
      }
    },

    //路径数组转换为字符串
    arrayToPath(array) {
      var path = array.toString();
      for (var i = 0; i < array.length; i++) {
        path = path.replace(",", "/");
      }
      if (path.length > 1) {
        path = path.substring(1);
      }
      return path;
    },

    //移动（移动到当前目录下的目录里面）
    move(from, to) {
      if (Number(to).toString() == "NaN") {
        console.log("目标非法..");
        return;
      }
      if (this.curContent[to].type == 0) {
        alert("目标是个文件！");
        return;
      }
      //  1。临时变量存储from文件夹  2进入to的路径添加临时变量 3删除现在的from节点
      var tempContent = this.curContent[from];
      var i = 0;
      for (i = 0; i < this.curContent[to].content.length; i++) {
        if (this.curContent[to].content[i].path == this.curContent[from].path) {
          alert("目标文件夹存在同名文件夹..");
          return;
        }
      }
      this.curContent[to].content.push(tempContent);
      this.curContent.splice(from, 1);
      this.resolveCurPathToContent();
    },

    //重命名
    rename(path) {
      this.visible = false;
      console.log("重命名的路径：" + path);
      //1 解析当前路径  2找到当前路径的folder  3遍历并找到对应path 4修改 5刷新数据展示
      var array = this.pathToArray(this.curPath);
      console.log(array);
      var tc = this.curContent.find(item => item.path == path);
      console.log("tc", tc);
      this.$prompt('为  "' + path + '"   重命名', "重命名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9_<>()（）《》.]{1,40}$/,
        inputErrorMessage:
          "规则(限定40字符):中文,字母,数字,下划线,括号,尖括号,书名号."
      })
        .then(({ value }) => {
          var legal = true;
          for (var j = 0; j < this.curContent.length; j++) {
            if (this.curContent[j].path == value) {
              console.log(j, legal);
              legal = false;
              break;
            }
          }

          if (legal) {
            tc.path = value;
            this.curContent = tc;
            console.log(tc);
            this.resolveCurPathToContent();
          } else {
            this.$message({
              type: "error",
              message: "该文件夹： " + value + "   已存在"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },

    //删除文件或者目录
    del(path) {
      this.visible = false;
      console.log("删除：" + path);
      //1 解析当前路径  2.删除对应content  3更新数据展示
      var array = this.pathToArray(this.curPath);
      var tempContent = this.folders;
      array.forEach(o => {
        tempContent = tempContent.find(item => item.path == o).content;
      });
      var k = tempContent.length;
      for (var i = 0; i < k; i++) {
        if (tempContent[i].path == path) {
          break;
        }
      }

      var that = this;
      console.log("要删除：", tempContent[i]);
      if (tempContent[i].type == 1) {
        if (tempContent[i].content.length > 0) {
          this.$message.error("该文件夹非空，不允许删除。");
          return;
        }
      }

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (tempContent[i].type == 0) {
            var params = new URLSearchParams();
            params.append("key", tempContent[i].url);
            axios
              .post(UrlConfig.getApi().delKey, params)
              .then(function(response) {
                console.log("成功删除。", response);
                tempContent = tempContent.splice(i, 1);
                that.save();
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            tempContent = tempContent.splice(i, 1);
          }

          this.curContent = tempContent;
          this.resolveCurPathToContent();

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //鼠标点击右键
    rightEvent(e, item) {
      if (item != null)
        this.PathAndAxis = { x: e.x, y: e.y, path: item.path, obj: item };
      else this.PathAndAxis = { x: e.x, y: e.y, path: null };
      this.visible = true;
      this.showDetail = false;
    },

    //返回上一级
    back() {
      //修改路径，重新解析
      this.curPath = this.curPath.substring(0, this.curPath.lastIndexOf("/"));
      if (this.curPath == "") this.curPath = "/";
      this.resolveCurPathToContent();
    },

    //进入目录
    enterPath(path) {
      //当前再根目录，直接拼接即可
      if (this.curPath == "/") this.curPath = this.curPath + path;
      //当前不在根目录，加上/后拼接
      else this.curPath = this.curPath + "/" + path;
      this.resolveCurPathToContent();
    },

    //展示当前路径下需要显示的内容
    resolveCurPathToContent() {
      //当前在根目录，直接设值内容
      if (this.curPath == "/") {
        this.curContent = this.folders[0].content;
      } else {
        var tempContent = this.folders;
        var array = this.pathToArray(this.curPath);
        array.forEach(o => {
          tempContent = tempContent.find(item => item.path == o).content;
        });
        //更新展示内容
        this.curContent = tempContent;
      }
      this.save();
    },

    //将路径解析为数组
    //匹配对应的路径  ['/','one','two']
    pathToArray(path) {
      if (path == "/") var array = ["/"];
      else {
        var array = path.split("/").slice(1);
        array.unshift("/");
      }
      return array;
    }
  }
};
</script>

<style scoped>
.upload-panel {
  width: 50%;
  height: 280px;
  margin: 1px auto;
  background: white;
  position: fixed;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 12%;
  z-index: 9999;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.back {
  text-align: center;
  margin: 20px;
  width: 85px;
  font-size: 12px;
  line-height: 85px;
  height: 85px;
  background: white;
  border: 1px dashed blue;
}
.target {
  overflow: hidden;
  width: 85px;
  height: 105px;
  font-size: 12px;
  text-align: center;
  margin: 20px;
}
.shortcut-menu {
  overflow: auto;
  max-height: 300px;
  position: fixed;
  z-index: 999;
  font-size: 14px;
  text-align: center;
  padding-top: 5px;
  min-width: 100px;
  /* height: 120px; */
  box-shadow: 1px 1px 5px -1px rgba(64, 158, 255, 0.5);
  background-color: white;
}
.content {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 120px;
  /* margin-bottom: 20px; */
  width: 95%;
  margin: 18px 0 16px 35px;
  box-shadow: 0.5px 0.2px 0.5px 0.6px rgba(0, 0, 0, 0.1);
  /* border: 1px solid; */
}
.folder-img {
  width: 85px;
  height: 85px;
  cursor: pointer;
}
.file-img {
  width: 85px;
  height: 85px;
  cursor: pointer;
}
.file-text {
  height: 20px;
  line-height: 20px;
}

.folder-text {
  height: 20px;
  line-height: 20px;
}

.folder-img:hover {
  background: rgba(0, 0, 0, 0.1);
  background-image: url("../../assets/images/video_system/folder.png");

  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.file-img:hover {
  background: rgba(0, 0, 0, 0.01);
  /* background-image: url("../../assets/images/video_system/file.png"); */

  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}

.body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin:0px auto;
  padding: 30px;
  background: white;
  width: 95%;
  min-height: 600px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
