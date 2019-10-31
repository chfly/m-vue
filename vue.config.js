
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
console.log(process.env.NODE_ENV)
module.exports = {
  publicPath: '',
  // productionSourceMap: process.env.NODE_ENV === 'development',
  devServer: {
    open: true,
    host: 'localhost',
    proxy: {
      '/cn': {
        target: 'http://xxxx'
      }
    }
  },
  pluginOptions: {
    dll: {
      entry: ['vue', 'vue-router', 'vuex', 'vue-i18n', 'axios', 'vuedraggable'],
      output: path.join(__dirname, './public/dll'),
      open: true,
      cacheFilePath: path.resolve(__dirname, './public/dll'),
      inject: true
    },
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [path.resolve(__dirname, 'src/stylus/index.styl')]
    }
  },
  configureWebpack (config) {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, './public/dll/*.js'),
        // dll 引用路径
        publicPath: './js',
        // dll最终输出的目录
        outputPath: './js'
      }))

      config.plugins.push(new FileManagerPlugin({
        onEnd: {
          delete: ['./zip'],
          mkdir: ['./zip'],
          archive: [
            {
              source: './dist',
              destination: './zip/dist.zip'
            }
          ]
        }
      }))
    }
  }
}
