const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave:false,//关闭校验功能
  devServer:{
    proxy:{
      'api':{
        target:'http://gmall-h5-api.atguigu.cn',//服务器跨域
        pathrewrite:{}
      }
    }
  }
})
