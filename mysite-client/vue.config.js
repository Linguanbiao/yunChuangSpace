// vue.cli 的配置文件
const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// 配置代理服务器
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001'
      },
      '/res': {
        target: 'http://127.0.0.1:7001'
      },
      '/static': {
        target: 'http://127.0.0.1:7001'
      }
    }
  }
}