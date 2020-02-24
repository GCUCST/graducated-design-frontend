<template>
  <div>
    <el-tabs tab-position="left" style="height: 100%">
      <el-tab-pane label="基本信息">
        <div style="margin:0 auto;margin-top:25px;width:90%;font-size:18px;line-height:40px">
          <div style="display:flex">
            <div style="width:50%;padding-left:10%;">
              用户账号：{{user.account}}
              <br />
              用户身份：{{user.role=='dean'?'教务员':user.role=='teacher'?'教师':user.role=='student'?'学生':'管理员'}}
              <br />
              创建时间：{{user.info.createTime}}
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
            </div>
            <div style="width:50%;padding-left:10%;border-left: 1px  dashed #409EFF;">
              身份证号：{{user.info.idcard}}
              <br />
              用户学历：{{user.info.education}}
              <br />
              用户职称：{{user.info.technicalTitle}}
              <br />
              所在部门：{{user.info.dept}}
              <br />
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
        <div style="margin:0 auto;margin-top:25px;width:90%;font-size:18px;line-height:50px">
          <div style="display:flex">
            <div style="width:50%;padding-left:10%;">
              用户昵称： <el-input style="width:50%" v-model="nickName"></el-input> 
              <br />用户姓名：<el-input style="width:50%" v-model="name"></el-input> 
              <br />用户性别：<el-input style="width:50%" v-model="gender"></el-input> 
              <br />用户年龄：<el-input style="width:50%" v-model="age"></el-input> 
              <br />用户邮箱：<el-input style="width:50%" v-model="email"></el-input> 
              <br />电话号码：<el-input style="width:50%" v-model="phone"></el-input> 
              <br />
            </div>
            <div style="width:50%;padding-left:10%;border-left: 1px  dashed #409EFF;">
              用户学历：<el-input style="width:50%" v-model="education"></el-input> 
              <br />用户职称：<el-input style="width:50%" v-model="technicalTitle"></el-input> 
              <br />所在部门：<el-input style="width:50%" v-model="dept"></el-input> 
              <br />用户宿舍：<el-input style="width:50%" v-model="dorm"></el-input> 
              <br />通讯地址：<el-input style="width:50%" v-model="city"></el-input> 
              <br />入职时间：<el-input style="width:50%" v-model="admissionDate"></el-input> 
              <br />身份证号：<el-input style="width:50%" v-model="idcard"></el-input> 
              <br />出生日期：<el-input style="width:50%" v-model="birthday"></el-input> 
              <br />政治面貌：<el-input style="width:50%" v-model="political"></el-input> 
              <br />
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!--     
    <div v-if="user.role=='student'">
    昵称：{{user.info.nickName}}<br>
    姓名：{{user.info.name}}<br>
    性别：{{user.info.gender==1?'男':'女'}}<br>
    邮箱：{{user.info.email}}<br>
    手机号：{{user.info.phone}}<br>
    身份：{{user.info.idcard}}<br>
    学生状态：{{user.info.status}}<br>
    创建时间：{{user.info.createTime}}<br>
    通讯地址：{{user.info.city}}<br>
    入职时间：{{user.info.admissionDate}}<br>
    政治面貌：{{user.info.political}}<br>
    出生日期：{{user.info.birthday}}<br>
    年龄：{{user.info.age}}<br>
    宿舍：{{user.info.dorm}}<br>
    专业：{{user.info.major}}<br>
    行政班级：{{user.info.adminClass}}<br>
    年级：{{user.info.grade}}<br>
    系别：{{user.info.secondaryCollege}}<br>
    </div>

     <div v-if="user.role=='dean'">
      昵称：{{user.info.nickName}}<br>
    姓名：{{user.info.name}}<br>
    性别：{{user.info.gender==1?'男':'女'}}<br>
    邮箱：{{user.info.email}}<br>
    手机号：{{user.info.phone}}<br>
    身份：{{user.info.idcard}}<br>
    学历：{{user.info.education}}<br>
    职称：{{user.info.technicalTitle}}<br>
    部门：{{user.info.dept}}<br>
    教工状态：{{user.info.status}}<br>
    创建时间：{{user.info.createTime}}<br>
    通讯地址：{{user.info.city}}<br>
    入职时间：{{user.info.admissionDate}}<br>
    政治面貌：{{user.info.political}}<br>
    出生日期：{{user.info.birthday}}<br>
    年龄：{{user.info.age}}<br>
    宿舍：{{user.info.dorm}}<br>
    </div>-->
  </div>
</template>


<script>
import LoginStatus from "../../../utils/LoginStatus.js";
export default {
  name: "myinfo",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("userInfo")),
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
    setTimeout(()=>{
      this.nickName=this.user.info.nickName,
      this.name=this.user.info.name,
      this.gender=this.user.info.gender,
      this.age=this.user.info.age,
      this.email=this.user.info.email,
      this.phone=this.user.info.phone,
      this.education=this.user.info.education,
      this.technicalTitle=this.user.info.technicalTitle,
      this.dept=this.user.info.dept,
      this.dorm=this.user.info.dorm,
      this.city=this.user.info.city,
      this.admissionDate=this.user.info.admissionDate,
      this.idcard=this.user.info.idcard,
      this.birthday=this.user.info.birthday,
      this.political=this.user.info.political
    },500)

  },
  
};
</script>

<style scoped>
</style>
