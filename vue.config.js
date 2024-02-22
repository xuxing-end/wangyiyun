// http://localhost:5051

module.exports = {
    // ... 其他配置
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:5051', // 目标接口地址
          changeOrigin: true, // 是否改变源
          pathRewrite: {
            '^/api': '' // 重写路径：去掉路径中的/api
          }
        }
      }
    }
   }