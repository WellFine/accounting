import { getYMDTime } from '../../../utils/date'

Component({
  properties: {
    fields: {
      type: String,
      value: 'month'
    }
  },

  data: {
    date: '',
    dateEnd: '',
    dateStr: ''
  },

  lifetimes: {
    attached () {
      const { year, monthStr, dayStr } = getYMDTime()
      const { fields } = this.properties
      let date = '', dateStr = ''

      if (fields === 'year') {
        date = `${year}`
        dateStr = `${year}年`
      }
      else if (fields === 'month') {
        date = `${year}-${monthStr}`
        dateStr = `${year}年${monthStr}月`
      }
      else if (fields === 'day') {
        date = `${year}-${monthStr}-${dayStr}`
        dateStr = `${monthStr}月${dayStr}日`
      }

      this.setData({
        date,
        dateEnd: date,
        dateStr
      })

      this.triggerEvent('time', this.data.date)
    }
  },

  methods: {
    // 改变时间
    changeTime (e) {
      const [ year, month, day ] = e.detail.value.split('-')
      const { fields } = this.properties
      let date = '', dateStr = ''

      if (fields === 'year') {
        date = `${year}`        
        dateStr = `${year}年`
      }
      else if (fields === 'month') {
        date = `${year}-${month}`
        dateStr = `${year}年${month}月`
      }
      else if (fields === 'day') {
        date = `${year}-${month}-${day}`
        dateStr = `${month}月${day}日`
      
        if (year < getYMDTime().year) {
          dateStr = `${year}年${dateStr}`
        }
      }

      this.setData({
        date,
        dateStr
      })
      
      this.triggerEvent('time', this.data.date)
    }
  }
})