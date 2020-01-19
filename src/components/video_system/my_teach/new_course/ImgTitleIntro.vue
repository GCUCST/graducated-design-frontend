<template>
  <div class="body">
    <!-- 封面 -->
    <div style="margin: auto;">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <!-- /封面 -->

    <!-- 名称和介绍 -->
    <div style="width:60%;text-align:center;margin:auto">
      <br />
      <div name="标题">
        <el-input style="width:80%;" v-model="textTitle" placeholder="标题.."></el-input>
      </div>
      <br />
      <div name="介绍" :disable="true" style="text-align:center">
        <el-input
          style="width:80%"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 3}"
          placeholder="介绍.."
          v-model="textIntro"
        ></el-input>
      </div>
    </div>
    <!-- /名称和介绍 -->

    <br />
    <!-- 其他选项 -->
    <div style="text-align:left;width:48%;margin:0 auto;">
      <div>
        性&emsp;&emsp;质：
        <el-select v-model="courseType" placeholder="请选择">
          <el-option
            v-for="item in  options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <br />
      <div>
        学&emsp;&emsp;时：
        <el-input-number v-model="courseHour" :min="1" :max="1000" label="描述文字"></el-input-number>
      </div>
      <br />
      <div v-if="courseType!='public'">
        学&emsp;&emsp;分：
        <el-input-number v-model="credit" :precision="2" :step="0.1" :max="10"></el-input-number>
      </div>
      <br />
      <div style="display:flex;line-height:42px;" v-if="courseType!='public'">
        课程时间：
        <el-date-picker
          style="width:60%;"
          v-model="date"
          unlink-panels
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
    </div>

    <!-- 标签 -->
    <div style="width:80%;margin:0 auto;text-align:center;padding-top:30px">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >{{tag}}</el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
    </div>
    <!--/标签 -->
    <br />

    <el-button type="primary" @click="save">保存</el-button>

    <br />
    <br />

    <!-- /其他选项 -->
  </div>
</template>




<script>
export default {
  name: "test",
  data() {
    return {
      msg: "介绍",
      imageUrl: "",
      textTitle: "",
      textIntro: "",

      dynamicTags: [],
      inputVisible: false,
      inputValue: "",

      courseHour: 64,
      credit: 2,

      options: [
        { label: "公开课", value: "public" },
        { label: "必修课", value: "b" },
        { label: "选修课", value: "c" },
        { label: "通选课", value: "d" },
        { label: "其他", value: "e" }
      ],
      courseType: "b",

      date: ""
    };
  },
  methods: {
    save() {
      var intordutcion = {
      imageUrl: this.imageUrl,
      textTitle: this.textTitle,
      textIntro: this.textIntro,
      dynamicTags: this.dynamicTags,
      inputVisible: this.inputVisible,
      courseHour: this.courseHour,
      credit: this.credit,
      courseType: this.courseType,
      date: this.date
      }
      localStorage.setItem("intro",JSON.stringify(intordutcion))
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped>
.avatar-uploader,
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 118px;
  height: 118px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
  margin: 0 auto;
}
.avatar-uploader-icon {
  margin: 0 auto;
  font-size: 28px;
  color: #8c939d;
  width: 118px;
  height: 118px;

  line-height: 118px;
  text-align: center;
}
.avatar {
  margin-left: 300px;
  width: 118px;
  height: 118px;
  display: block;
  margin: 0 auto;
}
.body {
  padding-top: 12px;

  border-radius: 4px;
  background: white;
  text-align: center;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
