class Type {
  /**
   * @param {string} name 类型名称
   * @param {string} icon 类型图片路径
   * @param {string} py 类型名称拼音
   */
  constructor (name, icon, py) {
    this.name = name
    this.icon = icon
    this.py = py
  }
}

class Food extends Type {
  sub = ['早餐', '午饭', '下午茶', '晚餐', '夜宵']
  how = ['堂食', '自提', '外卖', '煮饭']
  
  /**
   * @param {string} type 餐饮类型
   * @param {string} how 食用方式
   * @param {string} score 评分
   * @param {string} evaluate 评价
   */
  constructor (type = '', how = '', score = '', evaluate = '') {
    super('餐饮', '/images/type/canyin.png', 'canyin')
    this.type = type
    this.how = how
    this.score = score
    this.evaluate = evaluate
  }
}

class Invest extends Type {
  sub = ['基金', '股票', '债券']

  /**
   * @param {string} type 投资类型
   */
  constructor (type = '') {
    super('投资', '/images/type/touzi.png', 'touzi')
    this.type = type
  }
}

export {
  Type,
  Food,
  Invest
}