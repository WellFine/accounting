import { getYMDTime } from '../../../../utils/date'
import { incomeType, expendType, otherType } from '../../../../config/type'

Component({
  properties: {
    isLoading: Boolean
  },
  data: {
    date: '',
    dateEnd: '',  // 控制能选择月份的范围为从前到现在
    dateStr: '',
    type: -1,   // -1 表示全部类型，0 表示支出，1 表示收入，2 表示不计入收支
    typeName: '全部类型',
    isSelectType: false,
    income: incomeType,
    expend: expendType,
    other: otherType,
  },
  lifetimes: {
    attached () {
      const { year, monthStr } = getYMDTime()

      this.setData({
        date: `${year}-${monthStr}`,
        dateEnd: `${year}-${monthStr}`,
        dateStr: `${year} 年 ${monthStr} 月`
      })
      
      const { type, typeName, date } = this.data
      this.triggerEvent('details', {
        type,
        name: typeName,
        date
      })
    }
  },
  methods: {
    changeTime (e) {
      const { value } = e.detail
      const [ year, month ] = value.split('-')

      this.setData({
        date: value,
        dateStr: `${year} 年 ${month} 月`
      })

      const { type, typeName } = this.data
      this.triggerEvent('details', {
        type,
        name: typeName,
        date: value
      })
    },

    changeType (e) {
      // type 代表类型，0 支出，1 收入，2 不计入收支
      const { type, typename } = e.currentTarget.dataset
      
      this.setData({
        type,
        typeName: typename,
        isSelectType: false
      })

      this.triggerEvent('details', {
        type,
        name: typename,
        date: this.data.date
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
    }
  }
})