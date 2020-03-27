<template>
  <div class="manage-student" v-loading="loading">
    <el-tabs tab-position="up">
      <el-tab-pane :label="msg">
        <div style="width:40%;text-align:right;margin:0 auto">
          <el-input v-model="input"></el-input>
         <br>
         <br>
          <el-button @click="addmajor()">添加</el-button>
        </div>

        <el-table :data="majorJson" style="width: 60%;margin:0 auto" max-height="400">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
          <el-table-column fixed prop="id" label="编号" width="150"></el-table-column>
          <el-table-column prop="name" label="名称" width="150"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br>
          <div style="text-align:center">
            <span style="font-size:14px">共：{{allNums}}个专业</span><br><br>
           <el-button  @click="save()">保存</el-button>
          </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>



<script>
import * as qiniu from "qiniu-js";
import axios from "axios";

export default {
  name: "ManageStudent",
  data() {
    return {
      allNums:0,
      loading:true,
      msg: "管理专业",
      GSMAJson: null,
      majorJson: [],
      input: null
    };
  },
  mounted() {
    this.getGSMA();
  },
  methods: {
    save(){
      console.log(this.GSMAJson)
      var params = new URLSearchParams();
      params.append("GSMAJson", JSON.stringify(this.GSMAJson));
      var that = this;
      axios
        .post("/comm/updateGSMA",params)
        .then(function(response) {
           if(response.data.object==1){
              that.$message({
          message: '保存成功',
          type: 'success'
        });
           }
        })
        .catch(function(error) {
          console.log(error);
        });

    },
    handleDelete(index, row) {

        this.$confirm('删除该专业?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {


      this.majorJson.forEach((element, i) => {
        if (element.id == row.id) {
          this.majorJson.splice(i, 1);
          this.$message({
            type: 'success',
            message: '删除成功!（需手动保存）'
          });
           this.allNums--;
        }
      });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });





    },
    addmajor() {
      if (this.input == null) {
        this.$message.error("请输入专业。");
        return;
      }
      //去空格
      this.input = this.input.replace(/\s+/g, "");
      if (this.input == "") {
        this.$message.error("请输入专业。");
        return;
      }

      var major = {
        id: new Date()
          .valueOf()
          .toString()
          .substring(7),
        name: this.input
      };
      var goNext = true
      this.majorJson.forEach(element => {
        if(element.name==this.input)
        {
          this.$message.error('已存在该专业');
          goNext = false;
          return ;
        }
      });
      if(goNext){
        var result  = this.majorJson.unshift(major);
        if(result){
            this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.allNums++;

        }
      this.save();

      }
      this.input = null;

    },
    getGSMA() {
      // var params = new URLSearchParams();
      // params.append("GSMAJson", JSON.stringify(GSMAJson));
      var that = this;
      axios
        .post("/comm/getGSMA")
        .then(function(response) {
          that.GSMAJson = JSON.parse(response.data.object.gsmajson);
          that.majorJson = that.GSMAJson.major;
          console.log(that.GSMAJson);
          console.log(that.majorJson);
          that.allNums = that.majorJson.length;
          that.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>


<style scoped>
.manage-student {
  text-align: center;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 20px auto;
  background: white;
  z-index: 999;
  overflow: auto;
  padding: 30px;
}
</style>
