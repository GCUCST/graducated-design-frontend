// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//设置token默认请求头
import axios from "axios"
import UrlConfig from "./config/UrlConfig.js"
//axios.defaults.headers.common['Authorization'] =  "Bearer " + localStorage.getItem("access_token")

axios.defaults.retry = 3;  //重新尝试
axios.defaults.retryDelay = 2000;  //间隔时间
// 添加请求拦截器
axios.interceptors.request.use(function (config) {

  // config.headers.common['Accept'] = "application/json"
  // config.headers.common['Content-Type'] = "application/json"

  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  //网址前缀
  config.baseURL = UrlConfig.getBaseUrl()

  if (config.url == UrlConfig.getApi().getToken) {
    console.log("这是要去申请令牌,不拦截")
    return config;
  }
  //存在token 就带上
  if (localStorage.getItem("access_token")) {
    config.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access_token")
  }
  //不存在就去登录
  else {
    //做一个提示登录
    router.push({ name: "Login" });
  }
  return config;
}, function (error) {
  return Promise.reject(error)
}
)

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 返回正确响应的数据
  return response
}, function (error) {
  // 失败的响应
  if (error.response) {
    //失败可能：通行令牌失效，刷新令牌失效，没有权限
    //token过期 ，refresh_token未过期
    if (error.response.status == 401 && error.response.data.errorauth == 401) {
      //刷新令牌
      console.log("刷新令牌")
      var params = new URLSearchParams();
      params.append("client_id", "c1");
      params.append("client_secret", "secret");
      params.append("grant_type", "refresh_token");
      params.append("refresh_token", localStorage.getItem("refresh_token"));
      //向后端请求刷新token
      axios
        .post(UrlConfig.getApi().reflashToken, params)
        .then(function (response) {
          if (response.data.access_token) {
            //保存令牌和刷新令牌
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            console.log("刷新令牌成功。")
            alert("请求失败，请重新尝试。");
            // location.reload();
          } else {
            console.log("刷新失败" + response.data.errors[1]);
          }

        })
        .catch(function (error) {
          console.log(error);
        });


    }
    //没有权限
    if (error.response.status == 401 && error.response.data.code == 400) {
      console.log("刷新令牌已经过期！需要重新登陆");
      //做一个页面提示
      router.push({ name: "Login" });
    }
    if (error.response.status == 403) {
      console.log("权限不允许访问")
    }
    console.log(error.response)
    //  console.log("错误响应码："+error.response.status)
    return "请求异常";
  }
})




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
