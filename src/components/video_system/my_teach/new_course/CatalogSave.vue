<template>
  <div class="body">
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>
        <!-- 开始 -->
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
            @change="handleChange"
          ></el-cascader>
        </div>
        <!-- 结束 -->
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <span style="text-align:center;font-size:22px">目录</span>
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
        <span v-show="!data.inp_stat">{{node.label}}</span>
        <div>
          <el-input
            @keyup.enter.native="inp_blur(data)"
            @blur="inp_blur(data)"
            :id="data.id"
            v-model="temp_data"
            :placeholder="data.level==1?'新章节':(data.level==2?'知识大点':'知识小点')"
            value="node.label"
            v-show="data.inp_stat"
            maxlength="20"
            size="small"
            show-word-limit
          />
        </div>

        <span>
          <el-button size="mini" type="text" @click="update(data)">
            <el-tooltip class="item" effect="dark" content="修改数据" placement="top">
              <i class="el-icon-edit"></i>
            </el-tooltip>
          </el-button>

          <el-button size="mini" type="text" v-if="data.src==null" @click="relate(data)">
            <el-tooltip class="item" effect="dark" content="关联文件" placement="top">
              <i class="el-icon-star-off"></i>
            </el-tooltip>
          </el-button>

          <el-button size="mini" v-show="data.src!=null" type="text" @click="relate(data)">
            <el-tooltip class="item" effect="dark" :content="data.src" placement="top">
              <i class="el-icon-star-on"></i>
            </el-tooltip>
          </el-button>

          <el-button :disabled="data.level>=3" type="text" size="mini" @click="() => append(data)">
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
    <br />
    <el-row style="text-align:center">
      <el-button @click="addChapter" type="primary" plain>添加章节</el-button>
      <el-button @click="saveCatalog" type="primary" plain>保存目录</el-button>
    </el-row>
    <br />
  </div>
</template>



<script>
//拿取当前最新id
var now_id = localStorage.getItem("id");
var id = now_id ? now_id : 0;

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
      value: [],
      folders: JSON.parse(localStorage.getItem("folders"))[0].content,
      //--end-
      dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleChange(value) {
      console.log("handlechange:"+value);
    },
    relate(curr_node) {
      
      this.dialogVisible = true
      curr_node.src = '....';

      console.log("数据关联");

    //   this.$alert("这是一段内容", "标题名称", {
    //     confirmButtonText: "确定",
    //     callback: action => {
    //       this.$message({
    //         type: "info",
    //         message: `action: ${action}`
    //       });
    //     }
    //   });
    },

    //保存目录
    saveCatalog() {
      //递归查找没有关闭的输入框
      var unclose = this.recursive({ children: this.data }, 0);
      //可以
      if (!unclose) {
        setTimeout(() => {
          this.$storage.set("catalog", this.data);
          alert("保存成功");
        }, 100);
      } else {
        alert("保存失败");
      }
    },
    handleNodeClick(spec) {
      console.log(spec.id);
    },
    addChapter() {
      const newChapter = {
        id: ++id, //id
        src: null, //用于关联
        inp_stat: true, //输入状态
        label: "新章节", //名字
        children: [], //子节点
        level: 1 //层级
      };
      this.temp_data = ""; //清空临时输入内容
      this.data.push(newChapter);
      this.$storage.set("id", id); //最新id
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
        id: ++id, //id
        src: null, //用于关联
        inp_stat: true, //输入状态
        label: curr_node.level == 1 ? "知识大点" : "知识小点", //名称
        children: [], //子节点
        level: curr_node.level + 1 //层级
      };
      this.temp_data = ""; //清空临时输入框的东西
      curr_node.children.push(newChild); //添加到当前节点的children里面
      this.$storage.set("id", id); //最新id
      setTimeout(() => {
        //获取焦点
        document.getElementById(newChild.id).focus();
        console.log(id + "获取焦点");
      }, 50);
      this.$notify({
        title: "提示",
        message: "添加成功",
        type: "success",
        duration: 500
      });
    },
    //递归查找
    recursive(tempData, id) {
      var data = tempData.children;
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].inp_stat);
        if (data[i].inp_stat == true) {
          //查找输入框状态的
          console.log("递归找到：", data[i]);
          return data[i];
        } else {
          if (data[i].children) {
            let temp = this.recursive(data[i], id);
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
