import Vue from 'vue'
import Router from 'vue-router'
import System from '@/components/System'

import Login from '@/components/public/Login'
import Homebody from '@/components/video_system/Homebody'
import ManageStudent from '@/components/manage/ManageStudent'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
          path:'managestudent',
          name:"ManageStudent",
          components:{ManageStudent} 
        }
      ]
    }

  ]
})
