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

        <el-table :data="majorJson" style="width: 50%;margin:0 auto" max-height="400">
          <el-table-column fixed prop="id" label="编号" width="150"></el-table-column>
          <el-table-column prop="name" label="名称" width="150"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <br>
          <div style="text-align:center">
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
             alert("更新成功。")
           }
        })
        .catch(function(error) {
          console.log(error);
        });

    },
    handleDelete(index, row) {
      console.log(index, row);
      console.log(row.id);
      this.majorJson.forEach((element, i) => {
        if (element.id == row.id) {
          this.majorJson.splice(i, 1);
        }
      });
    },
    addmajor() {
      if (this.input == null) {
        alert("请输入专业。");
        return;
      }
      //去空格
      this.input = this.input.replace(/\s+/g, "");
      if (this.input == "") {
        alert("请输入专业。");
        return;
      }
      var major = {
        id: new Date()
          .valueOf()
          .toString()
          .substring(7),
        name: this.input
      };
      this.majorJson.push(major);
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
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
</style>
