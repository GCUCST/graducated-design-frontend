import Vue from 'vue'
import Router from 'vue-router'


//系统公共部分
import System from '@/components/System'
import Login from '@/components/public/Login'
import AdminLogin from '@/components/public/AdminLogin'
import PersonalCenter from '@/components/public/PersonalCenter'
import HelpFreeback from '@/components/public/HelpFreeback'
import Message from '@/components/public/Message'


//视频系统
import Homebody from '@/components/video_system/Homebody'
import MyCourse from '@/components/video_system/MyCourse'
import MyTeach from '@/components/video_system/MyTeach'
import VideoLibrary from '@/components/video_system/VideoLibrary'
import VideoCourse from '@/components/video_system/VideoCourse'


// 教务员
import ManageStudent from '@/components/manage/ManageStudent'
import ManageDean from '@/components/manage/ManageDean'

//考试系统
import Courses from '@/components/exam_system/Courses'
import QuestionBank from '@/components/exam_system/QuestionBank'
import LearnProgress from '@/components/exam_system/LearnProgress'
import TestSetting from '@/components/exam_system/TestSetting'
import Marking from '@/components/exam_system/Marking'
import ExportPaper from '@/components/exam_system/ExportPaper'

import ChapterPractice from '@/components/exam_system/stu/ChapterPractice'
import ChapterTest from '@/components/exam_system/stu/ChapterTest'
import Exam from '@/components/exam_system/stu/Exam'
import ErrorSet from '@/components/exam_system/stu/ErrorSet'


Vue.use(Router)


// 提示：
//  meta:{
//   requiresAuth:true, //添加该属性，表明该页面需要登录，详情看main.js
// },


//解决相同路由跳转报错问题
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({

    //该方法用于切换路有时候，滚动条太长，页面再置顶
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },

  routes: [
    {
      path: '/index',
      name: 'System',
      component: System,
      children:[
        {
          path:'homebody',
          name:"Homebody",
          components:{Homebody} 
        },
        {
          path:'videolibrary',
          name:"VideoLibrary",
          components:{VideoLibrary} 
        },
        {
          path:'myteach',
          name:"MyTeach",
          components:{MyTeach} 
        },
        {
          meta:{
            requiresAuth:true, //本页面需要登录权限，还需进一步判断是教务员
          },
          path:'videocourse',
          name:"VideoCourse",
          components:{VideoCourse} 
        },
        {
          path:'mycourse',
          name:"MyCourse",
          components:{MyCourse} 
        },
        {
          path:'login',
          name:"Login",
          components:{Login} 
        }
        ,
        {
          path:'adminlogin',
          name:"AdminLogin",
          components:{AdminLogin} 
        }
        ,
        {
          meta:{
            requiresAuth:true, //本页面需要登录权限，还需进一步判断是教务员
          },
          path:'managesdean',
          name:"ManageDean",
          components:{ManageDean} 
        }
        ,
        {
          meta:{
            requiresAuth:true, //本页面需要登录权限，还需进一步判断是教务员
          },
          path:'managestudent',
          name:"ManageStudent",
          components:{ManageStudent} 
        }
        ,
        {
          meta:{
            requiresAuth:true, //本页面需要登录权限，还需进一步判断是教务员
          },
          path:'personalcenter',
          name:"PersonalCenter",
          components:{PersonalCenter} 
        }
        ,
        {
          meta:{
            requiresAuth:true, //本页面需要登录权限，还需进一步判断是教务员
          },
          path:'message',
          name:"Message",
          components:{Message} 
        }
        ,
        {
          path:'helpfreeback',
          name:"HelpFreeback",
          components:{HelpFreeback} 
        },
        {
          path:'courses',  //考试系统的课程
          name:"Courses",
          components:{Courses}
        },
        {
          path:'questionbank',  //考试系统的试题库
          name:"QuestionBank",
          components:{QuestionBank}
        },
        {
          path:'learnprogress',  //考试系统的学生测试进度
          name:"LearnProgress",
          components:{LearnProgress}
        },
        {
          path:'testsetting',  //考试系统的试卷设置
          name:"TestSetting",
          components:{TestSetting}
        },
        {
          path:'marking',  //考试系统的阅卷
          name:"Marking",
          components:{Marking}
        },
        {
          path:'exportpaper',  //考试系统的导出试卷
          name:"ExportPaper",
          components:{ExportPaper}
        },
        {
          path:'chapterpractice',  //考试系统学生的章节练习
          name:"ChapterPractice",
          components:{ChapterPractice}
        },
        {
          path:'chaptertest',  //考试系统学生的章节测试
          name:"ChapterTest",
          components:{ChapterTest}
        },
        {
          path:'exam',    //考试系统学生的考试
          name:"Exam",
          components:{Exam}
        },
        {
          path:'errorset',    //考试系统学生的错题集
          name:"ErrorSet",
          components:{ErrorSet}
        }
      ]
    },
    {
      path: '/', redirect: '/index/homebody'
    }

  ]
})
