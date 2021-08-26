import { request } from '../../utils/request'
import { getEndTime } from '../../utils/date'
import { padMoney } from '../../utils/money'

Page({
  data: {
    date: '',

    expend: '',
    income: '',

    type: 0
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

  changeType (e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
  },

  _loadExpendIncome () {
    const { date } = this.data
    request('getDetailsByTypeGroup', {
      beginTime: Date.parse(date),
      endTime: getEndTime(date)
    }).then(res => {
      const { list } = res.result
      
      this.setData({
        expend: padMoney(list[0] ? list[0].money / 100 : 0),
        income: padMoney(list[1] ? list[1].money / 100 : 0)
      })
    })
  }
})