<template >
  <div class="add-class" v-loading="loading">
       <el-tabs tab-position="up">
      <el-tab-pane :label="'教师管理'">
    <div style="text-align:center">
      <!-- 开始。。。。。。。。。。。。。。。。。 -->
      <el-table
        ref="multipleTable"
        :data="allTeachers"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        height="450"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column sortable prop="staId" label="工号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column
          prop="gender"
          :filters="[{text: '男', value: 1},{text: '女', value: 0},{text:'未设置',value:-1}]"
          :filter-method="filterHandler"
          label="性别"
        ></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <br />
      <div>
        <div style="font-size:16px;" v-if="showEditor">
          工号：
          <el-input v-model="staId" style="width:100px" />&nbsp;姓名：
          <el-input v-model="name" style="width:100px" />&nbsp;性别：
          <el-select style="width:100px" v-model="gender" placeholder="请选择">
            <el-option
              v-for="item in [{label:'男',value:1},{label:'女',value:0},{label:'未设置',value:-1}]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <br />
        <el-button v-show="!showEditor" @click="showEditor = !showEditor">添加老师</el-button>
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
      loading: true,
      staId: null,
      name: null,
      gender: 1,
      temp_item: null, //temp变量
      showEditor: false, //显示添加表单
      allTeachers: [] //所有老师
    };
  },
  mounted() {
    this.getAllTeachers();
  },
  methods: {
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
      console.log(index, row.staId);
      var params = new URLSearchParams();
      params.append("staId", row.staId);
      var that = this;
      axios
        .post("/comm/delTeacher", params)
        .then(function(response) {
          console.log(response.data.object);
          if (response.data.object == 1) {
            alert("删除成功。");
            that.allTeachers.splice(index, 1);
          } else {
            alert("删除失败。");
          }
        })
        .catch(function(error) {
          console.log(error);
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
          that.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    save() {
      if (this.staId == "" || this.staId == null) {
        alert("请输入工号！");
        return;
      }
      if (this.name == "" || this.name == null) {
        alert("请输入姓名！");
        return;
      }
      // if(this.gender==""||this.gender==null)
      //   {
      //     alert("请输入性别！")
      //     return ;
      //   }

      var params = new URLSearchParams();
      params.append("staId", this.staId);
      params.append("name", this.name);
      params.append("gender", this.gender);

      var that = this;
      axios
        .post("/comm/addTeacher", params)
        .then(function(response) {
          console.log("res:", response);
          if (response.data.code == 200) {
            that.allTeachers.push({
              staId: that.staId,
              name: that.name,
              gender: that.gender
            });
            // alert("添加成功！请刷新")
          } else {
            alert("添加失败。" + response.data.message);
          }
          that.staId = null;
          that.name = null;
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
