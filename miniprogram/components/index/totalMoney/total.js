Component({
  properties: {
    money: String
  },

  methods: {
    goToAddPage () {
      wx.navigateTo({
        url: '/pages/add/add',
      })
    },
    
    goToSettingPage () {
      wx.navigateTo({
        url: '/pages/setting/setting',
      })
    }
  }
})