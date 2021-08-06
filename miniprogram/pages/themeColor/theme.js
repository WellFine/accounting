Page({
  data: {
    nav: 1,
    two: [
      [ '#ee6c32', '#e7d2b3' ],
      [ '#bcdba9', '#799a2f' ],
      [ '#c29b85', '#514227' ],
      [ '#d8f205', '#007c74' ],
      [ '#c8eb1d', '#91BDDA' ],
      [ '#097e9d', '#caa795' ],
      [ '#c8eb1d', '#007c74' ],
      [ '#8e6da0', '#cb3d6d' ],
    ],
    three: [
      [ '#51605b', '#6e7c0d', '#c7ce99' ],
      [ '#f3d821', '#88669a', '#5d4b67' ],
      [ '#eecf22', '#868686', '#d4d2c5' ],
      [ '#097e9d', '#9aa94f', '#e9e9d1' ],
      [ '#657a73', '#f2b2a9', '#f9e4e1' ],
      [ '#d69d9d', '#fbd3ce', '#e1e1e1' ],
    ],
    four: [
      [ '#fadede', '#f2b2b2', '#acacac', '#767676' ],
      [ '#43645e', '#709440', '#acacac', '#767676' ],
      [ '#a5b06c', '#626a3c', '#acacac', '#767676' ],
      [ '#43645e', '#709440', '#a9d2a1', '#e5e5d5' ],
    ]
  },

  tapNav (e) {
    this.setData({
      nav: e.currentTarget.dataset.nav
    })
  }
})