
<template >
  <div class="manage-student" v-loading="loading">
    <div
      v-show="showEditPanel"
      style="
      text-align: center;
  width: 80%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 0 auto;
  background: white;
  z-index: 999;
  position:fixed;
  overflow: auto;
  height:450px;
  padding: 20px;
    "
    >
      <div style="text-align:right">
        <el-button @click=" showEditPanel=!showEditPanel " circle>X</el-button>
      </div>
      <div style="font-size:16px;">
        学号：{{oldStuInfo.stuId}} &nbsp;&nbsp;&nbsp;&nbsp;
        姓名：{{oldStuInfo.name}}&nbsp;&nbsp;&nbsp;&nbsp;
        年级：{{oldStuInfo.grade}}&nbsp;&nbsp;&nbsp;&nbsp;
        专业：{{oldStuInfo.major}}&nbsp;&nbsp;&nbsp;&nbsp;
        班级：{{oldStuInfo.adminClass}}
      </div>
      <el-tabs value="first">
        <el-tab-pane label="转专业" name="first">
          <div style="font-size:16px;;margin:50px 50px;">
            现专业：{{oldStuInfo.major}} ==>
            <el-select v-model="newStuInfo.major" placeholder="请选择">
              <el-option
                v-for="item in majorJson"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
            <el-select style="width:100px;" v-model="newStuInfo.adminClass" placeholder="请选择">
              <el-option v-for="i in 15" :key="i" :label="i+'班'" :value="i"></el-option>
            </el-select>
            <br />
            <br />
            <br />
            <el-button type="primary" @click="comfirmNewInfo('major')" round>确定</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="升降级" name="fourth">
          <div style="font-size:16px;;margin:50px 50px;">
            现年级：{{oldStuInfo.grade}}==>
            <el-select v-model="newStuInfo.grade" placeholder="请选择">
              <el-option
                v-for="item in gradeJson"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
            <br />
            <br />
            <br />
            <el-button type="primary" @click="comfirmNewInfo('grade')" round>确定</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- ----------------------------------------------------------------- -->

    <el-tabs tab-position="up">
      <el-tab-pane :label="'学生管理'">
        <div style="text-align:center">
          <!-- 开始。。。。。。。。。。。。。。。。。 -->
          <el-table
            id="one"
            ref="multipleTable"
            :data="allStudents.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            tooltip-effect="dark"
            height="450"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
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

            <el-table-column width="180" label="操作">
              <!-- eslint-disable-next-line -->
              <template slot="header" slot-scope="scope">
                <el-input @click="fun(scope.$index)" v-model="search" placeholder="输入姓名搜索" />
              </template>

              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
              <el-input
                show-word-limit
                maxlength="20"
                v-model="oneStudent.stuId"
                style="width:100px"
              />&nbsp;姓名：
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
            <!-- <el-button v-show="!showEditor" >共：{{allStudents.length}}</el-button> -->

            <el-button v-show="!showEditor" @click="exportStudents()">导出选中</el-button>

            <el-button v-show="!showEditor" @click="showEditor = !showEditor">添加学生</el-button>

            <el-button v-show="showEditor" @click="save()">确定添加</el-button>
            <el-button v-show="showEditor" @click="showEditor = !showEditor">取消</el-button>
          </div>
        </div>
        <!-- /结束。。。。。。。。。。。。。。。 -->

        <br />
      </el-tab-pane>

      <!-- ----------------------------------------------------------------- -->

      <el-tab-pane label="批量添加学生">
        <div style="text-align:left;height:500px;">
          <el-button @click="downloadXlsDemo()" size="mini" type="primary">模板</el-button>
          <el-button style size="mini" @click="selFile()" type="primary">{{fileName}}</el-button>

          <el-button @click="parseStudentJson()" size="mini" type="primary">解析</el-button>
          <el-button @click="distinctFromAllstudents()" size="mini" type="primary">去重</el-button>

          <input style="opacity: 0;
    width: 0px;" @change="updateFile()" type="file" id="file" />

          <el-table
            :data="batchStudent.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            tooltip-effect="dark"
            height="450"
          >
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column sortable prop="stuId" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column
              prop="gender"
              :filters="[{text: '男', value: 1},{text: '女', value: 0},{text:'未设置',value:-1}]"
              :filter-method="filterHandler"
              label="性别"
            >
              <!-- <template slot-scope="scope">
                <span
                  style="margin-left: 10px"
                >{{ scope.row.gender==1?'男':scope.row.gender==0?'女':'未设置' }}</span>
              </template>-->
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
            <el-table-column width="180" label="操作">
              <!-- eslint-disable-next-line -->
              <template slot="header" slot-scope="scope">
                <el-input @click="fun(scope.$index)" v-model="search" placeholder="输入姓名搜索" />
              </template>
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="remove(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-button @click="batchStudentAdd()">批量添加</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>



