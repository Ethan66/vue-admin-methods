const handleBasicObj = function ({ defaultTableBtn, defaultDialogBtn, userBtnList }) {
  const InitObj = function (options) {
    if (options.modules === 'All') {
      this.modules = ['search', 'table', 'dialog']
    } else if (typeof options.modules === 'string') {
      this.modules = [].concat(options.modules)
    } else {
      this.modules = options.modules
    }
    this.modules.forEach((module) => {
      switch (module) {
        case 'search':
          this.initSearchObj()
          break
        case 'table':
          this.initTableObj(options.btnConfig.tableBtn)
          break
        case 'dialog':
          this.initDialogObj(options.btnConfig.dialogBtn)
      }
    })
    this.initItem(options.items)
    options.rules && (this.rules = options.rules)
    return this
  }

  InitObj.prototype.initItem = function (items) {
    let basicConfig = {
      search: { label: '', key: '', type: 'input', placeholder: '', show: true },
      table: { label: '', prop: '', type: 'cell', width: 80, displayStatus: 0 },
      dialog: { label: '', key: '', type: 'input', show: true, setStatus: 1 }
    }
    let placeholderObj = { input: '请输入', number: '请输入', password: '请输入', textarea: '请输入', select: '请选择', selectMore: '请选择', selectTree: '请选择' }
    this.modules.forEach(module => {
      let configObj = items[module]
      let keys = Object.keys(configObj)
      let result = []
      keys.forEach(key => {
        let obj = configObj[key] = Object.assign({}, basicConfig[module], configObj[key])
        if (module === 'table') {
          if (key === 'btn') {
            obj.type = 'btn'
            !obj.label && (obj.label = '操作')
          } else if (key === 'selection') {
            obj.type = 'selection'
            obj.width = 50
          } else {
            obj.prop = key
          }
        } else {
          if (module === 'search' && configObj[key].key) {
            obj.key = configObj[key].key
          } else {
            obj.key = key
          }
          obj.placeholder = `${placeholderObj[obj.type]}${obj.label}`
        }
        result.push(obj)
      })
      this[`${module}Item`] = result
    })
  }

  InitObj.prototype.initTableItem = function (configTableObj) {
    let keys = Object.keys(configTableObj)
    keys.forEach(key => {
      let obj = configTableObj[key]
      obj.prop = key
    })
  }

  InitObj.prototype.initSearchObj = function () {
    this.searched = false
    this.showAll = false
    this.searchItem = []
    this.searchValues = {}
  }

  InitObj.prototype.initTableObj = function (tableBtn = ['edit', 'delete']) {
    this.allData = []
    this.tableData = []
    this.tableItem = []
    this.tableLoading = true
    this.isEdit = 0
    this.tableBtn = []
    this.tablePages = { total: 0, current: 1, pageSize: 20 }
    this.chooseDataArr = []
    this.setBtn(tableBtn, 'tableBtn')
  }

  InitObj.prototype.initDialogObj = function (dialogBtn = ['cancel', 'confirm']) {
    this.editData = {}
    this.dialogTitle = ''
    this.dialogItem = []
    this.dialogBtn = []
    this.showDialogForm = false
    this.allRead = false
    this.rules = {}
    this.setBtn(dialogBtn, 'dialogBtn')
  }

  InitObj.prototype.setBtn = function (config, type) {
    if (!Array.isArray(config)) {
      console.error('传参必须为数组')
      return false
    }
    let basicConfig = type === 'tableBtn' ? defaultTableBtn : defaultDialogBtn
    config.forEach(key => {
      if (typeof key === 'string') {
        if (!basicConfig[key]) {
          console.error(`请确认${type}是否配置了${key}属性`)
          return false
        }
        this[type].push(basicConfig[key])
      } else if (key.constructor === Object) {
        let arr = Object.entries(key)[0]
        if (arr[1].constructor !== Object) {
          console.error('数组里的对象的value值必须为对象')
          return false
        }
        let config = Object.assign({}, basicConfig[arr[0]], arr[1])
        if (config.code) {
          if (arr[1].show === undefined) {
            config.show = this.authBtn(config.code, 'show')
          }
          config.name = this.authBtn(config.code)
        }
        this[type].push(config)
      } else {
        console.error('数组里的数据必须是字符串或对象')
      }
    })
  }

  // 表格数据转换
  InitObj.prototype.formmater = function (config) {
    return function (val) {
      if (config.constructor === Array && !(Number(val) === 0 || Number(val))) {
        throw new Error('当config为Array时，val必须为Number')
      }
      return config[val]
    }
  }

  // 根据btnCode获取按钮权限和名字
  InitObj.prototype.authBtn = (btnCode, type) => {
    !userBtnList && (userBtnList = JSON.parse(sessionStorage.getItem('btnList')))
    if (window.btnList) { // 刷新页面的window.btnList保存的是最新的按钮权限
      userBtnList = window.btnList
      window.btnList = undefined
    }
    let obj = userBtnList.find(item => item.btnCode === btnCode)
    if (obj) {
      if (type) {
        return true
      } else {
        return obj.btnName
      }
    } else {
      return false
    }
  }
  return InitObj
}

export default handleBasicObj
