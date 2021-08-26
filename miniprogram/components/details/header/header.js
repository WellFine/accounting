Component({
  properties: {
    title: String
  },
  
  data: {
    type: 0
  },

  methods: {
    changeType (e) {
      const { type } = e.currentTarget.dataset

      this.setData({
        type
      })
      
      this.triggerEvent('type', type)
    }
  }
})