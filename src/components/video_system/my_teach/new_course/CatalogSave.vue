<template>
  <div class="body">

    <!-- 开始关联选择版 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <span>
        <div>
          <el-cascader
            v-model="value"
            :options="folders"
            :clearable="true"
            :props="{ 
              expandTrigger: 'hover',
              value:'path',
              label:'path',
              children:'content'
              }"
          ></el-cascader>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 结束关联选择版 -->

    <div style="text-align:center;font-size:22px">目录</div>
    <br />
    <br />


    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      highlight-current
      default-expand-all
      empty-text="请添加您的目录"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        
        <span v-show="!data.inp_stat">{{data.label}}</span>
        <div style="width:50%">
          <el-input
            @keyup.enter.native="inp_blur(data)"
            @blur="inp_blur(data)"
            :id="data.id"
            v-model="temp_data"
            :placeholder="data.level==1?'章节名称':(data.level==2?'标题名称':'内容名称')"
            value="node.label"
            v-show="data.inp_stat"
            maxlength="24"
            size="small"
            show-word-limit
          />
        </div>

          <small style="color:gray">{{arrayToStr(data.src)}}</small> 

        <span>
          <el-button size="mini" type="text" @click="update(data)">
            <el-tooltip class="item" effect="dark" content="修改数据" placement="top">
              <i class="el-icon-edit"></i>
            </el-tooltip>
          </el-button>

          <el-button v-if="data.level==3" size="mini" type="text" @click="relate(data)">
            <el-tooltip  v-if="data.src==null" class="item" effect="dark" content="关联" placement="top">
              <i   class="el-icon-star-off"></i>
            </el-tooltip>

             <el-tooltip v-if="data.src!=null" class="item" effect="dark" :content="data.src" placement="top">
              <i  class="el-icon-star-on"></i>
            </el-tooltip>
          </el-button>

          <el-button v-if="data.level<3" type="text" size="mini" @click="() => append(data)">
            <el-tooltip class="item" effect="dark" content="添加子节点" placement="top">
              <i class="el-icon-circle-plus-outline"></i>
            </el-tooltip>
          </el-button>

          <el-button type="text" size="mini" @click="() => remove(node, data)">
            <el-tooltip class="item" effect="dark" content="删除该数据" placement="top">
              <i class="el-icon-delete"></i>
            </el-tooltip>
          </el-button>
        </span>
      </span>
    </el-tree>

      <el-button @click="addChapter" type="primary" plain>添加章节</el-button>
    <br />
    <br />
    <el-row style="text-align:center">
       <el-button type="primary" @click="lastStep" plain>上一步</el-button>
       <el-button @click="saveCatalog" type="primary" plain>保存目录</el-button>
       <el-button type="primary" @click="nextStep" plain>下一步</el-button>
    </el-row>
    <br />
  </div>
</template>



<script>
import UploadUtil from "@/utils/UploadUtil.js";
import VueBus from "@/utils/VueBus.js";
import UrlConfig from "@/config/UrlConfig.js";
import axios from "axios";

