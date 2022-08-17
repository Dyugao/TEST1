// axios的二次封装
import axios from 'axios'
//进度条:就是网页加载时的进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
import store from '@/store'
const requests=axios.create({
    baseURL:'/api',//基本路径
    timeout:5000
})
//qeruest就是axios,只不过稍微配置一下
// 请求拦截器
requests.interceptors.request.use(
    (config)=>{
        //config:配置对象,对象里面有一个属性很重要,headers请求头
        if(store.state.detail.uuid_token){
            //请求头添加一个字段（userTempId):和后台人员商量好了
            config.headers.userTempId=store.state.detail.uuid_token
        }
        //需要携带token带给服务器
        if(store.state.user.token){
            config.headers.token=store.state.user.token
        }
        //进度条开始动
        nprogress.start()
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
// 响应拦截器
requests.interceptors.response.use(
    (response)=>{
        //成功的回调函数:服务器相应数据回来以后,响应拦截器可以检测到,可以做一些事情
        //进度条结束
        nprogress.done()
        return response.data
        
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default requests