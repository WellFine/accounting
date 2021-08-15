class Type {
  /**
   * @param {string} type 类型名称
   * @param {string} py 类型名称拼音
   */
  constructor (type, py) {
    this.type = type
    this.py = py
  }
}

class Food extends Type {
  sub = ['早餐', '午饭', '下午茶', '晚餐', '夜宵', '饮品', '甜品', '其它']
  how = ['堂食', '自提', '外卖', '煮饭', '略']

  constructor () {
    super('餐饮', 'canyin')
  }
}

class Vehicle extends Type {
  sub = ['共享单车', '公交', '地铁', '打车', '共享汽车', '高铁', '火车', '飞机', '其它']

  constructor () {
    super('交通', 'jiaoton')
  }
}

class Shopping extends Type {
  sub = ['日用品', '衣服', '鞋子', '食材', '水果', '饮料', '电子产品', '娱乐产品', '其它']

  constructor () {
    super('购物', 'gouwu')
  }
}

class Pay extends Type {
  sub = ['电费', '水费', '话费', '燃气费', '油费', '宽带', '物业', '房贷', '团费', '党费', '学费', '其它']

  constructor () {
    super('缴费', 'jiaofei')
  }
}

class Daily extends Type {
  sub = ['快递', '理发', '会员']

  constructor () {
    super('日常', 'richang')
  }
}

class Entertainment extends Type {
  sub = ['体育', '电影', '游乐场', 'KTV', '茶室', '酒吧', '网吧', '其它']

  constructor () {
    super('娱乐', 'yule')
  }
}

class Sport extends Type {
  sub = ['健身', '运动装备', '水', '其它']

  constructor () {
    super('运动', 'yundon')
  }
}

class Invest extends Type {
  sub = ['基金', '股票', '债券', '彩票', '其它']

  constructor () {
    super('投资', 'touzi')
  }
}

class Pet extends Type {
  sub = ['迎接主子', '粮食', '零食', '玩具', '洗澡', '治疗', '其它']

  constructor () {
    super('宠物', 'chongwu')
  }
}

class HumanFeelings extends Type {
  sub = ['聚餐', '请客', '礼物']

  constructor () {
    super('人情', 'renqing')
  }
}

class Insurance extends Type {
  sub = ['养老保险', '医疗保险', '失业保险', '汽车保险', '其它保险']

  constructor () {
    super('保险', 'baoxian')
  }
}

export {
  Type,
  Food,
  Vehicle,
  Shopping,
  Pay,
  Daily,
  Entertainment,
  Sport,
  Invest,
  Pet,
  HumanFeelings,
  Insurance
}