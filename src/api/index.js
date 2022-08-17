import requests from "./ajax";
import mockRequests from './mockAjax'

//获取三级分类列表信息
export const reqgetCategoryList = () => {
   return requests({ url: 'product/getBaseCategoryList', method: 'get' })
}

//获取轮播图信息
export const reqgetBannerList = () => {
   return mockRequests({ url: '/banner', method: 'get' })
}

export const reqgetFloorList = () => {
   return mockRequests({ url: '/floor', method: 'get' })
}

// 获取搜索信息，接口地址为：/api/list，方法为POST,要带参数
// 例子
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }
export const reqgetSearchList = (params) => {
   return requests({ url: '/list', method: 'post', data: params })
}

//获取详情信息
export const reqgetGoodsInfo = (skuId) => {
   return requests({
      url: `/item/${skuId}`, method: 'get'
   })
}

//加入购物车信息
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
   return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}

//获取购物车详情信息
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车信息
export const reqDeleteCartById = (skuId) => requests({
   url: `/cart/deleteCart/${skuId}`, method: 'delete'
})

//7.切换商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
   url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET'
})

//获取验证码
export const reqPhoneCode = (phone) => requests({
   url: `/user/passport/sendCode/${phone}`, method: 'get'
})

//注册
export const reqUserRegister = (data) => requests({
   url: '/user/passport/register', method: 'post', data
})

//登录
export const reqUserLogin = (data) => requests({
   url: '/user/passport/login', data, method: 'post'
})

//获取用户信息
export const reqUserInfo = () => requests({
   url: '/user/passport/auth/getUserInfo', method: 'get'
})

//退出登录
export const reqLogOut = () => requests({
   url: '/user/passport/logout', method: 'get'
})


// 获取订单交易页信息
export const reqTradeInfo = () => requests({
   url: '/order/auth/trade', method: 'get'
})



//提交订单
export const reqSubmitTrade = (tradeNo,data) => requests({
   url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post',data
})

//获取订单支付信息
export const reqPayInfo=(orderId)=>requests({
   url:`/payment/weixin/createNative/${orderId}`
})

//查询支付订单状态
export const reqPayStatus=(orderId)=>requests({
   url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'
})

//获取我的订单列表
export const reqOrderList=(page,limit)=>requests({
   url:`/order/auth/${page}/${limit}`,method:'get'
})