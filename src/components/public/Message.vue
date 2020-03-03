<template>
  <div class="message">
    <el-tabs tab-position="up">
      <el-tab-pane label="消息系统" value="first">
        <el-tabs stretch style="width:70%;margin: 0 auto;text-align:center">
          <el-tab-pane>
            <span slot="label" name="first">
              未读消息
              <el-badge :value="unReadMsgs.length" v-show="unReadMsgs.length!=0" class="item"></el-badge>
            </span>

            <div style="margin-top:180px;" v-if="unReadMsgs.length==0">暂无消息</div>

            <el-collapse
              v-for="(item,index) in unReadMsgs"
              :key="index"
              v-model="activeNames"
              @change="handleChange"
            >
              <el-collapse-item name="1">
                <template slot="title">
                  <div
                    style="width:95%;display:flex;flex-flow:flex-wrap;justify-content:space-between"
                  >
                    <div style="text-indent:0em;font-size:18px">{{item.title}}</div>
                    <div>
                      <el-badge :value="1"></el-badge>
                    </div>
                  </div>
                </template>
                <br />
                <div
                  style="margin:0 auto;width:80%;text-align:left;text-indent:2em;font-size:16px"
                >{{item.content}}</div>

                <div style="margin-top:20px;text-align:right">
                  <el-button @click="read(item.id,index,item)" type="primary" icon="el-icon-check" circle></el-button>
                </div>
                <br />
                <div style="text-align:right">来源：{{item.senderName}}({{item.sender}})</div>
                <div style="text-align:right">——{{item.createTime}}</div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>





          <el-tab-pane label="已读消息" name="second">
            <div style="margin-top:180px;" v-if="hadReadMsgs.length==0">暂无消息</div>
            <el-collapse
              v-for="(item,index) in hadReadMsgs"
              :key="index"
              v-model="activeNames"
              @change="handleChange"
            >
              <el-collapse-item>
                <template slot="title">
                  <div
                    style="width:95%;display:flex;flex-flow:flex-wrap;justify-content:space-between"
                  >
                    <div style="text-indent:0em;font-size:18px">{{item.title}}</div>
                  </div>
                </template>
                <br />
                <div
                  style="margin:0 auto;width:80%;text-align:left;text-indent:2em;font-size:16px"
                >{{item.content}}</div>

                <div style="margin-top:20px;text-align:right"></div>
                <br />
                <div style="text-align:right">来源：{{item.senderName}}({{item.sender}})</div>
                <div style="text-align:right">——{{item.createTime}}</div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Message",
  data() {
    return {
      activeNames: [],
      hadReadMsgs: [],
      unReadMsgs: [],
      myAllMsgs: [],
      msg: "消息系统"
    };
  },
  mounted() {
    this.getAllMyMessages();
  },
  methods: {
    read(id,index,item) {
      console.log(id);
      var parmas = new URLSearchParams();
      parmas.append("id", id);
      var that = this;
      axios
        .post("/comm/updMessage", parmas)
        .then(function(response) {
          if(response.data.object==1){
               that.$message({
          message: '已读',
          type: 'success'
        });
        that.unReadMsgs.splice(index,1);
        that.hadReadMsgs.push(item);
          }else{
              that.$message.error('失败，请刷新重拾。');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleChange(val) {
      console.log(val);
    },
    getAllMyMessages() {
      // var parmas = new URLSearchParams();
      var that = this;
      axios
        .post("/comm/getAllMyMessages")
        .then(function(response) {
          console.log(response);
          that.myAllMsgs = response.data.object;
          that.myAllMsgs.forEach(element => {
            if (element.messageStatus == "unRead") {
              that.unReadMsgs.push(element);
            } else {
              if (element.messageStatus == "hadRead") {
                that.hadReadMsgs.push(element);
              }
            }
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
.message {
  margin: 20px auto;
  padding: 30px;
  background: white;
  width: 95%;
  height: 600px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.item {
  margin-top: 0px;
  margin-left: 10px;
}
</style>
