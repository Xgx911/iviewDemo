

  const path = require('path')
  const resolve = dir => path.join(__dirname, dir)

  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  const CompressionPlugin = require('compression-webpack-plugin')
  module.exports = {
    transpileDependencies: ['webpack-dev-server/client'],
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

    outputDir: 'dist',
    assetsDir: 'assets',
    indexPath: 'index.html',
    filenameHashing: false,
    lintOnSave: false,
    // lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    //   lintOnSave: true,
    // 如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置
    // lintOnSave: process.env.NODE_ENV !== 'production',

    // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。(默认false)
    runtimeCompiler: false,
    chainWebpack: config => {
      // 配置cdn引入
      // config.plugin('html').tap(args => {
      //   args[0].cdn = cdn
      //   return args
      // })
      config.plugins.delete('prefetch')
      config.resolve.alias
        .set('@/', resolve('src'))
        .set('@/assets', resolve('src/assets'))
        .set('@/view', resolve('src/view'))

        // .set('@/servers', resolve('src/servers'))
        .set('@/components', resolve('src/components'))
        .set('@/libs', resolve('src/libs'))
        config.entry.app = ['@babel/polyfill', './src/main.js'];
    },
    configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
        config.plugins.push(
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        )
        config.plugins.push(new BundleAnalyzerPlugin())
      };
      // config.externals = cdn.externals
    },
    //   /**
    //   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    //   * 打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
    //   * map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
    //   * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
    //   * */
    //   productionSourceMap: false,

    devServer: {
      port: 8080, // 端口号
      https: false,
      open: true // 配置自动启动浏览器
      // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理

      // 配置多个代理
      // proxy: {
      // }
    }
  }
