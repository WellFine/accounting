import * as echarts from '../../ec-canvas/echarts'

import { request } from '../../../utils/request'
import { getEndTime, getTimestamp } from '../../../utils/date'
import { padMoney } from '../../../utils/money'

Component({
  properties: {
    date: String,
    type: Number
  },
  
  data: {
    ec: {
      lazyLoad: true
    },
    isLoading: true,
    data: [],

    ecSub: {
      lazyLoad: true
    },
    isLoadSub: false,     // 控制 sub 块的出现与否
    isLoadingSub: false,  // 控制 sub 块的加载动画
    subData: []
  },

  observers: {
    'date, type': function (date, type) {
      if (!date || type < 0 || type > 2) return

      this.setData({
        isLoading: true,    // 开启类型加载动画
        isLoadSub: false    // 关闭类型子项图表
      })

      request('getDetailsByNameGroup', {
        type,
        beginTime: Date.parse(date),
        endTime: getEndTime(date)
      }).then(res => {
        const { list } = res.result
        
        for (const item of list) item.money /= 100
        
        this.setData({
          isLoading: false,
          data: list
        })

        // 如果数据为空，则不加载图表，显示本月没有收支
        if (list.length === 0) return
        
        this.ecComponent = this.selectComponent('#pie')
        this._initChart()
      })
    }
  },

  methods: {
    _initChart () {
      this.ecComponent.init((canvas, width, height, dpr) => {
        // 初始化图表
        const chart = echarts.init(canvas, null, {
          width,
          height,
          devicePixelRatio: dpr
        })

        this._setOption(chart)
        
        // 返回 chart 实例，否则会影响事件处理等
        return chart
      })
    },

    _setOption (chart) {
      const { data } = this.data

      const total = data.reduce((prev, cur) => {
        return {
          money: prev.money + cur.money
        }
      })

      const option = {
        legend: {
          type: 'scroll'
        },
        tooltip: {
          show: true
        },
        series: [{
          type: 'pie',
          radius: ['25%', '70%'],
          center: ['50%', '55%'],
          itemStyle: {  // 设置扇形样式
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {      // 设置文字
            show: true,
            position: 'outer',
            alignTo: 'labelLine',   // 开启文字对齐
            bleedMargin: 0,
          },
          labelLine: {  // 设置指导线
            show: true,
            smooth: true, // 设置第一段指导线平滑过渡到第二段指导线
          },
          emphasis: {
            label: {
              show: true,
              fontWeight: 'bold'
            }
          },
          data: data.map(item => {
            const percent = ((item.money / total.money) * 100).toFixed(2)
            return {
              value: item.money,
              name: `${item._id} ${percent}%`
            }
          }),
        }]
      }

      chart.setOption(option)

      chart.on('click', this._loadSubChart.bind(this))
    },

    _loadSubChart (params) {
      const { name } = params
      const mainName = name.split(' ')[0]
      const { date, type } = this.properties
      const { beginTime, endTime } = getTimestamp(new Date(date))
      
      this.setData({
        isLoadSub: true,
        isLoadingSub: true
      })

      request('getDetailsBySubGroup', {
        type,
        name: mainName,
        beginTime,
        endTime
      }).then(res => {
        /**
         * list 的每一项
         * _id：具体的 sub 名称
         * money：改组总金额
         */
        const { list } = res.result

        for (const item of list) {
          item.money = padMoney(item.money / 100)
          if (!item._id) {    // 有可能该类型没有 sub 子项，那么直接设为类型名称即可
            item._id = mainName
          }
        }
        
        this.setData({
          subData: list,
          isLoadingSub: false
        })

        this.ecSubComponent = this.selectComponent('#sub-pie')
        this._initSubChart()
      })
    },

    _initSubChart () {
      this.ecSubComponent.init((canvas, width, height, dpr) => {
        // 初始化图表
        const chart = echarts.init(canvas, null, {
          width,
          height,
          devicePixelRatio: dpr
        })

        this._setSubOption(chart)
        
        // 返回 chart 实例，否则会影响事件处理等
        return chart
      })
    },

    _setSubOption (chart) {
      const { subData } = this.data

      const total = subData.reduce((prev, cur) => {
        return {
          money: (prev.money * 100 + cur.money * 100) / 100
        }
      })

      const option = {
        legend: {
          type: 'scroll'
        },
        tooltip: {
          show: true
        },
        series: [{
          type: 'pie',
          roseType: 'radius',
          radius: ['25%', '70%'],
          center: ['50%', '55%'],
          itemStyle: {  // 设置扇形样式
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {      // 设置文字
            show: true,
            position: 'outer',
            alignTo: 'labelLine',   // 开启文字对齐
            bleedMargin: 0,
          },
          labelLine: {  // 设置指导线
            show: true,
            smooth: true, // 设置第一段指导线平滑过渡到第二段指导线
          },
          emphasis: {
            label: {
              show: true,
              fontWeight: 'bold'
            }
          },
          data: subData.map(item => {
            const percent = ((item.money / total.money) * 100).toFixed(2)
            return {
              value: item.money,
              name: `${item._id} ${percent}%`
            }
          }),
        }]
      }

      chart.setOption(option)
    }
  }
})