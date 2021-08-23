import * as echarts from '../../ec-canvas/echarts'
import * as liquidFill from '../../ec-canvas/echarts-liquidfill.min'

Component({
  properties: {
    use: String,
    useText: String,
    leftover: String,
    leftoverText: String
  },

  data: {
    ec: {
      lazyLoad: true
    }
  },

  observers: {
    'use, leftover': function (use, leftover) {
      if (Number(leftover) <= 0 || Number(use) == 0) this.initCharts(0)
      else this.initCharts(leftover / use)
    }
  },

  lifetimes: {
    created () {
      this.ecComponent = this.selectComponent('#charts-dom')
    }
  },

  methods: {
    initCharts (value) {
      this.ecComponent.init((canvas, width, height, dpr) => {
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
        })

        setOption(chart, value)

        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart
      })
    },

    goToSettingPage () {
      wx.navigateTo({
        url: '/pages/setting/setting',
      })
    }
  }
})

function setOption (chart, value) {
  const option = {
    series: [{
      type: 'liquidFill',
      data: [value],
      radius: 120,
      center: ['50%', '50%'],
      // 波纹幅度
      amplitude: '6%',
      // 波纹间距
      waveLength: '80%',
      outline: {
        show: false
      },
      // 水球背景
      backgroundStyle: {
        color: getColor('background', value)
      },
      // 波纹
      itemStyle: {
        color: getColor('wave', value)
      },
      // 百分数文字
      label: {
        fontSize: 24,
        color: getColor('text', value),
        insideColor: '#fff',
        formatter: function(param) {
          return `${(param.value * 100).toFixed(2)}%`;
        }
      }
    }]
  }
  chart.setOption(option)
}

function getColor (type, value) {
  switch (type) {
    case 'background':
      return value < 0.3 ? '#fdc4c8' : (value < 0.6 ? '#fff1d0' : '#d3f1c2')
    case 'wave':
      return value < 0.3 ? '#f5222d' : (value < 0.6 ? '#ffc53d' : '#73d13d')
    case 'text':
      return value < 0.3 ? '#f5222d' : (value < 0.6 ? 'rgb(51,160,141)' : '#69c0ff')
  }
}