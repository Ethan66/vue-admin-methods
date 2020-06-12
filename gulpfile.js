const gulp = require('gulp')
const del = require('del') // 删除文件夹
const rollup = require('rollup')
const json = require('rollup-plugin-json') // 识别json文件
const commonjs = require('rollup-plugin-commonjs') // 将cjs转为esm
const resolve = require('rollup-plugin-node-resolve') // 解析node_module
const sourceMaps = require('rollup-plugin-sourcemaps')
const typescript = require('rollup-plugin-typescript2') // typescript有问题，所以用2
const uglify = require('rollup-plugin-uglify').uglify // 压缩js
const pkg = require('./package.json')

function task_clean (done) {
  del.sync('dist')
  del.sync('docs')
  done()
}

async function task_ts () {
  const bundle = await rollup.rollup({
    input: 'src/index.ts',
    plugins: [
      json(),
      typescript({ useTsconfigDeclarationDir: true }), // 使用 tsconfig.json 文件中定义的 declarationDir
      commonjs(),
      resolve(),
  
      sourceMaps(),
      uglify(),
    ],
    external: [
      'mobile-detect'
    ]
  });

  await bundle.write({ // 输出
    file: pkg.main,
    format: 'umd',
    name: pkg.name.split('-').slice(1).join('_'),
    sourcemap: false
  })
}

gulp.task('default',
  gulp.parallel(
    task_clean,
    task_ts
  )
)

