<template >
  <div class="add-class" v-loading="loading">
    <el-tabs stretch>
      <el-tab-pane label="所有学生">
        <div style="text-align:center">
          <!-- 开始。。。。。。。。。。。。。。。。。 -->
          <el-table
            ref="multipleTable"
            :data="allStudents"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            height="350"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column sortable prop="stuId" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>

            <el-table-column
              prop="grade"
              :filters="gradeFilter"
              :filter-method="filterHandler"
              label="年级"
            ></el-table-column>

            <el-table-column
              prop="major"
              :filters="majorFileter"
              :filter-method="filterHandler"
              label="专业"
            ></el-table-column>
            <el-table-column
              prop="adminClass"
              :filters="[{text: 1, value: 1},{text: 2, value: 2},{text: 3, value: 3},{text: 4, value: 4},{text: 5, value: 5},{text: 6, value: 6},{text: 7, value: 7},{text: 8, value: 8},{text: 9, value: 9}]"
              :filter-method="filterHandler"
              sortable
              label="班级"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
          <br />
          <div>
            <el-button @click="add()">选择</el-button>
            <el-button @click="toggleSelection()">清空</el-button>
              <el-button @click="cancel">取消</el-button>
          </div>
        </div>
      </el-tab-pane>
      <!-- /结束。。。。。。。。。。。。。。。 -->

      <!-- 开始。。。。。。。。。。。。。。。。。 -->
      <el-tab-pane label="已选择学生">
        <div style="text-align:canter">
          <el-table
            :data="students"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            height="350"
          >
            <el-table-column sortable prop="stuId" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名" width="150"></el-table-column>
            <el-table-column prop="grade" 
              :filters="gradeFilter"
              :filter-method="filterHandler"
             label="年级"></el-table-column>

            <el-table-column prop="major" 
              :filters="majorFileter"
              :filter-method="filterHandler"
             label="专业"></el-table-column>
            <el-table-column prop="adminClass" sortable label="班级" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div>
            共{{students.length}} 名学生，班级名称：
            <el-input v-model="className" style="width:200px;"></el-input>
          </div>
          <el-button @click="save">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>

    <br />
  </div>
</template>



