import * as echarts from '../../ec-canvas/echarts'

Component({
  properties: {
    income: String,
    expend: String
  },

  data: {
    ec: {
      lazyLoad: true
    }
  },

  lifetimes: {
    attached () {
      this.ecComponent = this.selectComponent('#charts-dom')
      this.initCharts()
    }
  },

  methods: {
    initCharts () {
      const { income, expend } = this.properties

      this.ecComponent.init((canvas, width, height, dpr) => {
        // 初始化图表
        const chart = echarts.init(canvas, null, {
          width,
          height,
          devicePixelRatio: dpr
        })

        setOption(chart, income, expend)

        // 返回 chart 实例，否则会影响事件处理等
        return chart
      })
    }
  }
})

function setOption (chart, income, expend) {
  const option = {
    title: {
      subtext: '本月收入与支出对比图',
      subtextStyle: {
        // color: ,
      }
    },
    grid: {
      top: 40,
      bottom: 0,
      right: 0,
      left: 36
    },
    tooltip: {
      show: true
    },
    xAxis: {
      show: false
    },
    yAxis: {
      type: 'category',
      data: ['收入', '支出'],
      axisTick: {
        show: false,  // 不显示坐标轴刻度
      },
      axisPointer: {
        show: true, // 突出显示点击的项
        type: 'shadow'
      }
    },
    series: [{
      type: 'bar',
      data: [income, expend],
      label: {  // 标签内容
        show: true,
        position: 'inside',
        formatter: '{c} 元', // 标签内容格式器，c为数据值
      },
      itemStyle: {  // 柱子样式
        // color:   // 柱子颜色
        // borderWidth:   // 柱子宽度
      }
    }]
  }
  chart.setOption(option)
}
