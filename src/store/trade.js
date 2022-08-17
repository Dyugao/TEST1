import { reqTradeInfo } from "@/api";

const state={
  tradeInfo:[]
}

const mutations={
    TRADEINFO(state,tradeInfo){
        state.tradeInfo=tradeInfo
    }
}

const actions={
  async getTradeInfo({commit}){
     let result=await reqTradeInfo()
     if(result.code==200){
        commit('TRADEINFO',result.data)
     }
  }
}

const getters={
  //地址信息
  userAddressList(state){
    return state.tradeInfo.userAddressList || []
  },
  //物品信息
  detailArrayList(state){
    return state.tradeInfo.detailArrayList || []
  },
  //收货人信息
  orderDetailVoList(state){
    return state.tradeInfo.orderDetailVoList
  }
  
}

export default{
    state,
    mutations,
    actions,
    getters
}