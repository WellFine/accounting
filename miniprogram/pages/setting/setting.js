import { makeMoneyTrue, padMoney } from "../../utils/money"
import { getAccount, getMonthCanUseMoney, setAccount, setMonthCanUseMoney } from "../../utils/storage"

Page({
  data: {
    wechat: '',
    alipay: '',
    bank: '',
    cash: '',
    monthMoney: ''
  },

  onLoad () {
    this._initAccount()
    this._initMonthMoney()
  },

  onInput (e) {
    const money = e.detail.value
    const { type } = e.currentTarget.dataset

    this.setData({
      [`${type}`]: makeMoneyTrue(money)
    })
  },

  clickBtn () {
    const { wechat, alipay, bank, cash, monthMoney } = this.data
    
    setAccount({
      wechat: Number(wechat),
      alipay: Number(alipay),
      bank: Number(bank),
      cash: Number(cash)
    })

    setMonthCanUseMoney(Number(monthMoney))

    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  _initAccount () {
    const { wechat, alipay, bank, cash } = getAccount()

    this.setData({
      wechat: padMoney(wechat),
      alipay: padMoney(alipay),
      bank: padMoney(bank),
      cash: padMoney(cash)
    })
  },

  _initMonthMoney () {
    this.setData({
      monthMoney: padMoney(getMonthCanUseMoney())
    })
  }
})