<script>
import VueBus from "../../utils/VueBus";
import UrlConfig from "../../config/UrlConfig";
import axios from "axios";
export default {
  name: "Student",
  data() {
    return {
      exportSelctStudents: [],
      xlsDemoAddress: UrlConfig.getQiniuyunUrl() + "addStudentsDemo.xls",
      file: {},
      fileName: "选择",
      batchStudent: [],
      showEditPanel: false,
      search: "", //查找学生
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
      allStudents: [], //全体学生数据
      majorJson: [],
      gradeJson: [],

      oldStuInfo: {
        major: null,
        grade: null,
        name: null,
        stuId: null,
        adminClass: null
      },
      newStuInfo: {
        major: null,
        grade: null,
        name: null,
        stuId: null,
        adminClass: null
      }
    };
  },
  mounted() {
    this.getGSMA();
    this.getAllStudents();
  },
  methods: {
    sheet2blob(sheet, sheetName) {
	sheetName = sheetName || 'sheet1';
	var workbook = {
		SheetNames: [sheetName],
		Sheets: {}
	};
	workbook.Sheets[sheetName] = sheet;
	// 生成excel的配置项
	var wopts = {
		bookType: 'xlsx', // 要生成的文件类型
		bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
		type: 'binary'
	};
	var wbout = XLSX.write(workbook, wopts);
	var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
	// 字符串转ArrayBuffer
	function s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
	return blob;
},

    openDownloadDialog(url, saveName) {
      if (typeof url == "object" && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
      }
      var aLink = document.createElement("a");
      aLink.href = url;
      aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      var event;
      if (window.MouseEvent) event = new MouseEvent("click");
      else {
        event = document.createEvent("MouseEvents");
        event.initMouseEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
      }
      aLink.dispatchEvent(event);
    },
    exportStudents() {
      if(this.exportSelctStudents.length==0){
        alert("请选择学生。")
        return ;
      }

      console.log(this.exportSelctStudents);
        var aoa = [
          ["stuId", "name", "gender", "grade","major","adminClass"]
        ];
      this.exportSelctStudents.forEach(element => {
        aoa.push([element.stuId,element.name,element.gender==1?'男':element.gender==0?'女':'未设置',
        element.grade,element.major,element.adminClass])
      });

      var sheet = XLSX.utils.aoa_to_sheet(aoa);
      this.openDownloadDialog(this.sheet2blob(sheet), "student_export.xlsx");
    },




    downloadXlsDemo() {
      window.open(this.xlsDemoAddress);
    },

    distinctFromAllstudents() {
      var that = this;
      this.allStudents.forEach((element2, index2) => {
        this.batchStudent.forEach((element, index) => {
          if (element.stuId == element2.stuId) {
            that.batchStudent.splice(index, 1);
          }
        });
      });
    },
    batSaveOne(stuId, name, gender, major, grade, adminClass) {
      var that = this;
      var params = new URLSearchParams();
      params.append("stuId", stuId);
      params.append("name", name);
      params.append("gender", gender == "男" ? 1 : gender == "女" ? 0 : -1);
      params.append("major", major);
      params.append("grade", grade);
      params.append("adminClass", adminClass);
      axios
        .post("/comm/addStudent", params)
        .then(function(response) {
          console.log(response);
          if (response.data.object.code == 200) {
            // console.log(stuId+" 插入成功！");
            that.$message({
              message: stuId + "：" + name + " 插入成功！",
              type: "success"
            });
            that.batchStudent.forEach((element, index) => {
              if (element.stuId == stuId) {
                that.batchStudent.splice(index, 1);
              }
            });
          } else {
            that.$message.error(stuId + "：" + name + " 插入失败！已存在");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    batchStudentAdd() {
      this.batchStudent.forEach((element, index) => {
        console.log(element, index);
        this.batSaveOne(
          element.stuId,
          element.name,
          element.gender,
          element.major,
          element.grade,
          element.adminClass
        );
      });
      setTimeout(() => {
        this.getAllStudents();
      }, 2000);
    },
    remove(index, row) {
      var params = new URLSearchParams();
      // params.append("stuId", row.stuId);

      var that = this;
      this.$confirm("取消新增该学生？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.batchStudent.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    updateFile() {
      var that = this;
      var obj = document.getElementById("file").files;
      if (obj.length == 0) {
        this.fileName = "选择";
        return;
      }
      var f = obj[0];
      if (f != null) {
        this.file = f;
      }
      console.log(this.file.name);
      this.fileName = this.file.name;
    },
    selFile() {
      document.getElementById("file").click();
    },
    parseStudentJson() {
      var that = this;
      var obj = document.getElementById("file").files;
      var wb;
      if (obj.length == 0) {
        this.$message.error("请选择xls文件");
        return;
      }
      var extension = obj[0].name.substring(obj[0].name.lastIndexOf(".") + 1);
      console.log(extension);
      if (
        extension != "xls" &&
        extension != "XLS" &&
        extension != "xlsx" &&
        extension != "XLSX"
      ) {
        this.$message.error("请选择xls文件");
        return;
      }

      var f = obj[0];
      //新建文件读取
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        //将文件读取为二进制字符串
        wb = XLSX.read(data, { type: "binary" });
        // alert(wb.SheetNames[0]);
        // wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        // wb.Sheets[Sheet名]获取第一个Sheet的数据
        var valiData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        console.log(valiData[0]);
        if (
          valiData.length > 0 &&
          valiData[0].stuId != undefined &&
          valiData[0].name != undefined
        )
          that.batchStudent = XLSX.utils.sheet_to_json(
            wb.Sheets[wb.SheetNames[0]]
          );
        else {
          that.$message.error("文件数据有误！");
        }
      };
      reader.readAsBinaryString(f);
    },

    comfirmNewInfo(ops) {
      var that = this;
      console.log(ops);
      if (ops == "major") {
        var params = new URLSearchParams();
        params.append("stuId", this.newStuInfo.stuId);
        params.append("major", this.newStuInfo.major);
        params.append("adminClass", this.newStuInfo.adminClass);
        axios
          .post("/comm/changeMajor", params)
          .then(function(response) {
            console.log(response);
            if (response.data.code == 200) {
              that.$message({
                showClose: true,
                type: "success",
                message: "成功"
              });
              that.getAllStudents();
              that.oldStuInfo.major = that.newStuInfo.major;
              that.oldStuInfo.adminClass = that.newStuInfo.adminClass;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (ops == "grade") {
        var params = new URLSearchParams();
        params.append("stuId", this.newStuInfo.stuId);
        params.append("grade", this.newStuInfo.grade);
        axios
          .post("/comm/changeGrade", params)
          .then(function(response) {
            if (response.data.code == 200) {
              that.$message({
                showClose: true,
                type: "success",
                message: "成功"
              });
              that.getAllStudents();
              that.oldStuInfo.grade = that.newStuInfo.grade;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    fun(num) {},
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
          that.majorJson = majorJson;
          for (var i = 0; i < majorJson.length; i++) {
            that.majorFileter.push({
              text: majorJson[i].name,
              value: majorJson[i].name
            });
          }

          var gradeJson = JSON.parse(response.data.object.gsmajson).grade;
          that.gradeJson = gradeJson;
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
      this.oldStuInfo = {
        major: row.major,
        grade: row.grade,
        adminClass: row.adminClass,
        name: row.name,
        stuId: row.stuId
      };
      this.newStuInfo = {
        major: row.major,
        grade: row.grade,
        adminClass: row.adminClass,
        name: row.name,
        stuId: row.stuId
      };
      this.showEditPanel = true;
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
      this.exportSelctStudents = val;
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
        this.$message.error("请输入学生学号！");
        return;
      }
      if (this.oneStudent.name == null || this.oneStudent.name == "") {
        this.$message.error("请输入学生姓名！");
        return;
      }
      if (
        this.oneStudent.adminClass == null ||
        this.oneStudent.adminClass == ""
      ) {
        this.$message.error("请输入学生班级！");
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
            that.$message({
              message: "添加成功。",
              type: "success"
            });
          } else {
            that.$message.error("插入失败。");
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
