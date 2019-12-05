const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  externals: ["lodash"], // 将库里的第三方依赖包不进行打包，不然使用的时候可能用了相同的依赖包，这样就有重复代码了
  resolve: {
    extensions: ['.ts', '.js']
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
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    libraryTarget: 'umd' // umd: 通用的引入：import引入，commonJs引入，AMD引入
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}