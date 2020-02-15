<template>
  <div>
    账号：{{user.account}}<br />
    身份：{{user.role=='dean'?'教务员':user.role=='teacher'?'教师':user.role=='student'?'学生':'管理员'}}<br>
   
    <div v-if="user.role=='teacher'">
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
    </div>
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
    </div>


  </div>
</template>


<script>
export default {
  name: "myinfo",
  data() {
    return {
      msg: "个人中心",
      user: JSON.parse(localStorage.getItem("userInfo"))
    };
  }
};
</script>

<style scoped>
</style>
