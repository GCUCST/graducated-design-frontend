import Vue from 'vue'
import Router from 'vue-router'
import System from '@/components/System'

import Login from '@/components/public/Login'
import Homebody from '@/components/video_system/Homebody'
import ManageStudent from '@/components/manage/ManageStudent'

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
          path:'login',
          name:"Login",
          components:{Login} 
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
      ]
    },
    {
      path: '/', redirect: '/index/homebody'
    }

  ]
})
