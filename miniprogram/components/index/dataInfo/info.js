import { getEndTime } from '../../../utils/date'
import { request } from '../../../utils/request'

Component({
  data: {
    list: [],
    isLoading: true
  },
  methods: {
    details (e) {
      this.setData({
        isLoading: true
      })
      
      const { type, name, date } = e.detail

      // 获取本月时间戳
      const beginTime = Date.parse(date)
      const endTime = getEndTime(date)
      
      request('getDetailsByTimeGroup', {
        type,
        name,
        beginTime,
        endTime
      }).then(res => {
        const { list } = res.result
        this.setData({
          list,
          isLoading: false
        })
      })
    }
  }
})