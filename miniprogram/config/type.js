import { Type, Food, Invest } from '../class/Type'

const qita = new Type('其它', '/images/type/qita.png', 'qita')

const touzi = new Invest

const hongbao = new Type('红包', '/images/type/hongbao.png', 'hongbao')

const zhuanzhang = new Type('转账', '/images/type/zhuanzhang.png', 'zhuanzhang')

const gongzi = new Type('工资', '/images/type/gongzi.png', 'gongzi')

const jiangjin = new Type('奖金', '/images/type/jiangjin.png', 'jiangjin')

const shengyi = new Type('生意', '/images/type/shengyi.png', 'shengyi')

const huankuan = new Type('还款', '/images/type/kuan.png', 'kuan')

const baoxiao = new Type('报销', '/images/type/baoxiao.png', 'baoxiao')

const incomeType = {
  gongzi,
  jiangjin,
  hongbao,
  zhuanzhang,
  touzi,
  shengyi,
  huankuan,
  baoxiao,
  qita
}

const canyin = new Food

const jiaoton = new Type('交通', '/images/type/jiaoton.png', 'jiaoton')

const gouwu = new Type('购物', '/images/type/gouwu.png', 'gouwu')

const yule = new Type('娱乐', '/images/type/yule.png', 'yule')

const yundon = new Type('运动', '/images/type/yundon.png', 'yundon')

const jiaofei = new Type('缴费', '/images/type/jiaofei.png', 'jiaofei')

const chongwu = new Type('宠物', '/images/type/chongwu.png', 'chongwu')

const yiliao = new Type('医疗', '/images/type/yiliao.png', 'yiliao')

const renqing = new Type('人情', '/images/type/renqing.png', 'renqing')

const baoxian = new Type('保险', '/images/type/baoxian.png', 'baoxian')

const lvxing = new Type('旅行', '/images/type/lvxing.png', 'lvxing')

const jiekuan = new Type('借款', '/images/type/kuan.png', 'kuan')

const expendType = {
  canyin,
  jiaoton,
  gouwu,
  jiaofei,
  yule,
  yundon,
  hongbao,
  zhuanzhang,
  touzi,
  chongwu,
  yiliao,
  renqing,
  baoxian,
  lvxing,
  jiekuan,
  qita
}

const licai = new Type('理财', '/images/type/licai.png', 'licai')

const otherType = {
  licai,
  qita
}

export {
  incomeType,
  expendType,
  otherType
}
