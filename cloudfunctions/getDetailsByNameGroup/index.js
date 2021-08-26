// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const collection = db.collection('account')
const _ = db.command
const $ = _.aggregate

// 云函数入口函数
exports.main = async event => {
  const { OPENID } = cloud.getWXContext()
  const { type, beginTime, endTime } = event

  return await collection.aggregate()
    .match({
      _openid: OPENID,
      type,
      time: _.and(_.gte(beginTime), _.lt(endTime))  // match 不可使用聚合操作符，只能使用查询操作符
    })
    .group({
      _id: '$name',  // 根据 name 字段分组
      money: $.sum('$money')
    })
    .end()
}