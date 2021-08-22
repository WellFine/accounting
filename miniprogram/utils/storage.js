const accountKey = 'account'
const monthCanUseMoneyKey = 'month-can-use-money'

function setAccount (data) {
  wx.setStorageSync(accountKey, data)
}

function getAccount () {
  return wx.getStorageSync(accountKey)
}

function getAccountBalance () {
  const { wechat, alipay, bank, cash } = getAccount()

  return wechat + alipay + bank + cash
}

function setMonthCanUseMoney (month) {
  wx.setStorageSync(monthCanUseMoneyKey, month)
}

function getMonthCanUseMoney () {
  return wx.getStorageSync(monthCanUseMoneyKey)
}

function initStorage () {
  if (!getAccount()) {
    console.log('set account')
    setAccount({
      wechat: 0,
      alipay: 0,
      bank: 0,
      cash: 0
    })
  }

  if (!getMonthCanUseMoney()) {
    setMonthCanUseMoney(0)
  }
}

export {
  setAccount,
  getAccount,
  getAccountBalance,
  setMonthCanUseMoney,
  getMonthCanUseMoney,
  initStorage
}
