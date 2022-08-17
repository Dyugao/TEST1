import { reqgetCategoryList,reqgetBannerList,reqgetFloorList } from "@/api"

const state={
    //home仓库在存储三级菜单的数据
    categoryList:[],
    //轮播图在仓库的数据
    bannerList:[],
    floorList:[]
}
//mutations是唯一修改state的地方
const mutations={
    GETCATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    }
}
const actions={
    //通过API里面的接口函数调用,向服务器发请求,获取服务器的数据
   async categoryList({commit}){
        console.log('修改信息');
        let result=await reqgetCategoryList()
        if(result.code==200){
           commit('GETCATEGORYLIST',result.data)
        }
    },
    async bannerList({commit}){
        console.log('服务器请求信息');
        let result=await reqgetBannerList()
        if(result.code==200){
            commit('GETBANNERLIST',result.data)
        }
    },
    async floorList({commit}){
        let result=await reqgetFloorList()
        if(result.code==200){
            commit('GETFLOORLIST',result.data)
        }
    }
}
const getters={}

export default {
    state,
    mutations,
    actions,
    getters
}