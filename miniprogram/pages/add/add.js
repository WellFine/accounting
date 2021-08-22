import { getYMDTime } from '../../utils/date'
import { makeMoneyTrue } from '../../utils/money'
import { expendType, incomeType, otherType } from '../../config/type'

Page({
  data: {
    type: 0,  // 0 支出，1 收入，2 不计入收支

    date: '',
    dateEnd: '',
    dateStr: '',

    money: '',
    // 收支记账的账户
    account: 'wechat',

    typeObj: expendType[0],
    expendType,
    incomeType,
    otherType,

    // 子类型名称
    subname: expendType[0].sub[0],
    subIndex: 0,
    // 餐饮食用方式
    howEat: '略',

    // 是否添加备注
    isAddRemark: false,
    remark: '',

    // 添加请求是否结束, 用于 button 按钮加载效果
    isAdd: false
  },

  onLoad () {
    this._initTime()
  },

  // 切换头部收支类型
  switchType (e) {
    const { type } = e.currentTarget.dataset
    const { expendType, incomeType, otherType } = this.data
    let obj = {}

    if (type === 0) obj = expendType[0]
    else if (type === 1) obj = incomeType[0]
    else if (type === 2) obj = otherType[0]

    this.setData({
      type,
      typeObj: obj,
      subname: obj.sub ? obj.sub[0] : '',
      subIndex: 0,
      howEat: obj.how ? obj.how[obj.how.length - 1] : ''
    })
  },
  
  // 改变时间
  changeTime (e) {
    const { value } = e.detail
    const [ year, month, day ] = value.split('-')
    let dateStr = `${month}月${day}日`
    
    if (year < getYMDTime().year) {
      dateStr = `${year}年${dateStr}`
    }

    this.setData({
      date: `${year}-${month}-${day}`,
      dateStr
    })
  },

  // 输入金额
  inputMoney (e) {
    this.setData({
      money: makeMoneyTrue(e.detail.value)
    })
  },

  // 选择收支具体类型
  switchTypeName (e) {
    const typeObj = e.detail
    this.setData({
      typeObj,
      subname: typeObj.sub ? typeObj.sub[0] : '',
      subIndex: 0,
      howEat: typeObj.how ? typeObj.how[typeObj.how.length - 1] : ''
    })
  },

  // 如果该收支类型有子类型，选择子类型
  chooseSubName (e) {
    const { index, name } = e.currentTarget.dataset
    this.setData({
      subname: name,
      subIndex: index
    })
  },

  // 餐饮类型选择食用方式 
  chooseHowEat (e) {
    this.setData({
      howEat: e.currentTarget.dataset.how 
    })
  },

  // 选择入账账户
  chooseAccount (e) {
    this.setData({
      account: e.currentTarget.dataset.account
    })
  },

  // 点击添加备注按钮
  readyAddRemark () {
    this.setData({
      isAddRemark: true
    })
  },

  // 输入备注
  inputRemark (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  // 点击入账按钮
  add () {
    const { money } = this.data

    if (money < 0.01) {
      wx.showToast({
        title: '金额不得小于 0.01',
        icon: 'none'
      })
      return
    }
    
    const { type, date, typeObj, subname, howEat, account, remark } = this.data
    
    this.setData({
      isAdd: true
    })
    
    wx.cloud.callFunction({
      name: 'add',
      data: {
        type,
        name: typeObj.type,
        py: typeObj.py,
        time: Date.parse(date),
        money,
        account,
        remark: remark ? remark : undefined,
        sub: subname ? subname : undefined,
        how: howEat ? howEat : undefined
      }
    }).then(() => {
      this.setData({
        isAdd: false
      })

      wx.reLaunch({
        url: '/pages/index/index',
      })
    }).catch(() => {
      wx.showToast({
        title: '网络可能出错啦',
        icon: 'none'
      })
    })
  },

  _initTime () {
    const { year, monthStr, dayStr } = getYMDTime()

    this.setData({
      date: `${year}-${monthStr}-${dayStr}`,
      dateEnd: `${year}-${monthStr}-${dayStr}`,
      dateStr: `${monthStr}月${dayStr}日`
    })
  }
})