import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"

const state={
    cartList:[]
}

const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}

const actions={
    async getCartList({commit}){
        let result=await reqCartList()
        if(result.code==200){
            commit('GETCARTLIST',result.data)
        }
    },
    //删除某一个产品
    async getDeleteCartListBySkuId({commit},skuId){
        let result=await reqDeleteCartById(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //修改某一产品的选中状态
    async getUpdateCheckedById({commit},{skuId,isChecked}){
        let result=await reqUpdateCheckedById(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //删除全部勾选的产品
    getDeleteAllCheckCart({dispatch,getters}){
        //context：小仓库，cimmit getters dispatch satate
        //获取购物车中全部的产品（是一个数组）
        let promiseAll=[]
        
        getters.cartList.cartInfoList.forEach(item=> {
           let promise=item.isChecked==1?dispatch('getDeleteCartListBySkuId',item.skuId):'';
           //将每一次返回的Promise添加到数组当中
           promiseAll.push(promise)
        });
        //只要全部的p1|p2...都成功，返回结果即为成功
        //如果有一个失败，返回结果即为失败
        return Promise.all(promiseAll)
    },
    updateAllIsChecked({dispatch,state},isChecked){
        //当全选的checked的值为0时，点击全选框，通过派发给getUpdateCheckedById，便可修改ischecked的值为1
        let prommiseAll=[]
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise=dispatch('getUpdateCheckedById',{
                skuId:item.skuId,
                isChecked//这个isChecked的值是input框里的checked的值
            })
            prommiseAll.push(promise)
        })
        //判断所有派发的值是否全部为真
        return Promise.all(prommiseAll)
    }
}

const getters={
    cartList(state){
        return state.cartList[0] || {}
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}