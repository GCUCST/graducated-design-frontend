import Vue from 'vue'
import Router from 'vue-router'


//系统公共部分
// import System from '@/components/System'
// import Login from '@/components/public/Login'
// import AdminLogin from '@/components/public/AdminLogin'
// import PersonalCenter from '@/components/public/PersonalCenter'
// import HelpFreeback from '@/components/public/HelpFreeback'
// import Message from '@/components/public/Message'

const System = () => import('@/components/System') //懒加载
const Login = () => import('@/components/public/Login') //懒加载
const AdminLogin = () => import('@/components/public/AdminLogin') //懒加载
const PersonalCenter = () => import('@/components/public/PersonalCenter') //懒加载
const HelpFreeback = () => import('@/components/public/HelpFreeback') //懒加载
const Message = () => import('@/components/public/Message') //懒加载


//视频系统
// import Homebody from '@/components/video_system/Homebody'
// import MyCourse from '@/components/video_system/MyCourse'
// import MyTeach from '@/components/video_system/MyTeach'
// import VideoLibrary from '@/components/video_system/VideoLibrary'
// import VideoCourse from '@/components/video_system/VideoCourse'

const Homebody = () => import('@/components/video_system/Homebody') //懒加载
const MyCourse = () => import('@/components/video_system/MyCourse') //懒加载
const MyTeach = () => import('@/components/video_system/MyTeach') //懒加载
const VideoLibrary = () => import('@/components/video_system/VideoLibrary') //懒加载
const VideoCourse = () => import('@/components/video_system/VideoCourse') //懒加载





// 教务员
// import ManageStudent from '@/components/manage/ManageStudent'
// import ManageDean from '@/components/manage/ManageDean'

const ManageStudent = () => import('@/components/manage/ManageStudent') //懒加载
const ManageDean = () => import('@/components/manage/ManageDean') //懒加载
const ManageGrade = () => import('@/components/manage/ManageGrade') //懒加载
const ManageMajor = () => import('@/components/manage/ManageMajor') //懒加载
const ManageAdminClass = () => import('@/components/manage/ManageAdminClass') //懒加载







//考试系统
// import Courses from '@/components/exam_system/Courses'
// import QuestionBank from '@/components/exam_system/QuestionBank'
// import LearnProgress from '@/components/exam_system/LearnProgress'
// import TestSetting from '@/components/exam_system/TestSetting'
// import Marking from '@/components/exam_system/Marking'
// import ExportPaper from '@/components/exam_system/ExportPaper'

// import ChapterPractice from '@/components/exam_system/stu/ChapterPractice'
// import ChapterTest from '@/components/exam_system/stu/ChapterTest'
// import Exam from '@/components/exam_system/stu/Exam'
// import ErrorSet from '@/components/exam_system/stu/ErrorSet'

const Courses = () => import('@/components/exam_system/Courses') //懒加载
const QuestionBank = () => import('@/components/exam_system/QuestionBank') //懒加载
const LearnProgress = () => import('@/components/exam_system/LearnProgress') //懒加载
const TestSetting = () => import('@/components/exam_system/TestSetting') //懒加载
const Marking = () => import( '@/components/exam_system/Marking') //懒加载
const ExportPaper = () => import('@/components/exam_system/ExportPaper') //懒加载

const ChapterPractice = () => import('@/components/exam_system/stu/ChapterPractice') //懒加载
const ChapterTest = () => import('@/components/exam_system/stu/ChapterTest') //懒加载
const Exam = () => import('@/components/exam_system/stu/Exam') //懒加载
const ErrorSet = () => import('@/components/exam_system/stu/ErrorSet') //懒加载









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
          path:'managemajor',
          name:"ManageMajor",
          components:{ManageMajor} 
        }
        ,
        {
          meta:{
            requiresAuth:true, //本页面需要登录权限，还需进一步判断是教务员
          },
          path:'manageadminclass',
          name:"ManageAdminClass",
          components:{ManageAdminClass} 
        }
        ,
        {
          meta:{
            requiresAuth:true, //本页面需要登录权限，还需进一步判断是教务员
          },
          path:'managegrade',
          name:"ManageGrade",
          components:{ManageGrade} 
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
