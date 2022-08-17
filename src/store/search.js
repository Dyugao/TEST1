import { reqgetSearchList } from "@/api"

const state={
    searchList:{}
}
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
const actions={
    //通过API里面的数据接口调用，向服务器发送请求，获得服务器的数据
    async searchList({commit},params={}){
        //当前这个reqGetSearchList这个函数在调用时，至少传递一个参数（空对象）
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result=await reqgetSearchList(params)
        console.log(result);
        if(result.code==200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
//计算属性
//项目当中getters的作用是：简化仓库中的数据
//可以把将来在组件要用的数据简化一些
const getters={
    //当前形参state，是当前仓库中的state，并非大仓库中的那个state
    goodsList(state){
        //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
        //假如网络不给力或没有网，返回的是undefined
        //所以计算新的属性应该返回一个空数组，要不然出问题
        return state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}