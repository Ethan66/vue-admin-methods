const commonConfig = require('./webpack.common.js')
const merge = require('webpack-merge')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-eval-source-map'
}

module.exports = merge(commonConfig, prodConfig)