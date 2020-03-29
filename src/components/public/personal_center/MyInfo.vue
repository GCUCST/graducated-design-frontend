<template>
  <div>
    <el-tabs tab-position="left" style="height: 100%">
      <el-tab-pane label="基本信息">
        <div
          style="margin:0 auto;margin-top:25px;margin-bottom:50px;width:90%;font-size:18px;line-height:40px"
        >
          <div style="display:flex">
            <div style="width:50%;padding-left:10%;">
              用户账号：{{user.account}}
              <br />
              用户身份：{{user.role=='dean'?'教务员':user.role=='teacher'?'教师':user.role=='student'?'学生':'管理员'}}
              <br />
              用户昵称：{{user.info.nickName}}
              <br />
              用户姓名：{{user.info.name}}
              <br />
              用户性别：{{user.info.gender==1?'男':'女'}}
              <br />
              用户年龄：{{user.info.age}}
              <br />
              教工状态：{{user.info.status}}
              <br />
              用户邮箱：{{user.info.email}}
              <br />
              电话号码：{{user.info.phone}}
              <br />
              创建时间：{{user.info.createTime}}
              <br />
            </div>
            <div style="width:50%;padding-left:10%;border-left: 1px  dashed #409EFF;">
              身份证号：{{user.info.idcard}}
              <br />

              <span v-if="user.info.role=='dean'||user.info.role=='teacher'">
                用户学历：{{user.info.education}}
                <br />
                用户职称：{{user.info.technicalTitle}}
                <br />
                所在部门：{{user.info.dept}}
                <br />
              </span>
              <span v-if="user.info.role=='student'">
                所属年级：{{user.info.grade}}
                <br />
                所属系别：{{user.info.secondaryCollege}}
                <br />
                所属专业：{{user.info.major}}
                <br />
                行政班级：{{user.info.adminClass}}
                <br />
              </span>
              通讯地址：{{user.info.city}}
              <br />
              入职时间：{{user.info.admissionDate}}
              <br />
              政治面貌：{{user.info.political}}
              <br />
              出生日期：{{user.info.birthday}}
              <br />
              用户宿舍：{{user.info.dorm}}
              <br />
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改信息">
        <div
          style="margin-bottom:50px;margin:0 auto;margin-top:25px;width:90%;font-size:18px;line-height:50px"
        >
          <div style="display:flex">
            <div style="width:50%;padding-left:10%;">
              用户账号：{{user.account}}
              <br />
              用户身份：{{user.role=='dean'?'教务员':user.role=='teacher'?'教师':user.role=='student'?'学生':'管理员'}}
              <br />用户昵称：
              <span style="color:red">*</span>
              <el-input style="width:50%" v-model="nickName"></el-input>
              <br />用户姓名：
              <el-input disabled style="width:50%" v-model="name"></el-input>
              <br />用户性别：
              <el-select v-model="gender" placeholder="请选择" style="width:50%">
                <el-option
                  v-for="item in [{value:1,label:'男'},{value:0,label:'女'},{value:-1,label:'保密'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <br />用户年龄：
              <el-input-number v-model="age" style="width:50%" :min="1" :max="200" />
              <br />用户邮箱：
              <span style="color:red">*</span>
              <el-input style="width:50%" v-model="email"></el-input>
              <br />电话号码：
              <el-input style="width:50%" v-model="phone"></el-input>
              <br />
            </div>

            <div style="width:50%;padding-left:10%;border-left: 1px  dashed #409EFF;">
              <span v-if="user.info.role=='dean'||user.info.role=='teacher'">
                用户学历：
                <el-input style="width:50%" v-model="education"></el-input>
                <br />用户职称：
                <el-input style="width:50%" v-model="technicalTitle"></el-input>
                <br />所在部门：
                <el-input style="width:50%" v-model="dept"></el-input>
              </span>

              <span v-if="user.info.role=='student'">
                所属年级：
                <el-input disabled style="width:50%" v-model="grade"></el-input>
                <br />所属系别：
                <el-input disabled style="width:50%" v-model="secondaryCollege"></el-input>
                <br />所属专业：
                <el-input disabled style="width:50%" v-model="major"></el-input>

                <br />行政班级：
                <el-input disabled style="width:50%" v-model="adminClass"></el-input>
              </span>

              <br />用户宿舍：
              <span style="color:red">*</span>
              <el-input style="width:50%" v-model="dorm"></el-input>
              <br />通讯地址：
              <span style="color:red">*</span>
              <el-input style="width:50%" v-model="city"></el-input>
              <br />入职时间：
              <span style="color:red">*</span>
              <!-- <el-input style="width:50%" v-model="admissionDate"></el-input> -->
              <el-date-picker
                style="width:50%"
                v-model="admissionDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              <br />身份证号：
              <el-input style="width:50%" v-model="idcard"></el-input>
              <br />出生日期：
              <span style="color:red">*</span>
              <!-- <el-input style="width:50%" v-model="birthday"></el-input> -->
              <el-date-picker
                value-format="yyyy-MM-dd"
                style="width:50%"
                v-model="birthday"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
              <br />政治面貌：
              <span style="color:red">*</span>
              <el-input style="width:50%" v-model="political"></el-input>
              <br />
            </div>
          </div>
          <br />
          <div style="text-align:center">
            <el-button @click="updateMyInfo" plain type="large">更新信息</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!--     
    <div v-if="user.role=='student'">
    专业：{{user.info.major}}<br>
    行政班级：{{user.info.adminClass}}<br>
    年级：{{user.info.grade}}<br>
    系别：{{user.info.secondaryCollege}}<br>
    </div>

    -->
  </div>
