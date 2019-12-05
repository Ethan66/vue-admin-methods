// 展示、获取按钮
let btnList = JSON.parse(sessionStorage.getItem('btnList'))

export const authBtn = (btnCode, type) => {
  !btnList && (btnList = JSON.parse(sessionStorage.getItem('btnList')))
  if (window.btnList) { // 刷新页面的window.btnList保存的是最新的按钮权限
    btnList = window.btnList
    window.btnList = undefined
  }
  let obj = btnList.find(item => item.btnCode === btnCode)
  if (type) {
    if (obj) {
      return true
    } else {
      return false
    }
  }
  if (obj) {
    return obj.btnName
  } else {
    return false
  }
}