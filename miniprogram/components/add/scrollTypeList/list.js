Component({
  properties: {
    list: Object,
    color: String
  },

  data: {
    active: 0,
    normalColor: '#8c8c8c',
    normalBackground: '#f5f5f5'
  },

  methods: {
    changeType (e) {
      const { index, type } = e.currentTarget.dataset

      this.setData({
        active: index
      })

      this.triggerEvent('getTypeName', type)
    }
  }
})