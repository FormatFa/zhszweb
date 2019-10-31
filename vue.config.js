module.exports = {
    transpileDependencies: [
      'vue-echarts',
      'resize-detector'
    ]
      ,
    devServer: {
      open: true,
      host: 'localhost',
      port: '8080',
      proxy: {
        '/api': {
          target: 'http://192.168.56.101:5000', // 要请求的地址
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }