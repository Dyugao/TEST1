import { reqPhoneCode,reqUserRegister ,reqUserLogin,reqUserInfo,reqLogOut} from "@/api";
import {setToken,removeToken} from '@/utils/token'

const state={
       code:'',
       //只是getItem的话，网页一刷新token就会没有
       token:localStorage.getItem('TOKEN'),
       userInfo:{}

}

const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    USERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEAR(state){
        state.token='',
        state.userInfo={},
        removeToken()
    }
}

const actions={
    //获取验证码
    async getCode({commit},phone){
        let result=await reqPhoneCode(phone)
        
        if(result.code==200){

            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //注册
    async getUserRegister({commit},user){
        let result=await reqUserRegister(user)
        
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //登录
    async getUserLogin({commit},data){
        let result=await reqUserLogin(data)
        console.log(data);
        //服务器下发token，用户唯一标识符
        //将来经常通过带token找服务器要用户信息进行展示
        if(result.code==200){
            //用户已经登录成功且获取到token
            commit('USERLOGIN',result.data.token)
            setToken(result.data.token)
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result=await reqUserInfo()
        
        if(result.code=200){
            commit('USERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //退出登录
    async getLogOut({commit}){
        //告知服务器清除token
      let result=await reqLogOut()
      
      if(result.code==200){
        commit('CLEAR')
        return 'ok'
      }else{
        return Promise.reject(new Error('failed'))
      }
    }
}

const getters={
         
}

export default{
    state,
    mutations,
    actions,
    getters
}