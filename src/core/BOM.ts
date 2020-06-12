/**
 *
 * @ignore
 *
 */
export const getUrlParams = (name: string): string => {
  const reg = new RegExp(`(^|&)(${name})=([^&*])`, 'i')
  const result = location.search.substring(1).match(reg)
  return result ? result[2] : ''
}

/**
 * @ignore
 *
 */
