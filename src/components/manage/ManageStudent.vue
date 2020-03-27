
<template >
  <div class="manage-student" v-loading="loading">
    <el-tabs tab-position="up">
      <el-tab-pane :label="'学生管理'">
        <div style="text-align:center">
          <!-- 开始。。。。。。。。。。。。。。。。。 -->
          <el-table
           :data="allStudents.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            ref="multipleTable"
   
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            height="450"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column sortable prop="stuId" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column
              prop="gender"
              :filters="[{text: '男', value: 1},{text: '女', value: 0},{text:'未设置',value:-1}]"
              :filter-method="filterHandler"
              label="性别"
            >
              <template slot-scope="scope">
                <span
                  style="margin-left: 10px"
                >{{ scope.row.gender==1?'男':scope.row.gender==0?'女':'未设置' }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="grade"
              :filter-method="filterHandler"
              :filters="gradeFilter"
              label="年级"
            ></el-table-column>

            <el-table-column
              prop="major"
              :filters="majorFileter"
              :filter-method="filterHandler"
              sortable
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

               <el-table-column
      align="right">
      <!-- eslint-disable-next-line -->
      <template slot="header" slot-scope="scope">
        <el-input
           @click="fun(scope.$index)"
          v-model="search"
          placeholder="输入姓名搜索"/>
      </template>

            <!-- <el-table-column label="操作"> -->

              <template slot-scope="scope">
                <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <br />
          <div>
            <div style="font-size:16px;" v-if="showEditor">
              学号：
              <el-input v-model="oneStudent.stuId" style="width:100px" />&nbsp;姓名：
              <el-input v-model="oneStudent.name" style="width:100px" />&nbsp;性别：
              <!-- <el-input v-model="oneStudent.gender" style="width:100px" /> -->
              <el-select style="width:100px" v-model="oneStudent.gender" placeholder="请选择">
                <el-option
                  v-for="item in [{label:'男',value:1},{label:'女',value:0},{label:'未设置',value:-1}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <span style="display:none">
                年级：&nbsp;
                {{oneStudent.grade}}&nbsp;&nbsp;&nbsp;&nbsp;
                专业：&nbsp;
                {{oneStudent.major}}&nbsp;&nbsp;&nbsp;&nbsp;
                班级：&nbsp;
                {{oneStudent.adminClass}}&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              选择班级：
              <el-select @change="selClass()" v-model="temp_item_id" placeholder="请选择">
                <el-option
                  v-for="item in adminClassJson"
                  :key="item.id"
                  :label="item.grade+item.major+item.name+'班'"
                  :value="item.id"
                ></el-option>
              </el-select>
              <br />
            </div>
            <br />
            <el-button v-show="!showEditor" @click="showEditor = !showEditor">添加学生</el-button>
            <el-button v-show="showEditor" @click="save()">确定添加</el-button>
            <el-button v-show="showEditor" @click="showEditor = !showEditor">取消</el-button>

            <!-- <el-button @click="toggleSelection()">清空选择</el-button> -->
          </div>
        </div>
        <!-- /结束。。。。。。。。。。。。。。。 -->

        <br />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>



<script>
import VueBus from "../../utils/VueBus";
import axios from "axios";
export default {
  name: "Student",
  data() {
    return {
        search: '',//查找学生
      loading: true,
      majorFileter: [], //过滤专业
      gradeFilter: [], //过滤年级
      temp_item_id: null, //temp变量
      oneStudent: {
        stuId: "",
        name: "",
        gender: 1,
        major: "",
        grade: "",
        adminClass: ""
      }, //一个学生对象
      showEditor: false, //显示添加表单
      adminClassJson: [], //班级数组
      // className: null, //新建班级的名称
      // students: [], //添加的学生
      allStudents: [] //全体学生数据
      // multipleSelection: [] //临时多选的变量
    };
  },
  mounted() {
    this.getGSMA();
    this.getAllStudents();
  },
  methods: {
    
    fun(num){},
    selClass() {
      this.adminClassJson.forEach(element => {
        if (element.id == this.temp_item_id) {
          this.oneStudent.grade = element.grade;
          this.oneStudent.adminClass = element.name;
          this.oneStudent.major = element.major;
          console.log("stu", this.oneStudent);
        }
      });
    },
    getGSMA() {
      // var params = new URLSearchParams();
      // params.append("GSMAJson", JSON.stringify(GSMAJson));
      var that = this;
      axios
        .post("/comm/getGSMA")
        .then(function(response) {
          console.log("res:", response);
          that.adminClassJson = JSON.parse(
            response.data.object.gsmajson
          ).adminClass;

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
              text: Number(gradeJson[i].name),
              value: Number(gradeJson[i].name)
            });
          }
          // console.log(that.adminClassJson);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row.stuId);
      var params = new URLSearchParams();
      params.append("stuId", row.stuId);
      var that = this;

      this.$confirm("确定删除该学生？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/comm/delStudent", params)
            .then(function(response) {
              console.log(response.data.object);
              if (response.data.object == 1) {
                that.$message({
                  type: "success",
                  message: "删除成功!"
                });
                that.allStudents.splice(index, 1);
              } else {
                alert("删除失败。");
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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

    cancel() {},
    getAllStudents() {
      var that = this;
      axios
        .post("/comm/getAllStudents")
        .then(function(response) {
          console.log(response.data.object.object);
          that.allStudents = response.data.object.object;
          that.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    save() {
      //校验该学生
      if (this.oneStudent.stuId == null || this.oneStudent.stuId == "") {
        alert("请输入学生学号！");
        return;
      }
      if (this.oneStudent.name == null || this.oneStudent.name == "") {
        alert("请输入学生姓名！");
        return;
      }
      if (
        this.oneStudent.adminClass == null ||
        this.oneStudent.adminClass == ""
      ) {
        alert("请输入学生班级！");
        return;
      }

      // oneStudent: { stuId: "", name: "",gender:1, major:"",grade:"",adminClass:""},  //一个学生对象

      var params = new URLSearchParams();
      params.append("stuId", this.oneStudent.stuId);
      params.append("name", this.oneStudent.name);
      params.append("gender", this.oneStudent.gender);
      params.append("major", this.oneStudent.major);
      params.append("grade", this.oneStudent.grade);
      params.append("adminClass", this.oneStudent.adminClass);
      var that = this;
      axios
        .post("/comm/addStudent", params)
        .then(function(response) {
          console.log(response);
          if (response.data.object.object == 1) {
            that.allStudents.push(that.oneStudent);
            alert("添加成功。");
          } else {
            alert("插入失败。");
          }

          (that.temp_item = null),
            (that.oneStudent = {
              stuId: "",
              name: "",
              gender: 1,
              major: "",
              grade: "",
              adminClass: ""
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