</template>


<script>
import LoginStatus from "../../../utils/LoginStatus.js";
import axios from "axios";
export default {
  name: "myinfo",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("userInfo")),

      grade: null,
      secondaryCollege: null,
      major: null,
      adminClass: null,
      //新加入
      nickName: null,
      name: null,
      gender: null,
      age: null,
      email: null,
      phone: null,
      education: null,
      technicalTitle: null,
      dept: null,
      dorm: null,
      city: null,
      admissionDate: null,
      idcard: null,
      birthday: null,
      political: null
    };
  },
  mounted() {
    //刷新用户
    LoginStatus.reflashAndSetUserInfo();
    setTimeout(() => {
      this.user = JSON.parse(localStorage.getItem("userInfo"));
    }, 1000);

    setTimeout(() => {
      this.grade = this.user.info.grade;
      this.secondaryCollege = this.user.info.secondaryCollege;
      this.major = this.user.info.major;
      this.adminClass = this.user.info.adminClass;
      this.nickName = this.user.info.nickName;
      this.name = this.user.info.name;
      this.gender = this.user.info.gender;
      this.age = this.user.info.age;
      this.email = this.user.info.email;
      this.phone = this.user.info.phone;
      this.education = this.user.info.education;
      this.technicalTitle = this.user.info.technicalTitle;
      this.dept = this.user.info.dept;
      this.dorm = this.user.info.dorm;
      this.city = this.user.info.city;
      this.admissionDate = this.user.info.admissionDate;
      this.idcard = this.user.info.idcard;
      this.birthday = this.user.info.birthday;
      this.political = this.user.info.political;
    }, 2000);
  },
  methods: {
    updateMyInfo() {
      if (this.email == null || this.email == "") {
        this.$message.error("邮箱不允许为空");
        return;
      }
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!reg.test(this.email)) {
        this.$message.error("邮箱格式错误");
        return;
      }
      if (this.admissionDate == null || this.admissionDate == "") {
        this.$message.error("填写完整");
        return;
      }
      if (this.birthday == null || this.birthday == "") {
        this.$message.error("填写完整");
        return;
      }
      if (this.city == null || this.city == "") {
        this.$message.error("填写完整");
        return;
      }
      if (this.nickName == null || this.nickName == "") {
        this.$message.error("填写完整");
        return;
      }
      if (this.political == null || this.political == "") {
        this.$message.error("填写完整");
        return;
      }
      if (this.dorm == null || this.dorm == "") {
        this.$message.error("填写完整");
        return;
      }

      //判断是学生还是教工
      if (this.user.role == "student") {
        console.log("更新学生。");
        var parmas = new URLSearchParams();
        parmas.append("nickName", this.nickName);
        parmas.append("name", this.name);
        parmas.append("gender", this.gender);
        parmas.append("age", this.age);
        parmas.append("email", this.email);
        parmas.append("phone", this.phone);
        parmas.append("grade", this.grade);
        parmas.append("secondaryCollege", this.secondaryCollege);
        parmas.append("major", this.major);
        parmas.append("adminClass", this.adminClass);
        parmas.append("dorm", this.dorm);
        parmas.append("city", this.city);
        parmas.append("admissionDate", this.admissionDate);
        parmas.append("IDcard", this.idcard);
        parmas.append("birthday", this.birthday);
        parmas.append("political", this.political);
        var that = this;
        axios
          .post("/comm/updateStudent", parmas)
          .then(function(response) {
            console.log(response);
            if (response.data.object == 1) {
              that.$message({
                message: "更新信息成功",
                type: "success"
              });
              LoginStatus.reflashAndSetUserInfo();
              setTimeout(() => {
                that.user = JSON.parse(localStorage.getItem("userInfo"));
              }, 1500);
            } else {
              this.$message.error("服务器开小差，更新失败！");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        return;
      } else {
        console.log("更新教工。");
        var that = this;
        var parmas = new URLSearchParams();
        parmas.append("nickName", this.nickName);
        parmas.append("name", this.name);
        parmas.append("gender", this.gender);
        parmas.append("age", this.age);
        parmas.append("email", this.email);
        parmas.append("phone", this.phone);
        parmas.append("education", this.education);
        parmas.append("technicalTitle", this.technicalTitle);
        parmas.append("dorm", this.dorm);
        parmas.append("dept", this.dept);
        parmas.append("admissionDate", this.admissionDate);

        parmas.append("city", this.city);
        parmas.append("IDcard", this.idcard);
        parmas.append("birthday", this.birthday);
        parmas.append("political", this.political);
        // alert(new Date(this.birthday ))
        axios
          .post("/comm/updateStaff", parmas)
          .then(function(response) {
            console.log(response);
            if (response.data.object == 1) {
              that.$message({
                message: "更新信息成功",
                type: "success"
              });
              LoginStatus.reflashAndSetUserInfo();
              setTimeout(() => {
                that.user = JSON.parse(localStorage.getItem("userInfo"));
              }, 1500);
            } else {
              that.$message.error("服务器开小差，更新失败！");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