export default {
  name: "catalog",
  data() {
    //本地存在目录数据+
    const catalog_data = JSON.parse(localStorage.getItem("catalog"));
    return {
      //输入框绑定需要
      temp_data: null,
      data: catalog_data ? catalog_data : [],
      //----start----
      value: null,
      folders: JSON.parse(localStorage.getItem("folders"))[0].content,
      //--end-
      dialogVisible: false,

      curNode:null
    };
  },
    beforeMount() {
    var that = this;
    console.log("请求文件库");
    var params = new URLSearchParams();
    axios
      .post(UrlConfig.getApi().getLibraryJson)
      .then(function(response) {
        localStorage.setItem("folders", response.data.object.libraryJson);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    nextStep(){
       VueBus.$emit("jump", 2);
    },
    lastStep(){
       VueBus.$emit("jump", 0);
    },
    //src数组解析出文件类型
     doParseMimeType(fc,array,i){
       var mimeType=null;
       fc.forEach(element => {
       if(element.path==array[i])
       {
         if(element.content)
       {
          mimeType = this.doParseMimeType (element.content,array,++i)
          return mimeType;
       }
       else{
        //  console.log(element.url)
         mimeType = element.mimeType
       }
      }
     });
     if(mimeType!=null)return mimeType
    },

    doParseUrl(fc,array,i){
       var url=null;
       fc.forEach(element => {
       if(element.path==array[i])
       {
         if(element.content)
       {
          url = this.doParseUrl (element.content,array,++i)
          return url;
       }
       else{
        //  console.log(element.url)
         url = element.url
       }
      }

     });
     if(url!=null)return url
    },

   doTest(){
     console.log("--------------")
      var f = [{"path": "/", "type": 1, "content": [{"date": "2020-02-17T17:31:25.817Z", "path": "java教学基础", "type": 1, "content": [{"date": "2020-02-17T06:51:11.192Z", "path": "文件夹", "type": 1, "content": [{"date": "2020-02-17T17:31:34.689Z", "path": "1111111111111111111111111111111", "type": 1, "content": [{"date": "2020-02-17T17:31:39.617Z", "path": "22222222222222222222222222222222222", "type": 1, "content": [{"url": "/1001/upload/20200217/150455/KQNp4", "date": "2020-02-17T07:04:29.119Z", "path": "文档1", "size": "152040", "type": 0, "mimeType": "application/x-zip-compressed"}, {"url": "/1001/upload/20200217/145941/gPRAA", "date": "2020-02-17T06:59:05.355Z", "path": "视频1", "size": "28347353", "type": 0, "mimeType": "video/mp4"}, {"url": "/1001/upload/20200217/145106/oaF5r", "date": "2020-02-17T06:51:01.538Z", "path": "照片1", "size": "23358", "type": 0, "mimeType": "image/jpeg"}, {"url": "/1001/upload/20200218/013244/cYX2f", "date": "2020-02-17T17:31:51.382Z", "path": "111111111111111111111111111111111111111", "size": "32147948", "type": 0, "mimeType": "video/x-msvideo"}]}]}]}]}]}]
      var fc = f[0].content
     var srcArray = ["java教学基础","文件夹","1111111111111111111111111111111","22222222222222222222222222222222222","视频1"]
     var  url =  this.doParseUrl(fc,srcArray,0);
     var mimeType = this.doParseMimeType(fc,srcArray,0)
    console.log("url:"+url)
    console.log("mimeType:"+mimeType)





   },
   //转为路径显示
    arrayToStr(array){
      if(array==null)return null;
      array = JSON.parse(array)
      var str = "";
      for(var i = 0;i<array.length;i++)
      {
        str +=  "/" + array[i]
      }
      if(str.length> 50)
      str = "... "+str.substring(str.length-25)
      return str;
    },
   
    //取消显示对话框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //确定关联
    submit() {
      this.dialogVisible = false
      // console.log("添加了:" , this.value);
      if(!this.value)
      return ;
      //判断 
      var fc = JSON.parse(localStorage.getItem("folders"))[0].content
       var  url =  this.doParseUrl(fc,this.value,0);
       var mimeType = this.doParseMimeType(fc,this.value,0)
      // console.log("url:"+url)
      // console.log("mimeType:"+mimeType) 
      if(!url){
       alert("文件错误，请刷新视频库。")
       return;
      }
      if(!mimeType.startsWith("video"))
      {
        alert("请选择视频！")
        return ;  
      }
       this.curNode.url = url
       this.curNode.src = (this.value==null||this.value.length==0? null: JSON.stringify( this.value));
       this.value = null
    },
    //数据关联
    relate(curr_node) {
      console.log("数据关联");
      this.value =curr_node.src==null?null:JSON.parse(curr_node.src);
      this.dialogVisible = true;
      this.curNode = curr_node;
    },

    //保存目录
    saveCatalog() {
      //递归查找没有关闭的输入框
      var unclose = this.recursive({ children: this.data });
      //可以
      if (!unclose) {
        setTimeout(() => {
          localStorage.setItem("catalog", JSON.stringify(this.data));
          alert("保存成功");
        }, 100);
      } else {
        alert("保存失败:存在未关联或未命名节点。");
      }
    },
    //点击某个节点
    handleNodeClick(node) {
    },
    //新增章节
    addChapter() {
      const newChapter = {
        id: new Date() - 0, //id
        src: null, //用于关联
        inp_stat: true, //输入状态
        label: "章节名称", //名字
        children: [], //子节点
        level: 1 //层级
      };
      this.temp_data = ""; //清空临时输入内容
      this.data.push(newChapter);
      setTimeout(() => {
        document.getElementById(newChapter.id).focus();
        console.log("获取焦点");
      }, 50);
      this.$notify({
        title: "提示",
        message: "添加成功",
        type: "success",
        duration: 500
      });
    },
    //新增节点
    append(curr_node) {
      const newChild = {
        id: new Date() - 0, //id
        src: null, //用于关联
        inp_stat: true, //输入状态
        label: curr_node.level == 1 ? "标题名称" : "内容名称", //名称
        children: [], //子节点
        level: curr_node.level + 1, //层级
        url:null       //冗余,实际地址
      };
      this.temp_data = ""; //清空临时输入框的东西
      curr_node.children.push(newChild); //添加到当前节点的children里面
      setTimeout(() => {
        //获取焦点
        document.getElementById(newChild.id).focus();
      }, 50);
      this.$notify({
        title: "提示",
        message: "添加成功",
        type: "success",
        duration: 500
      });
    },
    //递归查找
    recursive(tempData) {
      var data = tempData.children;
      for (var i = 0; i < data.length; i++) {
        if (data[i].inp_stat == true||data[i].src==null&&data[i].level==3) {
          //查找输入框状态的
          console.log("递归找到：", data[i]);
          return data[i];
        } else {
          if (data[i].children) {
            let temp = this.recursive(data[i]);
            if (temp != undefined) return temp;
          }
        }
      }
    },
    //输入框失去焦点
    inp_blur(curr_node) {
      if (document.getElementById(curr_node.id).value != "")
        curr_node.label = document.getElementById(curr_node.id).value;
      setTimeout(() => {
        console.log("失去焦点");
        curr_node.inp_stat = false;
      }, 50);
    },
    //修改数据
    update(curr_node) {
      curr_node.inp_stat = !curr_node.inp_stat;
      console.log("当前状态：" + curr_node.inp_stat);
      if (curr_node.inp_stat) {
        setTimeout(() => {
          console.log("获取焦点");
          document.getElementById(curr_node.id).focus();
        }, 50);
      } else {
        setTimeout(() => {
          console.log("失去焦点.");
          document.getElementById(curr_node.id).blur();
        }, 100);
      }
      this.temp_data = document.getElementById(curr_node.id).value;
      this.temp_data = curr_node.label;
    },
    //删除节点
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      this.$notify({
        title: "提示",
        message: "删除成功",
        type: "success",
        duration: 500
      });
    }
  }
};
</script>

<style scoped>
.body {
  padding-top: 12px;

  border-radius: 4px;
  background: white;
  text-align: center;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.custom-tree-node {
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding-right: 20px;
}
</style>
