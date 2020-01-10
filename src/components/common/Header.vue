<template>
  <div class="header">
    <!-- 占位置的 -->
    <div class="header-logo"></div>

    <div class="header-name">{{msg}}</div>

    <div class="header-search">
        <div class="search">
            <el-input style="width:60%;"  placeholder="请输入内容" v-model="search"></el-input>
            <i style="color:white" class="el-icon-search"></i>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      msg: "华广学习系统",
      search:""
    };
  },
  methods: {}
};
</script>
<style scoped>
.header {
  height: 50px;
  width: 100%;
  background: #2a333c;
  display: flex;
}
.header-logo {
  width: 34%;
}
.header-name {
  background: #2a333c;
  width: 33%;
  color: white;
  font-size: 25px;
}
.header-search {
  background: #2a333c;
  width: 33%;
  margin: 0 auto;
}
.search{
    text-align: right;
    width: 60%;
    margin: 0 auto;
}
</style>
