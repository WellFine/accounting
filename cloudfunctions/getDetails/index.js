// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const collection = db.collection('account')
const _ = db.command

// 云函数入口函数
exports.main = async event => {
  const { OPENID } = cloud.getWXContext()
  const { beginTime, endTime, type = undefined, name = undefined, sub = undefined } = event

  return await collection
    .where({
      _openid: OPENID,
      type,
      name,
      sub,
      time: _.and(_.gte(beginTime), _.lt(endTime))
    })
    .orderBy('time', 'desc')
    .field({
      _openid: false
    })
    .get()
}