const fs = require('fs-extra')
const path = require('path')
const { rollup } = require('rollup')
const { getConfig, defaultPlugins, config, outputPath, whiteList } = require('./config')

const resolve = p => {
  return path.resolve(__dirname,'../',p)
}

let builds = Object.keys(config).map(getConfig)

// 配置的全量包
function buildConfig(builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).then(() => {
    }).catch(logError)
  }
  next()
}

// 用rollup构建生成code
function buildEntry(config, single) {
  const output = config.output
  const { file } = output
  // 可以用这个，但是没有提示打包后文件信息
  // return rollup(config).then(bundle => bundle.write(output))
  return rollup(config).then(bundle => bundle.generate(output)).then(({ output: [{ code }] }) => {
    // 单文件打包删除ts文件
    if (single) {
      fs.remove(path.relative(process.cwd(), config.input))
    }
    // 传入code和output的file路径生成打包文件
    return write(file, code)
  })
}

// 创建打包文件和打印日志
function write(dest, code) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      console.log(`${blue(path.relative(process.cwd(), dest))}  ${getSize(code)}${''}`)
      resolve()
    })
  })
}

// 导出单个函数
function buildSingleFn(dir) {
  const files = fs.readdirSync(resolve(dir))
  files.forEach(file => {
    // 过滤不必要的文件、文件夹
    if (whiteList.test(file)) return
    const absolutePath = resolve(`${dir}/${file}`)
    if (fs.lstatSync(absolutePath).isDirectory()) {
      buildSingleFn(`${dir}/${file}`)
      return
    }
    let code = fs.readFileSync(absolutePath)
    code = code.toString().replace(/("|')\.{1,2}\/[\w\/\.]+("|')/g, match => {
      // "../collection/each" => "./each"
      const tmp = match.split('/')
      const lastStr = tmp[tmp.length - 1].slice(0, -1)
      return `'./${lastStr}'`
    })
    fs.writeFileSync(`${outputPath}/${file}`, code)
    const moduleName = file.replace(/^\w+.js/g, match => {
      return match[0].toUpperCase() + match.slice(1, -3)
    })
    let config = {
      input: resolve(`${outputPath}/${file}`),
      plugins: defaultPlugins,
      external: ['mobile-detect'],
      output: {
        file: resolve(`${outputPath}/${file.replace('.ts', '.js')}`),
        format: 'umd',
        name: `${moduleName}`,
        globals: { 'mobile-detect': 'MobileDetect' },
        banner: '/*!\n' +
        ` * @author mzn\n` +
        ` * @desc ${moduleName}\n` +
        ' */',
      }
    }
    buildEntry(config, true)
  })
}

// 构建打包（全量和单个）
async function build() {
  fs.emptyDirSync(resolve('dist'))
  Promise.all([
    await buildConfig(builds), // 打包全量包
    await buildSingleFn('src'), // 打包单个文件
  ]).then(([result1, result2]) => {
  }).catch(logError)
}

build()

// 辅助工具：日志获取文件大小
function getSize(code) {
  return `${(code.length / 1024).toFixed(2)}kb`
}

// 辅助工具：输出错误日志
function logError(e) {
  console.log(e)
}

// 辅助工具：日志设置颜色
function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
