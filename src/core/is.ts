/**
 *
 * @ignore
 *
 */
export function isArray (value: any): value is Array<any> {
  return typeof value !== 'undefined' && value instanceof Array
}
