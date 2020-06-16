interface BOM {
  /**
   *
   * 获取url上search的value
   * @param name 传入url里需要获取value的key
   * @return {string}
   * ``` typescript
   * utils.getUrlParam('username')    // true
   * ```
   *
   */
  getUrlParam (name: string): string

}

interface ENV {
  /**
   *
   * 获取设备系统
   * @return {string} Android | IOS | winPhone | unknown
   * ``` typescript
   * utils.getClient()    // Android
   * ```
   */
  getClient (): string

  /**
   *
   * 判断当前浏览器是移动端还是pc端
   * @return {boolean} pc: true; mobile: false
   * ``` typescript
   * const env = utils.isPc()
   * ```
   */
  isPc (): boolean

  /**
   *
   * 获取手机具体型号
   * @return {string} huawei
   * ``` typescript
   * const ipone = utils.getPhoneType()
   * ```
   */
  getPhoneType (): string

  /**
   *
   * 返回当前浏览器类型和操作系统版本
   * @return {string} { brower: 'Chrome', system: 'Windows 10.0' }
   * ``` typescript
   * const system = utils.getSystemVersion()
   * ```
   */
  getSystemVersion (): { browser: string, system: string }

  /**
   *
   * 判断IE版本
   * @return {number | string} -1: 非IE; 6 - 11: IE6-IE11版本; edge: Edge浏览器;
   * ``` typescript
   * const ieVersion = utils.getIEVersion()
   * ```
   */
  getIEVersion (): string | number
}

interface FORMAT {
  /**
   *
   * 时间戳转化
   * @return {string}
   * ``` typescript
   * const date = utils.formatDate(123323423423)
   * ```
   */
  formatDate (now: number | string, fmt?: string): string
}

interface METHODS {
  /**
   *
   * 节流函数
   * @return {Function}
   * ``` typescript
   * utils.throttle(function () {console.log(1)})
   * ```
   */
  throttle (fn: Function, delay?: number): Function

  /**
   *
   * 防抖函数
   * @return {Function}
   * ``` typescript
   * utils.debounce(function () {console.log(1)})
   * ```
   */
  debounce (fn: Function, delay?: number): Function
}

interface VERIFY {
  /**
   *
   * 验证合法手机号
   * @return {boolean}
   * ``` typescript
   * const isMobile = utils.isMobile('132sdfsdf') // false
   * ```
   */
  isMobile (mobile: string | number): boolean

  /**
   *
   * 验证是否是合法邮箱格式
   * @return {boolean}
   * ``` typescript
   * const isEmail = utils.idEmail('132sdfsdf') // false
   * ```
   */
  isEmail (email: string): boolean
}

/**
 *
 * @ignore
 *
 */
export interface Types extends BOM, ENV, FORMAT, METHODS, VERIFY {}
