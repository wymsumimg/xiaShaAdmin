

module.exports = {
  lintOnSave: false, //禁用eslint
  publicPath:process.env.NODE_ENV === "production"?'./':'/',
  outputDir:'dist',
  css: {
    loaderOptions: {
      // modules: true,
      // 给 sass-loader 传递选项
      sass: {
          data: `@import "@/common/style/variables.scss";`
      }
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    // host: '0.0.0.0',
    port: 1024,
    hotOnly: false,
    proxy: {
      '/weiGuan': {
        target: 'https://test.i31.com/weiGuan', // sdPro
        secure: false,  // 默认true情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器
        // changeOrigin 的意思就是把 http 请求中的 Origin 字段进行变换，在浏览器接收到后端回复的时候，浏览器会以为这是本地请求，而在后端那边会以为是在站内的调用。
        changeOrigin: true, // 默认false，是否需要改变原始主机头为目标URL
        pathRewrite: {
          '^/weiGuan': '',
        },
      },
      '/ali': {
        target: 'http://demo-vod.cn-shanghai.aliyuncs.com/', // sdPro
        secure: false,  // 默认true情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器
        // changeOrigin 的意思就是把 http 请求中的 Origin 字段进行变换，在浏览器接收到后端回复的时候，浏览器会以为这是本地请求，而在后端那边会以为是在站内的调用。
        changeOrigin: true, // 默认false，是否需要改变原始主机头为目标URL
        pathRewrite: {
          '^/ali': '',
        },
      },
      '/sdImg': {
        target: 'https://image.sudian178.com/sd/json/theme/',
        secure: false,  // 默认true情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器
        // changeOrigin 的意思就是把 http 请求中的 Origin 字段进行变换，在浏览器接收到后端回复的时候，浏览器会以为这是本地请求，而在后端那边会以为是在站内的调用。
        changeOrigin: true, // 默认false，是否需要改变原始主机头为目标URL
        pathRewrite: {
          '^/sdImg': '',
        },
      },
    }, // 代理
    before: app => {
      // `app` 是一个 express 实例
    }
  },

  productionSourceMap: false,
}
