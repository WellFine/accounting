import { getEndTime } from '../../../utils/date'
import { request } from '../../../utils/request'
import { toast } from '../../../utils/util'

Component({
  data: {
    list: [],
    isLoading: true,
    type: -1,   // -1 表示全部类型，0 表示支出，1 表示收入，2 表示不计入收支
    name: '',
    beginTime: '',
    endTime: '',
    isNetworkError: false
  },
  methods: {
    details (e) {
      const { type, name, date } = e.detail
      
      // 获取本月时间戳
      const beginTime = Date.parse(date)
      const endTime = getEndTime(date)
      
      this.setData({
        type,
        name,
        beginTime,
        endTime
      })

      this._load()
    },

    reload () {
      this._load()
    },

    _load () {
      this.setData({
        isLoading: true
      })
      
      const { type, name, beginTime, endTime } = this.data

      request('getDetailsByTimeGroup', {
        type,
        name,
        beginTime,
        endTime,
        isNeedDetails: true
      }).then(res => {
        const { list } = res.result
        this.setData({
          list,
          isNetworkError: false
        })
      }).catch(() => {
        toast('网络去出差啦，稍后再试吧')
        this.setData({
          isNetworkError: true
        })
      }).finally(() => {
        this.setData({
          isLoading: false
        })
      })
    }
  }
})