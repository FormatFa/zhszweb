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
          target: 'http://127.0.0.1:5000', // 要请求的地址
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }