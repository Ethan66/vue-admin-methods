const commonConfig = require('./webpack.common.js')
const merge = require('webpack-merge')
const path = require('path')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-eval-source-map'
}

module.exports = merge(commonConfig, prodConfig)