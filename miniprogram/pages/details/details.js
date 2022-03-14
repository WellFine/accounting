import { request } from '../../utils/request'
import { getTimestamp } from '../../utils/date'
import { padMoney } from '../../utils/money'

Page({
  data: {
    date: '',

    expend: '',
    income: '',

    // 分类构成类型
    classifyType: 0,
    // 每日对比类型
    dailyComparisonType: 0
  },

  /**
   * changeTime 在 time-picker 第一次加载和改变时间都会触发
   * 所以直接在这个方法中加载数据即可，不需要在 onLoad 生命周期中加载
   */
  changeTime (e) {
    this.setData({
      date: e.detail,
      expend: '',   // 这里设置 expend 和 income 为空用于显示加载动画
      income: ''
    })
    this._loadExpendIncome()
  },

  changeClassifyType (e) {
    this.setData({
      classifyType: e.detail
    })
  },

  changeDailyComparisonType (e) {
    this.setData({
      dailyComparisonType: e.detail
    })
  },

  _loadExpendIncome () {
    const { beginTime, endTime } = getTimestamp(new Date(this.data.date))
    request('getDetailsByTypeGroup', {
      beginTime,
      endTime
    }).then(res => {
      const { list } = res.result
      
      this.setData({
        expend: padMoney(list[0] ? list[0].money / 100 : 0),
        income: padMoney(list[1] ? list[1].money / 100 : 0)
      })
    })
  }
})