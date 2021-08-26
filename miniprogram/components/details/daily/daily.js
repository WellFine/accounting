import * as echarts from '../../ec-canvas/echarts'

import { getEndTime, getYMDTime } from '../../../utils/date'
import { request } from '../../../utils/request'
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

    ecDetails: {
      lazyLoad: true
    },
    isLoadDetails: false,
    isLoadingDetails: false,
    details: []
  },

  observers: {
    'date, type': function (date, type) {
      if (!date || type < 0 || type > 2) return

      this.setData({
        isLoading: true,  // 开启收支明细柱状图加载动画
        isLoadDetails: false,   // 隐藏柱状图下方的饼图
      })

      request('getDetailsByTimeGroup', {
        type,
        beginTime: Date.parse(date),
        endTime: getEndTime(date),
        isNeedTotalMoney: true,
        sort: 1
      }).then(res => {
        const { list } = res.result
        
        for (const item of list) item.money /= 100
        
        this.setData({
          isLoading: false,
          data: list
        })

        // 如果数据为空，则不加载图表，显示本月没有收支
        if (list.length === 0) return
        
        this.ecComponent = this.selectComponent('#daily-bar')
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
      const { data, type } = this.data
      const day = [], money = []

      for (const item of data) {
        day.push(getYMDTime(new Date(item._id)).dayStr + '号')
        money.push(item.money)
      }
      
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: {
          type: 'slider',
          xAxisIndex: 0,
          start: 70,
          end: 100,
          minSpan: 30
        },
        grid: {
          top: 10,
          left: 10,
          bottom: 70,
          right: 10
        },
        xAxis: {
          type: 'category',
          data: day,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: {
          type: 'bar',
          data: money,
          label: {
            show: true,
            position: 'top',
            color: getColor(type),
            formatter: item => padMoney(item.data)
          },
          itemStyle: {
            color: getBackground(type)
          },
          emphasis: {
            itemStyle: {
              color: getColor(type)
            }
          },
          barMaxWidth: 20
        }
      }

      chart.setOption(option)

      chart.on('click', this._loadDailyDetails.bind(this))
    },

    _loadDailyDetails (params) {
      const day = Number(params.name.split('号')[0])
      const { date, type } = this.properties
      const beginTime = Date.parse(date) + (day - 1) * 86400000
      const endTime = Date.parse(date) + day * 86400000

      this.setData({
        isLoadDetails: true,
        isLoadingDetails: true
      })
      
      request('getDetails', {
        type,
        beginTime,
        endTime
      }).then(res => {
        const { data } = res.result
        
        for (const item of data) item.money /= 100
        
        this.setData({
          details: data,
          isLoadingDetails: false
        })

        this.ecDetailsComponent = this.selectComponent('#details-pie')
        this._initDetailsChart()
      })
    },

    _initDetailsChart () {
      this.ecDetailsComponent.init((canvas, width, height, dpr) => {
        // 初始化图表
        const chart = echarts.init(canvas, null, {
          width,
          height,
          devicePixelRatio: dpr
        })

        this._setDetailsOption(chart)
        
        // 返回 chart 实例，否则会影响事件处理等
        return chart
      })
    },

    _setDetailsOption (chart) {
      const { details } = this.data

      const option = {
        legend: {
          type: 'scroll'
        },
        tooltip: {
          show: true
        },
        series: {
          type: 'pie',
          roseType: 'area',
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
          data: details.map(item => {
            return {
              value: item.money,
              name: `${item.name}${item.sub ? '-' + item.sub : ''}`
            }
          }),
        }
      }

      chart.setOption(option)
    }
  }
})

function getColor (type) {
  switch (type) {
    case 0:
      return '#40a9ff'
    case 1:
      return '#73d13d'
    case 2:
      return '#9254de'
  }
}

function getBackground (type) {
  switch (type) {
    case 0:
      return '#bae7ff'
    case 1:
      return '#d9f7be'
    case 2:
      return '#efdbff'
  }
}