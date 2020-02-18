<template >
  <div class="add-class">
   <el-tabs stretch>
    <el-tab-pane label="所有学生" >
     <div style="text-align:center">
      <!-- 开始。。。。。。。。。。。。。。。。。 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        height="350"
      >
        <el-table-column type="selection" ></el-table-column>
        <el-table-column sortable prop="sid" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
       
        <el-table-column
          prop="grade"
          :filters="[{text: '2016', value: '2016'}, {text: '2017', value: '2017'}, {text: '2018', value: '2018'}, {text: '2019', value: '2019'}]"
          :filter-method="filterHandler"
          label="年级"
        ></el-table-column>

        <el-table-column prop="department" label="院系" ></el-table-column>

        <el-table-column prop="major" sortable label="专业" ></el-table-column>
        <el-table-column prop="class" sortable label="班级" show-overflow-tooltip></el-table-column>
      </el-table>
      <br>
      <div>
        <el-button @click="add()">添加</el-button>
        <el-button @click="toggleSelection()">清空选择</el-button>
      </div>
      <!-- /结束。。。。。。。。。。。。。。。 -->
    </div>
    </el-tab-pane>



    <el-tab-pane label="已选择学生">

         <div style="text-align:canter">
      <!-- 开始。。。。。。。。。。。。。。。。。 -->
      <el-table
        :data="students"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        height="350"
      >
        <el-table-column sortable prop="sid" label="学号" ></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column
          prop="grade"
          sortable
          label="年级"
          
        ></el-table-column>
        <el-table-column prop="department" label="院系"></el-table-column>

        <el-table-column prop="major" sortable label="专业" ></el-table-column>
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
      
          <div >
          共{{students.length }} 名学生，班级名称： <el-input v-model="className" style="width:200px;"></el-input>
         </div>
        <el-button @click="save">保存</el-button>  
        <el-button @click="cancel">取消</el-button>
        
      <!-- /结束。。。。。。。。。。。。。。。 -->
    </div>
    </el-tab-pane>
  </el-tabs>

  

   




    <br />
  </div>
</template>



<script>
import VueBus from "../../../utils/VueBus.js"
export default {
  name: "AddClass",
  data() {
    return {
      // courseStatusOptions: [{ value: "进行中", label: "进行中" }],
      // courseStatus: "进行中",
      // ExamDate: "",
      // share: false,
      // createExamCatalog: false,
      className:null,  //新建班级的名称
      students: [],  //添加的学生
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
      ],   //全体学生数据
      multipleSelection: []  //临时多选的变量
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
      alert("添加成功！")
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

    cancel() {
        VueBus.$emit("closeAddClass",true)
    },

    save() {
      if(this.students.length==0){
        alert("请至少添加一名学生！")
        return;
      }
      if(this.className==null){
        alert("请输入班级名称！")
        return;
      }
      
      console.log("courseIndex："+localStorage.getItem("courseIndex"))
     var courseObjects =  JSON.parse(localStorage.getItem("courseObjects"))
     courseObjects[parseInt(localStorage.getItem("courseIndex"))].class = this.className
     courseObjects[parseInt(localStorage.getItem("courseIndex"))].student = this.students
     localStorage.setItem("courseObjects",JSON.stringify(courseObjects))
      VueBus.$emit("closeAddClass",true)

      //做值赋

    
    }
  }
};
</script>

<style scoped>
.add-class {
  text-align: center;
  width: 80%;
  box-shadow:1px 0px 10px 1px rgba(0, 0, 0, 0.1);
  /* margin-bottom: 20px; */
background: white;
    position: fixed;
    z-index: 999;
    overflow: auto;
    height: 500px;
    top: 75px;
}
</style>
