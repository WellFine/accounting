// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const collection = db.collection('account')

// 云函数入口函数
exports.main = async event => {
  const { OPENID } = cloud.getWXContext() // cloud.getWXContext() 只能在 exports.main 中调用
  const { type, name, py, time, money, account, remark, sub, how } = event

  return await collection.add({
    data: {
      _openid: OPENID,
      type,
      name,
      py,
      time,
      money: money * 100, // money * 100 可以保证 money 一定为 number 类型，且将精度单位变为分以保障精度正确
      account,
      remark,
      sub,
      how
    }
  }) 
}