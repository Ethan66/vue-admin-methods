const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 可以隐式的引用文件：import a form '../src/A'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.js?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/test.html',
      inject: 'head'
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'library.js',
    library: 'handleBasicObj',
    libraryTarget: 'umd' // umd: 通用的引入：import引入，commonJs引入，AMD引入
  },
}