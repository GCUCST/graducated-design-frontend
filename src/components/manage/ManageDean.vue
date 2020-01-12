<template>
  <div class="manage-dean">
      <el-tabs tab-position="up">
        <el-tab-pane :label="msg">{{msg}}</el-tab-pane>
      </el-tabs>
  </div>
</template>



<script>
export default {
  name: "ManageDean",
  data() {
    return {
      msg: "管理教务员"
    };
  }
};
</script>

<style scoped>
.manage-dean {
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  height: 600px;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
}
</style>
