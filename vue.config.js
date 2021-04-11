module.exports = {
    publicPath: "/admin-vue/",
    // 关闭线上源码
    productionSourceMap: false,
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');
     
        svgRule.uses.clear();
     
        svgRule
          .use('babel-loader')
          .loader('babel-loader')
          .end()
          .use('vue-svg-loader')
          .loader('vue-svg-loader');
      },
      devServer: {
        // proxy all requests starting with /api to jsonplaceholder
        proxy:{
            '/api': {
                target: 'http://www.qyap.tech:5000',
                // target: 'https://test.360ljk.com',
                // target: 'http://192.168.10.197:8093',
                changeOrigin: true,
                pathRewrite: {
                  '^/api':"",
                }
              },
        }
      },
}