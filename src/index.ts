import * as is from './core/is'
import { Types } from './types'

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

const _utils = initUtils()

export default _utils
