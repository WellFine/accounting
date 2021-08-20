const { getYMDTime } = require("../../../../utils/date")
const { padMoney } = require("../../../../utils/money")

Component({
  properties: {
    data: Object,
    time: Number
  },

  data: {
    timeStr: '',
    expend: 0,
    income: 0,
    list: []
  },

  observers: {
    'data': function (data) {
      this._initData(data)
    }
  },

  lifetimes: {
    attached () {
      const { data, time } = this.properties
      const { monthStr, dayStr } = getYMDTime(new Date(time))
      
      this._initData(data)
      
      this.setData({
        timeStr: `${monthStr}月${dayStr}日`
      })
    }
  },

  methods: {
    _initData (data) {
      let expend = 0, income = 0

      for (const item of data) {
        if (item.type === 0) expend += item.money * 100
        if (item.type === 1) income += item.money * 100
        item.money = padMoney(item.money)
      }

      this.setData({
        expend: padMoney(expend / 100),
        income: padMoney(income / 100),
        list: data
      })
    }
  }
})