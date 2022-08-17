import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from  '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

//路由懒加载
//当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由
//对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
// const foo=()=>{
//     import('@/pages/Home')
// }

export default [
        {
            path:'*',
            redirect:'/Home'//重定向
        },
        {
            path:'/Center',
            name:'center',
            component:()=>import('@/pages/Center/myOrder'),
            meta:{show:true},
            children:[
                {
                  path:'myorder',
                  component:()=>import('@/pages/Center/myOrder')
                },
                {
                    path:'grouporder',
                    component:()=>import('@/pages/Center/groupOrder')
                },
                {
                    path:'/Center',
                    redirect:'/Center/myorder'
                }
            ]
        },
        {
            path:'/Paysuccess',
            name:'paysuccess',
            component:()=>import('@/pages/PaySuccess'),
            meta:{show:true},
            beforeEnter: (to, from, next) => {
                if(from.path=='/Pay'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path:'/Pay',
            name:'pay',
            component:()=>import('@/pages/Pay'),
            meta:{show:true},
            // 路由独享守卫
            beforeEnter: (to, from, next) => {
                if(from.path=='/Shopcart'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path:'/Trade',
            name:'trade',
            component:()=>import('@/pages/Trade'),
            meta:{show:true}
        },
        {
            path:'/Shopcart',
            name:'shopcart',
            component:()=>import('@/pages/ShopCart'),
            meta:{show:true}
        },
        {
            path:'/Addcartsuccess',
            name:'addcartsuccess',
            component:()=>import('@/pages/AddCartSuccess'),
            meta:{show:true}
        },
        {
            path:'/Detail/:skuid',
            name:'detail',
            component:()=>import('@/pages/Detail'),
            meta:{show:true}
        },
        {
            path:'/Home',
            name:'home',
            component:()=>import('@/pages/Home'),//路由懒加载，可以优化性能，等点击到相应的页面再加载
            meta:{show:true}
        },
        {
            path:'/Login',
            name:'login',
            component:()=>import('@/pages/Login')
        },
        {
            path:'/Register',
            name:'register',
            component:()=>import('@/pages/Register')
        },
        {
            path:'/Search/:keyword?',//加个问好parmas参数可传可不传
            name:'search',
            component:()=>import('@/pages/Search'),
            meta:{show:true}
        }
    ]
