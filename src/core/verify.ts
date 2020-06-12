/**
 *
 * @ignore
 * @return {boolean} 验证合法手机号
 *
 */
export function isMobile (mobile: string | number): boolean {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(String(mobile).trim())
}

/**
 *
 * @ignore
 * @return {boolean} 验证是否是合法邮箱格式
 *
 */
export function isEmail (email: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.trim())
}
