interface Is {
  /**
   *
   * 判断是否是数组
   * @param value 传入需要判断的变量
   * @return {boolean} true | false
   * ``` typescript
   * utils.isArray([1, 2])    // true
   * ```
   *
   */
  isArray (value: any): boolean
}

/**
 *
 * @ignore
 *
 */
export interface Types extends Is {}
