import * as is from './core/is'
import { Types } from './types'

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
