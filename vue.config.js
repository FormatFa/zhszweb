module.exports = {
    publicPath:"./",
    transpileDependencies: [
      'vue-echarts',
      'resize-detector'
    ]
    // https://cli.vuejs.org/zh/config/#devserver-proxy
    // 测试时前端应用和后端不在同一个服务器上，需要将请求代理到api服务器上
      ,
    devServer: {
      open: true,
      host: 'localhost',
      port: '8080',
      //将api下的请求代理到localhost:500下
      proxy: {
        '/api': {
          target: 'http://localhost:5000', // 要请求的地址
          ws: true,

          changeOrigin: true
          // pathRewrite: {
          //   '^/api': ''
          // }
        }
      }
    }
  }