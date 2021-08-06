Component({
  properties: {
    color: Array
  },

  methods: {
    copyArray () {
      wx.setClipboardData({
        data: this.data.color.map(item => item).toString(),
      })
    },
    copyItem (e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.value
      })
    }
  }
})