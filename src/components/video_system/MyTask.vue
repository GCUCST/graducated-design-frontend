
<template >
  <div class="mytask"  v-loading="loading" @click="visible=false" @contextmenu.prevent>
    <el-tabs tab-position="up">
      <el-tab-pane :label="'教学任务'">
        <el-table :data="myTasks" style="width: 100%">
          <el-table-column prop="id" label="任务编号" width="80"></el-table-column>
          <el-table-column prop="teacherName" label="教师名称" width="80"></el-table-column>
          <el-table-column prop="courseName" label="课程名称"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column prop="createDate" label="创建时间"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>




<script>
import axios from "axios";

export default {
  name: "MyTeach",
  data() {
    return {
      loading:true,
      msg: "教师任务表。",
      allTasks: null,
      myTasks: []
    };
  },
  mounted() {
    this.getAllTask();
  },
  methods: {
    getAllTask() {
      var that = this;
      axios
        .post("/comm/getAllTasks")
        .then(function(response) {
          that.allTasks = response.data.object;
          that.allTasks.forEach(element => {
            if (
              element.teacherId ==
              JSON.parse(localStorage.getItem("userInfo")).account
            ) {
              that.myTasks.push(element);
            }
          });

          that.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.mytask {
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  min-height: 600px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
