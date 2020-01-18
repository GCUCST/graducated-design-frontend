<template>
  <div class="courses">
     <h3>我的课程</h3>
      <div class="content">
        <el-card
        shadow="hover"
        v-for="i in 3"
        :key="i"
        class="box-card">
          <img src="https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=3fc712b65c4e9258b2398ebcfdebba3d/8718367adab44aed18974436b91c8701a08bfb03.jpg" class="image">
          <div class="cour-name">
          <span @click="routeJump('TestSetting')">计算机网络</span>
          </div>
        </el-card>
      </div>
      <div class="clean"></div>
      <div class="page">
          <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
      </div>
  </div>
</template>


<script>
export default {
  name: "courses",
  data() {
    return {
      msg: "考试系统-课程",
    };
  },
  methods:{
    routeJump(e) {
      console.log(e);

      if (e == "TestSetting") this.$router.push({ name: "TestSetting" });
    }
  }
};
</script>

<style scoped>
.courses{
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  height: 600px;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
.content{
   display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  cursor:pointer
}
.image{
  width: 235px;
  height: 236px;
}
.cour-name{
  padding: 15px;
  font-size: 20px;
}
.clean{
  clear: both;
}
.box-card{
  width: 300px;
  margin:2%;
}
.page{
  text-align:center;
  margin-top: 30px;
}

</style>
