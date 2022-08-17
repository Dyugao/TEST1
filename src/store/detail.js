import { reqgetGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
//封装游客身份uuid--生产一个随机字符串（生产之后不能改变）
import {getUUID} from '@/utils/uuid_token'

const state={
    goodInfo:{},
    uuid_token:getUUID()
}

const mutations={
    GETGOODLIST(state,goodInfo){
        state.goodInfo=goodInfo
    }
}

const actions={
    //获取物品详情信息
  async getGoodInfo({commit},skuid){
    let result=await reqgetGoodsInfo(skuid)
   
    if(result.code==200){
        commit('GETGOODLIST',result.data)
    }
  },
  //加入购物车
  async getAddOrUpdateShopCart({commit},{skuId,skuNum}){
    //发请求：前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
    //不需要三连环（不需要仓库存储数据了
    //注意：async函数执行返回的结果一定是个promsie
    let result=await reqAddOrUpdateShopCart(skuId,skuNum)
    if(result.code==200){
        return 'ok'
    }else{
        return Promise.reject(new Error('failed'))
    }
      
  }
}

const getters={
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}