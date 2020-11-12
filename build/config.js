const node = require('rollup-plugin-node-resolve') // 支持第三方包
const cjs = require('rollup-plugin-commonjs') // 转commonjs to es
const babel = require('rollup-plugin-babel') // babel
const { terser } = require('rollup-plugin-terser') // 代码压缩
const typescript = require('rollup-plugin-typescript2') // typescript有问题，所以用2
const { name, version } = require('../package.json')
const path = require('path')

const resolve = p => {
    return path.resolve(__dirname,'../',p)
}

// 打包后的文件里的注释
const banner =  
'/*!\n' +
` * ${name} v${version}\n` +
` * author Ethan\n` +
' * javascript utils\n' +
' */'

// 默认config
const defaultConfig = {
  input: resolve('src/index.ts'),
  external: ['mobile-detect'],
  plugins: [],
  output: {
    file: '',
    format: '',
    banner, // 打包后默认的文档注释
    name: name.split('-').slice(1).join('_'),
    globals: {'mobile-detect': 'MobileDetect'},
    exports: 'default', /** Disable warning for default imports */
  },
  onwarn: (msg, warn) => {
      warn(msg)
  }
}

// 默认plugins
const defaultPlugins = [
  node(),
  cjs(),
  typescript({ useTsconfigDeclarationDir: true }), // 使用 tsconfig.json 文件中定义的 declarationDir
  babel({ exclude: 'node_modules/**', runtimeHelpers: true })
]

// 配置项
const config = {
  'dev': {
    output: {
      file: resolve('dist/bundle.dev.js'),
      format: 'umd'
    },
    plugins: defaultPlugins
  },
  'dev-min': {
    output: {
      file: resolve('dist/bundle.min.js'),
      format: 'umd'
    },
    plugins: [...defaultPlugins, terser()]
  },
  'dev-cjs': {
    output: {
      file: resolve('dist/bundle.cjs.js'),
      format: 'cjs'
    },
    plugins: defaultPlugins
  },
  'dev-esm': {
    output: {
      file: resolve('dist/bundle.esm.js'),
      format: 'es'
    },
    plugins: defaultPlugins
  }
}

// 根据name获取响应的打包配置
function getConfig(name) {
  const opts = config[name]
  const newConfig = (function mergeData (def, newObj) {
    let result = {}
    Object.keys(def).forEach(key => {
      if (def[key].constructor === Object && newObj[key] && newObj[key].constructor === Object) {
        result[key] = mergeData(def[key], newObj[key])
      } else {
        result[key] = newObj[key] || def[key]
      }
    })
    return result
  })(defaultConfig, opts)

  Object.defineProperty(newConfig, '_name', {
    enumerable: false,
    value: name
  })
  return newConfig
}

// 单文件打包配置
const whiteList = /(index.ts)|(types)$/ // 白名单
const outputPath = resolve('dist') // 单文件打包的路径

exports.defaultPlugins = defaultPlugins
exports.config = config
exports.getConfig = getConfig
exports.whiteList = whiteList
exports.outputPath = outputPath