<script>
import VueBus from "../../../utils/VueBus.js";
import axios from "axios";
export default {
  name: "AddClass",
  data() {
    return {
      loading:true,
      majorFileter: [], //过滤专业
      gradeFilter: [], //过滤年级
      className: null, //新建班级的名称
      students: [], //添加的学生
      allStudents: [
        {
          stuId: "201610098268",
          name: "王小虎",
          grade: "2016",
          department: "计算机工程学院",
          major: "计算机科学与技术",
          class: 2
        },
        {
          stuId: "201610098258",
          name: "李宏皋",
          grade: "2016",
          department: "计算机工程学院",
          major: "计算机科学与技术",
          class: 1
        },
        {
          stuId: "201610098269",
          name: "王小名",
          grade: "2017",
          department: "计算机工程学院",
          major: "软件工程",
          class: 1
        },
        {
          stuId: "201610098258",
          name: "李宏皋",
          grade: "2016",
          department: "计算机工程学院",
          major: "计算机科学与技术",
          class: 1
        },
        {
          stuId: "201610098269",
          name: "王小名",
          grade: "2017",
          department: "计算机工程学院",
          major: "软件工程",
          class: 1
        },
        {
          stuId: "201610098258",
          name: "李宏皋",
          grade: "2016",
          department: "计算机工程学院",
          major: "计算机科学与技术",
          class: 1
        },
        {
          stuId: "201610098269",
          name: "王小名",
          grade: "2017",
          department: "计算机工程学院",
          major: "软件工程",
          class: 1
        },
        {
          stuId: "201610098258",
          name: "李宏皋",
          grade: "2016",
          department: "计算机工程学院",
          major: "计算机科学与技术",
          class: 1
        },
        {
          stuId: "201610098269",
          name: "王小名",
          grade: "2017",
          department: "计算机工程学院",
          major: "软件工程",
          class: 1
        },
        {
          stuId: "201610098258",
          name: "李宏皋",
          grade: "2016",
          department: "计算机工程学院",
          major: "计算机科学与技术",
          class: 1
        },
        {
          stuId: "201610098269",
          name: "王小名",
          grade: "2017",
          department: "计算机工程学院",
          major: "软件工程",
          class: 1
        },
        {
          stuId: "201610098258",
          name: "李宏皋",
          grade: "2016",
          department: "计算机工程学院",
          major: "计算机科学与技术",
          class: 1
        },
        {
          stuId: "201610098269",
          name: "王小名",
          grade: "2017",
          department: "计算机工程学院",
          major: "软件工程",
          class: 1
        }
      ], //全体学生数据
      multipleSelection: [] //临时多选的变量
    };
  },

  mounted() {
    this.getAllStudents();
    this.getGSMA();
  },
  methods: {
    getGSMA() {
      // var params = new URLSearchParams();
      // params.append("GSMAJson", JSON.stringify(GSMAJson));
      var that = this;
      axios
        .post("/comm/getGSMA")
        .then(function(response) {
          // console.log("res:", response);
          var majorJson = JSON.parse(response.data.object.gsmajson).major;
          for (var i = 0; i < majorJson.length; i++) {
            that.majorFileter.push({
              text: majorJson[i].name,
              value: majorJson[i].name
            });
          }
          var gradeJson = JSON.parse(response.data.object.gsmajson).grade;
          for (var i = 0; i < gradeJson.length; i++) {
            that.gradeFilter.push({
              text: gradeJson[i].name,
              value: Number(gradeJson[i].name)
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAllStudents() {
      var that = this;
      axios
        .post("/comm/getAllStudents")
        .then(function(response) {
          // console.log(response.data.object.object);
          that.allStudents = response.data.object.object;
          that.loading = false;


          if(localStorage.getItem("students_"+localStorage.getItem("courseId")))
          {
              //that.students.push()
              var tempStudents =  JSON.parse(localStorage.getItem("students_"+localStorage.getItem("courseId")))

              tempStudents.forEach(element => {
                 that.allStudents.forEach(element2 => {
                   if(element==element2.stuId){
                     console.log(element2)
                     that.students.push(element2)
                   }
                   
                 });
              });
              var className = localStorage.getItem("className");
              that.className = className

         
         }

        })
        .catch(function(error) {
          console.log(error);
        });
    },
    add() {
      if(this.multipleSelection.length==0){
          this.$message.error("请选择学生")
          return ;
      }
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.students.push(this.multipleSelection[i]);
      }
      var arr = this.students;
      const res = new Map();
      arr = arr.filter(arr => !res.has(arr.stuId) && res.set(arr.stuId, 1));
      this.students = arr;
        this.$message({
          message: '添加成功！',
          type: 'success'
        });
      console.log("添加成功！");

    },
    handleDelete(index, row) {
      console.log(index, row);
      this.students.splice(index, 1);
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },

    cancel() {
      VueBus.$emit("closeAddClass", true);
    },

    save() {
      if (this.students.length == 0) {
          this.$message.error("请至少添加一名学生！");
        return;
      }
      this.className = this.className.replace(/\s+/g,"");
      if (this.className.length==0) {
          this.$message.error("请输入班级名称！");
        return;
      }

      console.log("courseId" + localStorage.getItem("courseId"));
      //做一个学生添加操作
      console.log("正在添加学生。");

      var params = new URLSearchParams();
      params.append("students", JSON.stringify(this.students));
      params.append("courseId", localStorage.getItem("courseId"));
      params.append("className", this.className);

      var that = this;
      axios
        .post("/comm/addTeachClass", params)
        .then(function(response) {
          console.log(response);
          if (response.data.code == 200) {
            that.students = []; //清空当前学生
            that.className = null; //清空当前学生
              that.$message({
          message: '成功！',
          type: 'success'
        });
            VueBus.$emit("closeAddClass", true); //关闭该面板
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.add-class {
  text-align: center;
  width: 80%;
  box-shadow: 1px 0px 10px 1px rgba(0, 0, 0, 0.1);
  /* margin-bottom: 20px; */
  background: white;
  position: fixed;
  z-index: 999;
  overflow: auto;
  height: 500px;
  top: 75px;
  padding: 5px;
  border-radius: 5px;
  
}
</style>
