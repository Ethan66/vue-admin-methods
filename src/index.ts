import * as is from './core/is'
import { Types } from './types'

export * from './types/index' // 目的：打包后的type输出文件会引入./types/index文件

/**
 * @ignore
 * // 添加ignore文档就不会出现这个方法
 */

function initUtils (): Types {
  const instance = Object.create(null)
  const arr = [is]

  arr.forEach(obj => {
    Object.getOwnPropertyNames(obj).forEach(key => {
      instance[key] = obj[key]
    })
  })

  return instance as Types
}

/**
 * @ignore
 */
const _utils = initUtils()

export default _utils
