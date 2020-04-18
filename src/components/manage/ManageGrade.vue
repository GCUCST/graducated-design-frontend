<template>
  <div class="manage-student" v-loading="loading">
    <el-tabs tab-position="up">
      <el-tab-pane :label="msg">
        <div style="width:40%;text-align:right;margin:0 auto">
          <el-input v-model="input"></el-input>
         <br>
         <br>
          <el-button @click="addGrade()">添加</el-button>
        </div>

        <el-table :data="gradeJson" style="width: 40%;margin:0 auto" max-height="400">
             <el-table-column type="selection"></el-table-column>
            <el-table-column label="序号" type="index" width="100"></el-table-column>
          <!-- <el-table-column fixed prop="id" label="编号" width="150"></el-table-column> -->
          <el-table-column prop="name" sortable label="名称" width="120"></el-table-column>
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
      msg: "管理年级",
      GSMAJson: null,
      gradeJson: [],
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

      this.$confirm('删除该年级？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                this.gradeJson.forEach((element, i) => {
                  if (element.id == row.id) {
                    this.gradeJson.splice(i, 1);
                     this.$message({
          message: '删除成功。（需手动保存）',
          type: 'success'
        });
                  }
                });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });




    },
    addGrade() {
      if (this.input == null) {
          this.$message.error("请输入年级。");
        return;
      }
      //去空格
      this.input = this.input.replace(/\s+/g, "");
      if (this.input == "") {
         this.$message.error("请输入年级。");
        return;
      }

       if(isNaN(this.input)){
           this.$message.error("年级不合法！");
           return;
       }

      var goNext = true;
       this.gradeJson.forEach(element => {
         if(element.name==this.input){
           this.$message.error("已存在该年级。");
          goNext = false;
         }
       });

      var grade = {
        id: new Date()
          .valueOf()
          .toString()
          .substring(7),
        name: this.input
      };
      if(goNext)
      this.gradeJson.unshift(grade);
      this.input = null;

      this.save();


    },
    getGSMA() {
      // var params = new URLSearchParams();
      // params.append("GSMAJson", JSON.stringify(GSMAJson));
      var that = this;
      axios
        .post("/comm/getGSMA")
        .then(function(response) {
          that.GSMAJson = JSON.parse(response.data.object.gsmajson);
          that.gradeJson = that.GSMAJson.grade;
          that.loading = false;
          console.log(that.GSMAJson);
          console.log(that.gradeJson);
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
  overflow: auto;
  padding: 30px;
}
</style>
