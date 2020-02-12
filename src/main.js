// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css'; 
Vue.use(ElementUI);

//引入一个全局的样式文件   by cst
import "@/assets/css/global.css"   


//用于判断用户是否登录的路由拦截,在index.js配置meta
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { // 判断该路由是否需要登录权限
    if (localStorage.getItem("userInfo") != null) { // 判断当前的token是否存在
      next();
    } else {
      alert("该页面需要登录")
      next({
        path: "/index/login",
      })
    }
  } else {
    next();
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
