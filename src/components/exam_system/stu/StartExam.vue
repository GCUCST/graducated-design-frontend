<template>
    <div class="startExam">
      开始考试
      <el-divider></el-divider>
      
      <div class="con">
        <div class="leftt">
          <div class="leftt_div"></div>
        </div>
        <div class="leftb">
          <div class="leftb_div"></div>
        </div>
        <div class="rig">
          <div class="rigdiv"></div>
        </div>
      </div>
     
  
    </div>
  </template>
  
  
  <script>
    export default {
      name: "startExam",
      data() {
        return {
          
        };
      },
      methods: {
        
      }
    };
  </script>
  
  <style scoped>
    .startExam {
      margin: 20px auto;
      padding: 30px;
      background: white;
      width: 95%;
      /* height: 600px; */
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }
    .con{
    position: absolute;
    z-index: 0;
    }

    .con .leftt{
      border-width: 0px;
    position: absolute;
    left: 0px;
    top: -14px;
    width: 792px;
    height: 90px;
    }
    .con .leftt .leftt_div{
      border-width: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 792px;
    height: 90px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(228, 228, 228, 1);
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    }

    .con .leftb{
      border-width: 0px;
    position: absolute;
    left: 0px;
    top: 86px;
    width: 792px;
    height: 736px;
    }
    .con .leftb .leftb_div{
      border-width: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 792px;
    height: 736px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(228, 228, 228, 1);
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    }

    .con .rig{
    border-width: 0px;
    position: absolute;
    left: 810px;
    top: 0px;
    width: 290px;
    height: 507px;
    }
    .con .rigdiv{
    border-width: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 290px;
    height: 507px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(228, 228, 228, 1);
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    }
  </style>