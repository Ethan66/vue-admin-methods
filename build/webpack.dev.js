const commonConfig = require('./webpack.common.js')
const merge = require('webpack-merge')
const webpack = require('webpack')
const IP = require('ip').address()

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: '../dist',
    open: false,
    port: 5000,
    host: IP,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  }
}

module.exports = merge(commonConfig, devConfig)