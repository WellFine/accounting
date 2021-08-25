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
      wechat: wechat * 100,
      alipay: alipay * 100,
      bank: bank * 100,
      cash: cash * 100
    })

    setMonthCanUseMoney(monthMoney * 100)

    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  _initAccount () {
    const { wechat, alipay, bank, cash } = getAccount()

    this.setData({
      wechat: padMoney(wechat / 100),
      alipay: padMoney(alipay / 100),
      bank: padMoney(bank / 100),
      cash: padMoney(cash / 100)
    })
  },

  _initMonthMoney () {
    this.setData({
      monthMoney: padMoney(getMonthCanUseMoney() / 100)
    })
  }
})