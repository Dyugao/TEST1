import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)


const router=new VueRouter({
    routes,
    scrollBehavior(to,from,savedPosition){
        return {y:0}
    }
})

//全局路由前置守卫
router.beforeEach(async (to,from,next)=>{
    //获取token（token是证明用户是否已经登录的关键数据）
    let token=store.state.user.token
    //获取name（证明页面是否已经渲染了用户数据）
    let name=store.state.user.userInfo.name

    //用户已经登陆了
    if(token) {
        //用户登录之后到了主页面，如果再跳转到登录页面，则返回主页面
        if(to.path==='/Login' || to.path==='/Register'){
            next('/Home')
            console.log(111);
        }else{
            //如果是跳转其他页面，则要判断
            //如果其他页面有用户数据则放行
            if(name){
                next()
                console.log(222);
            }else{
                try {
                //如果其他页面没有用户数据，则要派发action获取用户数据 
                await store.dispatch('getUserInfo')
                //获取到用户数据之后则放行
                next()
                console.log(333);
                } catch (error) {
                //时间长了token会过期，需要重新登录
                //要先清除token数据
                await store.dispatch('getLogOut')
                next('/Login')
                }
                
            }
        }
    } else {
        //用户未登录，不限制
       let toPath=to.path
       
        if(toPath.indexOf('/Trade')!=-1 || toPath.indexOf('/Pay')!=-1 || toPath.indexOf('/Center')!=-1){
            //把未登录的时候想去而没有去成的信息，存储于地址栏中的路由
            next('/Login?redirect='+toPath)
            
        }else{
            next()
        }
        
        
    }
})


export default router