import { Type, Food, Invest, Vehicle, Shopping, Pay, Entertainment, Sport, Pet, HumanFeelings, Insurance, Daily, Medical, Apparel, Educate } from '../class/Type'

const qita = new Type('其它', 'qita')

const touzi = new Invest

const hongbao = new Type('红包', 'hongbao')

const zhuanzhang = new Type('转账', 'zhuanzhang')

const gongzi = new Type('工资', 'gongzi')

const jiangjin = new Type('奖金', 'jiangjin')

const shengyi = new Type('生意', 'shengyi')

const jiekuan = new Type('借款', 'kuan')

const baoxiao = new Type('报销', 'baoxiao')

const incomeType = [
  gongzi,
  jiangjin,
  hongbao,
  zhuanzhang,
  touzi,
  shengyi,
  jiekuan,
  baoxiao,
  qita
]

const canyin = new Food

const jiaoton = new Vehicle

const gouwu = new Shopping

const fushi = new Apparel

const jiaoyu = new Educate

const jiaofei = new Pay

const richang = new Daily

const yule = new Entertainment

const yundon = new Sport

const chongwu = new Pet

const yiliao = new Medical

const renqing = new HumanFeelings

const baoxian = new Insurance

const lvxing = new Type('旅行', 'lvxing')

const huankuan = new Type('还款', 'kuan')

const expendType = [
  canyin,
  jiaoton,
  gouwu,
  fushi,
  jiaoyu,
  jiaofei,
  richang,
  yule,
  yundon,
  touzi,
  hongbao,
  zhuanzhang,
  chongwu,
  yiliao,
  renqing,
  baoxian,
  lvxing,
  huankuan,
  qita
]

const licai = new Type('理财', 'licai')

const otherType = [
  licai,
  qita
]

export {
  incomeType,
  expendType,
  otherType
}
