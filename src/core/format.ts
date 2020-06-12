 /**
  *
  * @ignore
  * @return {string} 转换时间戳
  *
  */
export const formatDate = (now: string | number, fmt: string = 'yyyy-MM-dd'): string => {
  if (typeof now === 'string') {
    now = now.replace(/-/g, '/')
  }
  const date = new Date(now)
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, String(o[k]).padStart(RegExp.$1.length, '0'))
    }
  }
  return fmt
}
