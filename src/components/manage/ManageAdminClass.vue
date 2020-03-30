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
   输入班级：
    <!-- <el-input style="width:222px" v-model="input"></el-input> -->
       <el-input-number style="width:222px" v-model="input" :min="1" :max="10" label="描述文字"></el-input-number>
      <br>
          <el-button @click="addAdminClass()">添加</el-button>
        </div>

        <el-table :data="adminClassJson" style="width: 65%;margin:0 auto" max-height="400">
           <el-table-column type="selection"></el-table-column>
          <el-table-column label="序号" type="index" width="80"></el-table-column>
          <el-table-column fixed prop="id" label="编号" width="100"></el-table-column>
        
          <el-table-column prop="grade" label="年级"
              :filters="gradeJsonFilter"
              :filter-method="filterHandler"
           width="150"></el-table-column>
        
          <el-table-column prop="major"
            :filters="majorJsonFilter"
              :filter-method="filterHandler"
           label="专业" width="150">
          </el-table-column>
         
          <el-table-column prop="name" 
            :filters="[{text: 1, value: 1},{text: 2, value: 2},{text: 3, value: 3},{text: 4, value: 4},{text: 5, value: 5},{text: 6, value: 6},{text: 7, value: 7},{text: 8, value: 8},{text: 9, value: 9}]"
              :filter-method="filterHandler"
          label="班级" width="80"></el-table-column>


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
      input: null,

      gradeJsonFilter:[],
      majorJsonFilter:[]
    };
  },
  mounted() {
    this.getGSMA();
  },
  methods: {
      filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    save() {
      console.log(this.GSMAJson);
      var params = new URLSearchParams();
      params.append("GSMAJson", JSON.stringify(this.GSMAJson));
      var that = this;
      axios
        .post("/comm/updateGSMA", params)
        .then(function(response) {
          if (response.data.object == 1) {
           that.$message({
          message: '保存成功。',
          type: 'success'
        });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleDelete(index, row) {
      
       this.$confirm('删除该班级?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.adminClassJson.forEach((element, i) => {
        if (element.id == row.id) {
          this.adminClassJson.splice(i, 1);
           this.$message({
          message: '删除完成。（需手动保存）',
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
    addAdminClass() {

      if (this.input == null) {
             this.$message.error("请输入班级名称。");
        return;
      }
      //去空格
      // this.input = this.input.replace(/\s+/g, "");
      // if (this.input == "") {
      //        this.$message.error("请输入班级名称。");
      //   return;
      // }
      if(this.adminClass.grade==""||this.adminClass.major==""){
           this.$message.error("请输入年级专业。")
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

      var goNext = true;
      this.adminClassJson.forEach(element => {
        if(element.name==newAdminClass.name&&element.grade==newAdminClass.grade
        &&element.major==newAdminClass.major)
        {
          goNext = false;
            this.$message.error("已存在该班级。")
        }

      });
      
      if(goNext){
        this.adminClassJson.unshift(newAdminClass);
        this.$message({
          message: '添加成功。',
          type: 'success'
        });
        this.save();
      }
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

          that.gradeJson.forEach(element => {
            that.gradeJsonFilter.push(
                {text:element.name,value:element.name}
            )
          });

           that.majorJson.forEach(element => {
            that.majorJsonFilter.push(
                {text:element.name,value:element.name}
            )
          });
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
