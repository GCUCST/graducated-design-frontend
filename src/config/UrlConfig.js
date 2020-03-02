import Vue from 'vue'
const QiniuyunUrl = "http://cdn.chenshaotong.cn/"   //七牛云的地址
const WebServerUrl = "http://cst.natapp1.cc"   //web服务器地址
const baseUrl = "/api"               //url前缀，供代理使用

//一整串的url
const url = {
    callbackUrl: WebServerUrl + "/comm/callback",  //七牛云上传完成回调的地址
    getDefaultAvatarUrl:QiniuyunUrl+"/default/avatar/user"  //七牛云默认的头像
}

//仅仅只有api
const api = {
     getQiniuyunUrl:'/comm/url',      //从后台获取七牛云地址
     getUserInfo:'/comm/getuserInfo' ,  //获取用户信息
     checkToken:'/oauth/check_token',   //校验token地址
     getToken: "/oauth/token",  //获取token的地址
     reflashToken: "/oauth/token", //刷新token的地址
     getQiniuyunUploadToken:'/comm/getUploadToken',  //获取七牛云上传令牌
     getKey:"/comm/getKey",          //获取后端回来用于上传的文件名
     getLibraryJson:"/comm/getLibrary" ,    //教师端获取  视频库内容
     updateLibrary:"/comm/updateLibrary",   //更新视频库 
     delKey:"/comm/delKey"                //删除文件夹  

}

var UrlConfig = {
    getUrl() {
        return url
    },
    getApi() {
        return api
    },
    getBaseUrl(){
        return baseUrl
    },
    getQiniuyunUrl(){
        return QiniuyunUrl
    }
}

export default UrlConfig;