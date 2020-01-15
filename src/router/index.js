import Vue from 'vue'
import Router from 'vue-router'
import System from '@/components/System'

import Login from '@/components/public/Login'
import AdminLogin from '@/components/public/AdminLogin'

import PersonalCenter from '@/components/public/PersonalCenter'
import HelpFreeback from '@/components/public/HelpFreeback'
import Message from '@/components/public/Message'



import Homebody from '@/components/video_system/Homebody'
import MyCourse from '@/components/video_system/MyCourse'

import ManageStudent from '@/components/manage/ManageStudent'

import ManageDean from '@/components/manage/ManageDean'


Vue.use(Router)


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
        }
      ]
    },
    {
      path: '/', redirect: '/index/homebody'
    }

  ]
})
