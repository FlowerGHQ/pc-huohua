const path = require("path")

// 依赖分析插件
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

function resolve(dir) {
  return path.join(__dirname, "./", dir)
}

const publicPath = process.env.NODE_ENV === "production" ? "/huohua/" : "/"

module.exports = {
  // 部署时的基本URL
  publicPath,
  outputDir: "dist",
  // 打包时去除source map
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    amd: {
      toUrlUndefined: true,
    },
    plugins: [
      // webpack打包依赖分析
      // , new BundleAnalyzerPlugin()
    ],
  },
  css: {
    // loaderOptions: {
    //   stylus: {
    //     import: [
    //       path.join(__dirname, './packages/pkg_base/assets/css/_theme.styl'),
    //       path.join(__dirname, './packages/pkg_base/assets/css/_mixin.styl')
    //     ]
    //   }
    // }
  },
  chainWebpack: config => {
    // 配置：https://github.com/neutrinojs/webpack-chain
    // 配置svg图标的加载器
    // config.module
    //   .rule('svg')
    //   .exclude.add(resolve('packages/pkg_base/assets/icons'))
    //   .end()
    // // svg文件import
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    // svgRule.use('raw-loader').loader('raw-loader')
    // config.module
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(resolve('packages/pkg_base/assets/icons'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    // // 特殊后缀名的文件loader
    // config.module
    //   .rule('optherFile')
    //   .test(/\.(xls|xlsx|swf)$/)
    //   .use('file-loader')
    //   .loader('file-loader')
    //   .end()
  },
  // // 接口反向代理
  // devServer: {
  //   // 设置代理
  //   historyApiFallback: true,
  //   proxy: require('./vue.proxy.config')
  // }
}
