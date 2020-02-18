//还没
<template>
  <div class="add-class">
    <br />

    <div>
      课程状态：
      <el-select v-model="courseStatus" placeholder="请选择">
        <el-option
          v-for="item in courseStatusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <br />

    <div class="block">
      <span class="demonstration">考试时间：</span>
      <el-date-picker v-model="ExamDate" type="date" placeholder="选择日期"></el-date-picker>
    </div>
    <br />

    <div>
      生成对应考试系统目录：
      <el-switch v-model="createExamCatalog" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </div>
    <br />

    <div style="border:1px solid;text-align:left">
      <!-- 开始。。。。。。。。。。。。。。。。。 -->

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        height="320"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column sortable prop="sid" label="学号" width="160"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column
          prop="grade"
          :filters="[{text: '2016', value: '2016'}, {text: '2017', value: '2017'}, {text: '2018', value: '2018'}, {text: '2019', value: '2019'}]"
          :filter-method="filterHandler"
          label="年级"
          width="80"
        ></el-table-column>
        <el-table-column prop="department" label="院系" width="140"></el-table-column>

        <el-table-column prop="major" sortable label="专业" width="160"></el-table-column>
        <el-table-column prop="class" sortable label="班级" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
      <div style="margin-top: 20px">
        <el-button @click="add()">添加</el-button>
        <el-button @click="toggleSelection()">清空选择</el-button>

      </div>

      <!-- /结束。。。。。。。。。。。。。。。 -->
    </div>

    ------------------已选列表---------------------------------------
    <div style="border:1px solid;text-align:left">
      <!-- 开始。。。。。。。。。。。。。。。。。 -->

      <el-table
        :data="students"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        height="320"
      >
        <el-table-column sortable prop="sid" label="学号" width="160"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column
          prop="grade"
          sortable
          label="年级"
          width="80"
        ></el-table-column>
        <el-table-column prop="department" label="院系" width="140"></el-table-column>

        <el-table-column prop="major" sortable label="专业" width="160"></el-table-column>
        <el-table-column prop="class" sortable label="班级" show-overflow-tooltip></el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="50"></el-pagination>

      <!-- /结束。。。。。。。。。。。。。。。 -->
    </div>




----------------------------------------------------------------
    <br />

    <br />

    <!-- <el-button type="primary" @click="save">保存</el-button>
    <el-button type="primary" @click="release">发布</el-button>-->
    <br />
    <br />
    <br />
  </div>
</template>



<script>
export default {
  name: "AddClass",
  data() {
    return {
      courseStatusOptions: [{ value: "进行中", label: "进行中" }],
      courseStatus: "进行中",
      ExamDate: "",
      share: false,
      createExamCatalog: false,

      students: [],
      tableData: [
        {
          sid: "201610098268",
          name: "王小虎",
          grade: "2016",
          department:"计算机工程学院",
          major:"计算机科学与技术",
          class:2
        },
         {
          sid: "201610098258",
          name: "李宏皋",
          grade: "2016",
          department:"计算机工程学院",
          major:"计算机科学与技术",
          class:1
        },
         {
          sid: "201610098269",
          name: "王小名",
          grade: "2017",
          department:"计算机工程学院",
          major:"软件工程",
          class:1
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    add(){

      for(var i=0;i<this.multipleSelection.length;i++)
      {
        this.students.push(this.multipleSelection[i])
      }
      var arr = this.students;
      const res = new Map();
      arr =  arr.filter((arr) => !res.has(arr.sid) && res.set(arr.sid, 1))
      this.students = arr

      console.log(arr)
    },
     handleDelete(index, row) {
        console.log(index, row);
        this.students.splice(index,1)
      },
     filterHandler(value, row, column) {
        const property = column['property'];
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

    release() {
      alert("发布成功");
    },

    save() {
      var addClass = {
        teachers: this.teachers,
        courseStatus: this.courseStatus,
        ExamDate: this.ExamDate,
        students: this.students,
        share: this.share,
        createExamCatalog: this.createExamCatalog
      };

      console.log(addClass);
      localStorage.setItem("addClass", JSON.stringify(addClass));
    }
  }
};
</script>

<style scoped>
.add-class {
  text-align: center;
  padding-top: 12px;
  border-radius: 4px;
  background: white;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
</style>
