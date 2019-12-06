declare global {
  interface Window { btnList: any }
}

interface IdefaultTableBtn {
  [key: string]: {
    name: string
    disabled: boolean
    show: boolean
    code?: string
    clickFn?: string
  }
}

interface IdefaultDialogBtn {
  [key: string]: {
    name:string
    type: string
    disabled: boolean
    show: boolean
    code?: string
    color?: string
    clickFn?: string
  }
}

interface Ioptions {
  modules: string | string[]
  btnConfig: {
    tableBtn?: (string | { [key: number]: object })[]
    dialogBtn?: (string | { [key: number]: object })[]
  }
  items: {
    search?: { [key: string]: string | object }
    table?:  { [key: string]: string | object }
    dialog?:  { [key: string]: string | object }
  }
  rules?:  { [key: string]: object }
}
const handleBasicObj = function ({ defaultTableBtn, defaultDialogBtn }: { defaultTableBtn: IdefaultTableBtn, defaultDialogBtn: IdefaultDialogBtn }): Function {
  class InitObj {
    modules: string | string[]
    
    searched: boolean
    showAll: boolean
    searchItem: []
    searchValues: object
    
    allData: []
    tableData: []
    tableItem: []
    tableLoading: boolean
    isEdit: number
    tableBtn: []
    tablePages: { total: number, current: number, pageSize: number }
    chooseDataArr: []
    
    editData: object
    dialogTitle: string
    dialogItem: []
    dialogBtn: []
    showDialogForm: boolean
    allRead: boolean
    rules: {}
    constructor (options: Ioptions) {
      if (options.modules === 'All') {
        this.modules = ['search', 'table', 'dialog']
      } else {
        this.modules = options.modules
      }
      (this.modules as string[]).forEach((module) => {
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

    initSearchObj () {
      this.searched = false
      this.showAll = false
      this.searchItem = []
      this.searchValues = {}
    }
    initTableObj (tableBtn: object = ['edit', 'delete']) {
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
    initDialogObj (dialogBtn: object = ['cancel', 'confirm']) {
      this.editData = {}
      this.dialogTitle = ''
      this.dialogItem = []
      this.dialogBtn = []
      this.showDialogForm = false
      this.allRead = false
      this.rules = {}
      this.setBtn(dialogBtn, 'dialogBtn')
    }

    setBtn (config, type) {
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
            if ((arr[1] as { show?: boolean, [key: string]: any }).show === undefined) {
              config.show = (this.authBtn(config.code, 'show') as boolean)
            }
            config.name = (this.authBtn(config.code) as string)
          }
          this[type].push(config)
        } else {
          console.error('数组里的数据必须是字符串或对象')
        }
      })
    }

    initItem (items) {
      let basicConfig = {
        search: { label: '', key: '', type: 'input', placeholder: '', show: true },
        table: { label: '', prop: '', type: 'cell', width: 80, displayStatus: 0 },
        dialog: { label: '', key: '', type: 'input', show: true, setStatus: 1 }
      }
      let placeholderObj = { input: '请输入', number: '请输入', password: '请输入', textarea: '请输入', select: '请选择', selectMore: '请选择', selectTree: '请选择' };
      (this.modules as string[]).forEach(module => {
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
            obj.key = key
            obj.placeholder = `${placeholderObj[obj.type]}${obj.label}`
          }
          result.push(obj)
        })
        this[`${module}Item`] = result
      })
    }

     // 表格数据转换
    formmater (config) {
      return function (val) {
        if (config.constructor === Array && !Number(val)) {
          throw new Error('当config为Array时，val必须为Number')
        }
        return config[val]
      }
    }

    // 根据btnCode获取按钮权限和名字
    authBtn (btnCode, type?: string) {
      let userBtnList: { btnCode: string, btnName: string }[] = []
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
  }
  return InitObj
}

export default handleBasicObj
