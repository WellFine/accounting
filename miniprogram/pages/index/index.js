import { request } from '../../utils/request'
import { getTimestamp } from '../../utils/date'
import { padMoney } from '../../utils/money'
import { subtraction, toast } from '../../utils/util'
import { getAccountBalance, getMonthCanUseMoney } from '../../utils/storage'

Page({
  data: {
    totalMoney: '',
    monthCanUseMoney: '',
    monthLeftoverMoney: '',
    expend: '',
    income: '',

    isNetworkError: false,
    isReloading: false
  },

  onLoad () {
    // 从缓存中取出账户余额以及每月可支配金额
    this.setData({
      totalMoney: padMoney(getAccountBalance() / 100),
      monthCanUseMoney: padMoney(getMonthCanUseMoney() / 100)
    })

    // 加载每月总收入与总支出以及月剩余可支配金额
    this._load()
  },

  // 重新加载数据
  reload () {
    this.setData({
      isReloading: true
    })

    this._load()
  },

  /**
   * 用于加载每月总收入与总支出以及月剩余可支配金额
   */
  _load () {
    const { beginTime, endTime } = getTimestamp()

    // 获取每月总收入与总支出
    request('getDetailsByTypeGroup', {
      beginTime,
      endTime
    }).then(res => {
      const { list } = res.result
      let expend = list[0] ? padMoney(list[0].money / 100) : '0.00',
          income = list[1] ? padMoney(list[1].money / 100) : '0.00'

      // 加载月剩余可支配金额
      this._loadMonthLeftoverMoney(expend)
            
      this.setData({
        expend,
        income,
        isNetworkError: false
      })
    }).catch(() => {
      toast('收入与支出加载失败')
      this.setData({
        isNetworkError: true
      })
    }).finally(() => {
      this.setData({
        isReloading: false
      })
    })
  },

  _loadMonthLeftoverMoney (expend) {
    const { monthCanUseMoney } = this.data
    let monthLeftoverMoney = subtraction(monthCanUseMoney, expend)

    this.setData({
      monthLeftoverMoney: padMoney(monthLeftoverMoney)
    })
  }
})