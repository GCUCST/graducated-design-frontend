<template>
  <div class="manage-student" v-loading="loading">
    <el-tabs tab-position="up">
      <el-tab-pane :label="msg">
        <div style="width:40%;text-align:right;margin:0 auto;font-size:16px">

          选择年级：  <el-select  v-model="adminClass.grade" placeholder="请选择">
    <el-option
      v-for="item in gradeJson"
      :key="item.name"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
<br>
  
          选择专业：  <el-select  v-model="adminClass.major" placeholder="请选择">
    <el-option
      v-for="item in majorJson"
      :key="item.name"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
  <br>
   输入名称： <el-input style="width:222px" v-model="input"></el-input>
      
      <br>
          <el-button @click="addAdminClass()">添加</el-button>
        </div>

        <el-table :data="adminClassJson" style="width: 80%;margin:0 auto" max-height="400">
          <el-table-column fixed prop="id" label="编号" width="150"></el-table-column>
          <el-table-column prop="grade" label="年级" width="150"></el-table-column>
          <el-table-column prop="major" label="专业" width="150"></el-table-column>
          <el-table-column prop="name" label="名称" width="150"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
        <div style="text-align:center">
          <el-button @click="save()">保存</el-button>
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
      msg: "管理班级",
      adminClass:{id:null,name:null,grade:"",major:""},
      GSMAJson: null,
      majorJson: [],
      gradeJson: [],
      adminClassJson: [],
      input: null
    };
  },
  mounted() {
    this.getGSMA();
  },
  methods: {
    save() {
      console.log(this.GSMAJson);
      var params = new URLSearchParams();
      params.append("GSMAJson", JSON.stringify(this.GSMAJson));
      var that = this;
      axios
        .post("/comm/updateGSMA", params)
        .then(function(response) {
          if (response.data.object == 1) {
            alert("更新成功。");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
      console.log(row.id);
      this.adminClassJson.forEach((element, i) => {
        if (element.id == row.id) {
          this.adminClassJson.splice(i, 1);
        }
      });
    },
    addAdminClass() {

      if (this.input == null) {
        alert("请输入班级名称。");
        return;
      }
      //去空格
      this.input = this.input.replace(/\s+/g, "");
      if (this.input == "") {
        alert("请输入班级名称。");
        return;
      }
      if(this.adminClass.grade==""||this.adminClass.major==""){
        alert("请输入年级专业。")
        return ;
      }

      var newAdminClass = {
        id: new Date()
          .valueOf()
          .toString()
          .substring(7),
        name: this.input,
        grade:this.adminClass.grade,
        major:this.adminClass.major
      };
       this.adminClassJson.push(newAdminClass);
      this.input = null;
      this.adminClass={id:null,name:null,grade:"",major:""}

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
          that.gradeJson = that.GSMAJson.grade;
          that.adminClassJson = that.GSMAJson.adminClass;
          that.loading = false;
          console.log(that.gradeJson);
          console.log(that.majorJson);
          console.log(that.adminClassJson);
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
