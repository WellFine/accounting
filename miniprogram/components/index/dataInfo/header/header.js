import { getYMDTime } from '../../../../utils/date'
import { incomeType, expendType, otherType } from '../../../../config/type'

Component({
  data: {
    date: '',
    dateStr: '',
    type: '全部类型',
    isSelectType: false,
    income: incomeType,
    expend: expendType,
    other: otherType
  },
  lifetimes: {
    attached () {
      const { year, monthStr } = getYMDTime()

      this.setData({
        date: `${year}-${monthStr}`,
        dateStr: `${year} 年 ${monthStr} 月`
      })
    }
  },
  methods: {
    changeTime (e) {
      const { value } = e.detail
      const date = value.split('-')
      this.setData({
        date: `${date[0]}-${date[1]}`,
        dateStr: `${date[0]} 年 ${date[1]} 月`
      })
    },

    openSelectType () {
      this.setData({
        isSelectType: true
      })
    },

    closeSelectType () {
      this.setData({
        isSelectType: false
      })
    },

    clickoverlay () {
      this.closeSelectType()
    },

    changeType (e) {
      // title 代表类型，0 支出，1 收入，2 不计入收支
      const { title, type } = e.currentTarget.dataset
      this.setData({
        type,
        isSelectType: false
      })
    }
  }
})