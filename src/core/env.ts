import MobileDetect from 'mobile-detect'

/**
 *
 * @ignore
 * @return {string} 返回当前浏览器所在系统
 * ios | android | winPhone | unknown
 *
 */
export function getClient (): string {
  const userAgent = navigator.userAgent
  if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1) {
    return 'Android'
  } else if (userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    return 'IOS'
  } else if (userAgent.indexOf('Windows Phone') > -1) {
    return 'winPhone'
  } else {
    return 'unknown'
  }
}

/**
 *
 * @ignore
 * @return {string} 获取手机具体型号
 */
export const getPhoneType = (): string => {
  try {
    let deviceType = navigator.userAgent // 获取userAgent信息
    let md = new MobileDetect(deviceType) // 初始化mobile-detect
    let os = md.os() // 获取系统
    let model = ''
    if (os === 'iOS') { // ios系统的处理
      os = md.os() + ' ' + md.version('iPhone')
      model = md.mobile()
    } else if (os === 'AndroidOS') { // Android系统的处理
      os = md.os().replace('OS', '') + ' ' + md.version('Android')
      let sss = deviceType.split(';')
      let i = sss.findIndex(val => val.includes('Build/'))
      if (i) {
        model = sss[i].substring(0, sss[i].indexOf('Build/')).trim()
      }
    }
    return os + ' ' + model
  } catch (e) {
    return '未知型号'
  }
}

/**
 *
 * @ignore
 * @return {boolean} 判断当前浏览器是移动端(false)还是pc端(true)
 *
 */
export function isPc (): boolean {
  const userAgent = navigator.userAgent
  const device: string[] = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag: boolean = true
  for (let i = 0; i < device.length; i++) {
    if (userAgent.indexOf(device[i]) !== -1) {
      flag = false
      break
    }
  }
  return flag
}

/**
 *
 * @ignore
 *
 */
interface Isystem {
  browser: string
  system: string
}

/**
 *
 * @ignore
 * @return 返回当前浏览器类型和操作系统版本
 * { brower: 'Chrome', system: 'Windows 10.0' }
 *
 */
export function getSystemVersion (): { browser: string, system: string } {
  const userAgent = navigator.userAgent
  let systemObj = {
    system: '',
    browser: 'IE'
  }
  systemObj.system = userAgent.replace(/.+(Windows ).+?([\d\.]+).+/g, '$1$2')
  if (!systemObj.system) { // mac版本
    systemObj.system = userAgent.replace(/.+(Mac.+?)\).+/g, RegExp.$1)
    if (navigator.vendor.includes('Google')) {
      systemObj.browser = 'Chrome'
      return systemObj
    }
  }
  if (systemObj.browser === 'IE') {
    systemObj.browser = ['Chrome', 'Firefox', 'Opera', 'Safari'].find(item => userAgent.includes(item)) || ''
  }
  return systemObj
}

/**
 *
 * @ignore
 * @return {number | string} 判断IE版本
 * -1: 非IE
 * 6 - 11: IE6-IE11版本
 * edge: Edge浏览器
 *
 */
export function getIEVersion (): number | string {
  const userAgent = navigator.userAgent
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1 // IE11
  if (isIE11) {
    return 11
  }
  if (isEdge) {
    return 'edge' // edge
  }
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) {
      return 7
    } else if (fIEVersion === 8) {
      return 8
    } else if (fIEVersion === 9) {
      return 9
    } else if (fIEVersion === 10) {
      return 10
    } else {
      return 6 // IE版本<=7
    }
  } else {
    return -1 // 不是ie浏览器
  }
}
