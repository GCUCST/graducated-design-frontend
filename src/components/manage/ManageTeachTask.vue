<template >
  <div class="add-class" v-loading="loading">
    <el-tabs tab-position="up">
      <el-tab-pane :label="'教学任务管理'">
        <div style="text-align:center">
          <!-- 开始。。。。。。。。。。。。。。。。。 -->
          <el-table
            ref="multipleTable"
            :data="teachTaskList.filter(data => !search || data.courseName.toLowerCase().includes(search.toLowerCase()))"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            height="450"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column sortable prop="teacherId" label="工号"></el-table-column>
            <el-table-column prop="teacherName" label="姓名"></el-table-column>
            <el-table-column prop="courseName" label="课程名称"></el-table-column>
            <el-table-column prop="content" label="详情"></el-table-column>

            <el-table-column label="操作">
                  <template slot="header" slot-scope="scope">

        <el-input
          v-model="search"
          size="mini"
          placeholder="输入课程名称搜索"/>
      </template>
          
              <template slot-scope="scope">
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
              选择教师：
              <el-select
                style="width:150px"
                @change="selTeacher()"
                v-model="temp_data_id"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in allTeachers"
                  :key="item.staId"
                  :label="item.staId+' '+item.name"
                  :value="item.staId"
                ></el-option>
              </el-select>课程名称：
              <el-input v-model="courseName" style="width:150px" />&nbsp;详情：
              <el-input v-model="content" style="width:150px" />&nbsp;
            </div>
            <br />

            <el-button v-show="!showEditor" @click="showEditor = !showEditor">添加授课任务</el-button>
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
  name: "teacher",
  data() {
    return {
      search:"",
      loading: true,
      courseName: null,
      content: null,
      teacherId: null,
      teacherName: null,

      teachTaskList: [],

      temp_data_id: null, //temp变量
      showEditor: false, //显示添加表单
      allTeachers: [] //所有老师
    };
  },
  mounted() {
    this.getAllTeachers();
    this.getAllTask();
  },
  methods: {
    getAllTask() {
      //teachTaskList
      // var params = new URLSearchParams();
      // params.append("GSMAJson", JSON.stringify(GSMAJson));
      var that = this;
      axios
        .post("/comm/getAllTasks")
        .then(function(response) {
          console.log("getAllTasks:", response);
          that.teachTaskList = response.data.object;
          that.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    selTeacher() {
      this.allTeachers.forEach(element => {
        if (element.staId == this.temp_data_id) {
          console.log(element);
          this.teacherName = element.name;
          this.teacherId = element.staId;
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
              text: gradeJson[i].name,
              value: gradeJson[i].name
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
      console.log(index, row.id);

      var params = new URLSearchParams();
      params.append("id", row.id);
      var that = this;

      this.$confirm("删除该任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/comm/delTeachTask", params)
            .then(function(response) {
              console.log("delTeachTask:", response.data.object);
              if (response.data.object == 1) {
                that.$message({
                  type: "success",
                  message: "删除成功!"
                });
                that.teachTaskList.splice(index, 1);
              } else {
                  that.$message.error("删除失败。");
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

    getAllTeachers() {
      var that = this;
      axios
        .post("/comm/getAllTeachers")
        .then(function(response) {
          console.log("res:", response);
          that.allTeachers = response.data.object;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    save() {
      //验空
      if (this.courseName == null || this.courseName == "") {
        this.$message.error("请输入课程！");
        return;
      }
      if (this.content == null || this.content == "") {
          this.$message.error("请输入详情！");
        return;
      }
      if (this.teacherId == null || this.teacherId == "") {
          this.$message.error("请选择教师！");
        return;
      }
      if (this.teacherName == null || this.teacherName == "") {
          this.$message.error("请选择教师！");
        return;
      }

      var params = new URLSearchParams();
      params.append("teacherId", this.teacherId);
      params.append("teacherName", this.teacherName);
      params.append("courseName", this.courseName);
      params.append("content", this.content);

      var that = this;
      axios
        .post("/comm/addTeachTask", params)
        .then(function(response) {
          console.log("addTeachTask:", response);
          if (response.data.object == 1) {
 that.$message({
          message: '添加成功',
          type: 'success'
        });

            that. getAllTask() ;
            that.courseName = "";
            that.content = "";
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
