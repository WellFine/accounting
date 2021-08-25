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
    'data, time': function (data, time) {
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
        if (item.type === 0) expend += item.money
        if (item.type === 1) income += item.money
        item.money = padMoney(item.money / 100)
      }

      this.setData({
        expend: padMoney(expend / 100),
        income: padMoney(income / 100),
        list: data
      })
    }
  }
})